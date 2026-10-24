"""PACK & GO (plan and book before the flight) and JUST LANDED (instant booking after landing).

Honesty rules for this app:
- Partners are marked is_demo=true until real ones exist. No ratings or reviews are stored.
- A booking is a REQUEST that a partner confirms. No payment is taken here.
"""
import json
import math
import os
import uuid
from datetime import date
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy import create_engine, text

load_dotenv()
router = APIRouter(tags=["pack-and-go", "just-landed"])

PARTNER_COLS = "id, slug, kind, name, city, languages, blurb, price_inr, unit, is_demo, available_now, lat, lng"
NOTE = "Requests go to the partner for confirmation. No payment is taken in this demo."
ALLOWED = {"requested": {"confirmed", "cancelled"}, "confirmed": {"cancelled"}}

_engine = None


def engine():
    global _engine
    if _engine is None:
        url = os.environ["DATABASE_URL"]
        if url.startswith("postgresql://"):
            url = url.replace("postgresql://", "postgresql+psycopg://", 1)
        _engine = create_engine(url, pool_size=3, max_overflow=2, pool_pre_ping=True)
    return _engine


def _partner(row, lang):
    m = dict(row._mapping)
    blurb = m.get("blurb") or {}
    m["blurb"] = blurb.get(lang) or blurb.get("en") or ""
    m["languages"] = [x for x in (m.get("languages") or "").split(",") if x]
    return m


def _qty(unit, days, group):
    if unit == "per_day":
        return days
    if unit == "per_person":
        return group
    return 1


def _km(lat1, lng1, lat2, lng2):
    p1, p2 = math.radians(lat1), math.radians(lat2)
    a = math.sin((p2 - p1) / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(math.radians(lng2 - lng1) / 2) ** 2
    return 2 * 6371.0 * math.asin(math.sqrt(a))


def _rank(rows, lat, lng, lang):
    out = []
    for row in rows:
        p = _partner(row, lang)
        dist = _km(lat, lng, p["lat"], p["lng"]) if p["lat"] is not None else 999.0
        p["distance_km"] = round(dist, 1)
        p["approx_minutes"] = max(5, round(dist * 3))  # rough city-traffic estimate, not live data
        p["speaks_your_language"] = lang in p["languages"]
        out.append(p)
    out.sort(key=lambda p: (not p["speaks_your_language"], p["distance_km"]))
    return out


def _booking_out(booking_id):
    with engine().connect() as c:
        row = c.execute(
            text(
                "SELECT b.id, b.guest_id, b.kind, b.plan_id, b.partner_id, b.status, b.quote_inr, b.note, "
                "b.lat, b.lng, b.lang, b.created_at, b.updated_at, p.name AS partner_name, "
                "p.kind AS partner_kind, p.unit AS partner_unit, p.is_demo AS partner_is_demo "
                "FROM bookings b LEFT JOIN partners p ON p.id = b.partner_id WHERE b.id = :id"
            ),
            {"id": booking_id},
        ).fetchone()
    if row is None:
        raise HTTPException(404, "Booking not found")
    out = dict(row._mapping)
    out["payment"] = "not_collected"
    out["note_text"] = NOTE
    return out


# ---------- partners ----------
@router.get("/partners")
def list_partners(kind: Optional[str] = None, city: Optional[str] = None, lang: str = "en",
                  available_now: Optional[bool] = None):
    sql, params = f"SELECT {PARTNER_COLS} FROM partners WHERE 1=1", {}
    if kind:
        sql += " AND kind = :kind"
        params["kind"] = kind
    if city:
        sql += " AND lower(city) = lower(:city)"
        params["city"] = city
    if available_now is not None:
        sql += " AND available_now = :an"
        params["an"] = available_now
    with engine().connect() as c:
        rows = c.execute(text(sql + " ORDER BY id"), params).fetchall()
    return {"partners": [_partner(r, lang) for r in rows]}


# ---------- PACK & GO ----------
class PlanIn(BaseModel):
    guest_id: str = Field(min_length=1, max_length=64)
    arrival_date: date
    city: str = "Jaipur"
    days: int = Field(2, ge=1, le=30)
    group_size: int = Field(1, ge=1, le=30)
    interests: List[str] = []
    lang: str = "en"
    partner_ids: List[int] = []


@router.post("/pack-and-go/plans", status_code=201)
def create_plan(body: PlanIn):
    plan_id = uuid.uuid4().hex
    with engine().begin() as c:
        rows = []
        if body.partner_ids:
            rows = c.execute(
                text(f"SELECT {PARTNER_COLS} FROM partners WHERE id = ANY(CAST(:ids AS integer[]))"),
                {"ids": body.partner_ids},
            ).fetchall()
            if len(rows) != len(set(body.partner_ids)):
                raise HTTPException(400, "One or more partners were not found")
        items, total = [], 0
        for row in rows:
            p = _partner(row, body.lang)
            qty = _qty(p["unit"], body.days, body.group_size)
            line = p["price_inr"] * qty
            total += line
            items.append({"partner_id": p["id"], "name": p["name"], "kind": p["kind"],
                          "price_inr": p["price_inr"], "unit": p["unit"], "qty": qty, "line_total_inr": line})
        c.execute(
            text("INSERT INTO trip_plans (id, guest_id, arrival_date, city, days, group_size, interests, lang, items, total_inr) "
                 "VALUES (:id, :g, :a, :city, :days, :gs, CAST(:i AS jsonb), :lang, CAST(:items AS jsonb), :t)"),
            {"id": plan_id, "g": body.guest_id, "a": body.arrival_date, "city": body.city, "days": body.days,
             "gs": body.group_size, "i": json.dumps(body.interests), "lang": body.lang,
             "items": json.dumps(items), "t": total},
        )
        for it in items:
            c.execute(
                text("INSERT INTO bookings (id, guest_id, kind, plan_id, partner_id, status, quote_inr, lang) "
                     "VALUES (:id, :g, 'planned', :plan, :pid, 'requested', :q, :lang)"),
                {"id": uuid.uuid4().hex, "g": body.guest_id, "plan": plan_id, "pid": it["partner_id"],
                 "q": it["line_total_inr"], "lang": body.lang},
            )
    return get_plan(plan_id)


@router.get("/pack-and-go/plans/{plan_id}")
def get_plan(plan_id: str):
    with engine().connect() as c:
        plan = c.execute(text("SELECT * FROM trip_plans WHERE id = :id"), {"id": plan_id}).fetchone()
        if plan is None:
            raise HTTPException(404, "Plan not found")
        bookings = c.execute(
            text("SELECT b.id, b.status, b.quote_inr, p.name AS partner_name, p.kind AS partner_kind "
                 "FROM bookings b LEFT JOIN partners p ON p.id = b.partner_id WHERE b.plan_id = :id ORDER BY b.created_at"),
            {"id": plan_id},
        ).fetchall()
    out = dict(plan._mapping)
    out["bookings"] = [dict(b._mapping) for b in bookings]
    out["payment"] = "not_collected"
    out["note_text"] = NOTE
    return out


# ---------- JUST LANDED ----------
class LandedIn(BaseModel):
    guest_id: str = Field(min_length=1, max_length=64)
    lat: float = Field(ge=-90, le=90)
    lng: float = Field(ge=-180, le=180)
    lang: str = "en"
    kind: Optional[str] = None
    partner_id: Optional[int] = None
    group_size: int = Field(1, ge=1, le=30)
    note: str = Field("", max_length=300)


@router.get("/just-landed/matches")
def matches(lat: float, lng: float, lang: str = "en", kind: Optional[str] = None):
    sql, params = f"SELECT {PARTNER_COLS} FROM partners WHERE available_now = true", {}
    if kind:
        sql += " AND kind = :kind"
        params["kind"] = kind
    with engine().connect() as c:
        rows = c.execute(text(sql), params).fetchall()
    return {"matches": _rank(rows, lat, lng, lang), "note_text": NOTE}


@router.post("/just-landed/requests", status_code=201)
def create_request(body: LandedIn):
    booking_id = uuid.uuid4().hex
    with engine().begin() as c:
        if body.partner_id is not None:
            row = c.execute(text(f"SELECT {PARTNER_COLS} FROM partners WHERE id = :id"),
                            {"id": body.partner_id}).fetchone()
            if row is None or not row._mapping["available_now"]:
                raise HTTPException(409, "That partner is not available right now")
            partner = _partner(row, body.lang)
        else:
            sql, params = f"SELECT {PARTNER_COLS} FROM partners WHERE available_now = true", {}
            if body.kind:
                sql += " AND kind = :kind"
                params["kind"] = body.kind
            ranked = _rank(c.execute(text(sql), params).fetchall(), body.lat, body.lng, body.lang)
            if not ranked:
                raise HTTPException(404, "No partner is available right now")
            partner = ranked[0]
        quote = partner["price_inr"] * _qty(partner["unit"], 1, body.group_size)
        c.execute(
            text("INSERT INTO bookings (id, guest_id, kind, partner_id, status, quote_inr, note, lat, lng, lang) "
                 "VALUES (:id, :g, 'instant', :pid, 'requested', :q, :note, :lat, :lng, :lang)"),
            {"id": booking_id, "g": body.guest_id, "pid": partner["id"], "q": quote, "note": body.note,
             "lat": body.lat, "lng": body.lng, "lang": body.lang},
        )
    return _booking_out(booking_id)


# ---------- bookings ----------
class StatusIn(BaseModel):
    status: str


@router.get("/bookings/{booking_id}")
def get_booking(booking_id: str):
    return _booking_out(booking_id)


@router.get("/bookings")
def list_bookings(guest_id: str):
    with engine().connect() as c:
        ids = [r[0] for r in c.execute(
            text("SELECT id FROM bookings WHERE guest_id = :g ORDER BY created_at DESC LIMIT 50"), {"g": guest_id})]
    return {"bookings": [_booking_out(i) for i in ids]}


@router.post("/bookings/{booking_id}/status")
def set_status(booking_id: str, body: StatusIn):
    """Demo control. In production only the partner could confirm a request."""
    with engine().begin() as c:
        row = c.execute(text("SELECT status FROM bookings WHERE id = :id"), {"id": booking_id}).fetchone()
        if row is None:
            raise HTTPException(404, "Booking not found")
        if body.status not in ALLOWED.get(row[0], set()):
            raise HTTPException(409, f"Cannot change {row[0]} to {body.status}")
        c.execute(text("UPDATE bookings SET status = :s, updated_at = now() WHERE id = :id"),
                  {"s": body.status, "id": booking_id})
    return _booking_out(booking_id)
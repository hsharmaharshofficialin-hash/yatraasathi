import math
import re

from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from src.models import KnowledgeFact

STOP = set("a an the is are was were be to of in on for and or what when where who how does do did can".split())


def tokenize(text: str) -> list[str]:
    parts = re.findall(r"\w+", text.lower(), flags=re.UNICODE)
    return [p for p in parts if len(p) > 1 and p not in STOP]


def haversine_m(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
    r = 6371000
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dl = math.radians(lng2 - lng1)
    a = math.sin(dphi / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * r * math.asin(min(1, math.sqrt(a)))


def retrieve(session: Session, question: str, site_slug: str | None = None) -> list[KnowledgeFact]:
    tokens = tokenize(question)
    if not tokens:
        return []
    clauses = []
    for token in tokens[:8]:
        like = f"%{token}%"
        clauses.append(KnowledgeFact.claim_en.ilike(like))
        clauses.append(KnowledgeFact.claim_hi.ilike(like))
        clauses.append(KnowledgeFact.tags.ilike(like))
    rows = list(session.scalars(select(KnowledgeFact).where(or_(*clauses))).all())

    def score(fact: KnowledgeFact) -> float:
        hay = f"{fact.claim_en} {fact.claim_hi} {fact.tags} {fact.site_slug or ''}".lower()
        value = 0.0
        for token in tokens:
            if token in hay:
                value += 2 if len(token) > 4 else 1
        if site_slug and fact.site_slug == site_slug:
            value += 2
        if fact.status == "verified":
            value += 0.5
        return value

    ranked = [fact for fact in sorted(rows, key=score, reverse=True) if score(fact) >= 2]
    return ranked[:6]

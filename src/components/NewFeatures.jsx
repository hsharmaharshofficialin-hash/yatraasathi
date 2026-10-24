"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { languages, useLang, useT } from "@/lib/i18n";

const API = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");
const KIND_KEY = { guide: "kind_guide", transport: "kind_transport", photographer: "kind_photographer", experience: "kind_experience" };
const rupee = (n) => "\u20B9" + Number(n).toLocaleString("en-IN");
const qty = (unit, days, group) => (unit === "per_day" ? days : unit === "per_person" ? group : 1);

function guestId() {
  try {
    let g = localStorage.getItem("ys_guest");
    if (!g) {
      g = "g" + Math.random().toString(36).slice(2, 12);
      localStorage.setItem("ys_guest", g);
    }
    return g;
  } catch {
    return "g-anon";
  }
}

async function api(path, init) {
  const res = await fetch(API + path, {
    ...init,
    headers: { Accept: "application/json", ...(init && init.body ? { "Content-Type": "application/json" } : {}) },
  });
  if (!res.ok) throw new Error("HTTP " + res.status);
  return res.json();
}

/* Partner names and blurbs come from the database in English; translations are looked up by slug. */
function partnerText(t) {
  const pick = (prefix, p, fallback) => {
    const k = prefix + p.slug;
    const v = t(k);
    return v === k ? fallback : v;
  };
  return { name: (p) => pick("name_", p, p.name), blurb: (p) => pick("blurb_", p, p.blurb) };
}

function Shell({ title, sub, children }) {
  const { t, lang } = useT();
  const [, setLang] = useLang();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
  if (!mounted) return null;
  return createPortal(
    <div className="nf-root">
      <style>{CSS}</style>
      <div className="nf-bg" aria-hidden="true" />
      <header className="nf-top">
        <Link href="/explore" className="nf-logo">
          <span className="nf-line" aria-hidden="true" />
          <span className="nf-word">YATRA<br />SATHI</span>
        </Link>
        <label className="nf-lang">
          <span>{t("language")}</span>
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            {languages().map(([c, n]) => (
              <option key={c} value={c}>{n}</option>
            ))}
          </select>
        </label>
      </header>
      <main className="nf-main">
        <Link href="/explore" className="nf-back">&larr; {t("back")}</Link>
        <h1 className="nf-h1">{title}</h1>
        <p className="nf-sub">{sub}</p>
        {children}
      </main>
    </div>,
    document.body
  );
}

function PartnerCard({ p, t, pt, children }) {
  return (
    <article className="nf-card">
      <div className="nf-row">
        <span className="nf-chip">{t(KIND_KEY[p.kind] || "kind_guide")}</span>
        <span className="nf-chip nf-demo">{t("demo_partner")}</span>
      </div>
      <h3 className="nf-name">{pt.name(p)}</h3>
      <p className="nf-text">{pt.blurb(p)}</p>
      <p className="nf-langs">{p.languages.join(" / ").toUpperCase()}</p>
      <p className="nf-price">{rupee(p.price_inr)} <small>{t(p.unit)}</small></p>
      {children}
    </article>
  );
}

/* ---------------- PACK & GO ---------------- */
export function PackGoPage() {
  const { t, lang } = useT();
  const pt = partnerText(t);
  const [arrival, setArrival] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().slice(0, 10);
  });
  const [days, setDays] = useState(3);
  const [group, setGroup] = useState(2);
  const [partners, setPartners] = useState([]);
  const [picked, setPicked] = useState([]);
  const [busy, setBusy] = useState(false);
  const [plan, setPlan] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    api("/partners?city=Jaipur&lang=" + lang)
      .then((d) => setPartners(d.partners))
      .catch(() => setFailed(true));
  }, [lang]);

  const total = useMemo(
    () =>
      partners
        .filter((p) => picked.includes(p.id))
        .reduce((sum, p) => sum + p.price_inr * qty(p.unit, Number(days), Number(group)), 0),
    [partners, picked, days, group]
  );
  const toggle = (id) => setPicked((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const save = async () => {
    setBusy(true);
    setFailed(false);
    try {
      const body = { guest_id: guestId(), arrival_date: arrival, city: "Jaipur", days: Number(days), group_size: Number(group), interests: [], lang, partner_ids: picked };
      setPlan(await api("/pack-and-go/plans", { method: "POST", body: JSON.stringify(body) }));
    } catch {
      setFailed(true);
    }
    setBusy(false);
  };

  return (
    <Shell title="PACK & GO" sub={t("pg_sub")}>
      <p className="nf-intro">{t("pg_intro")}</p>
      <div className="nf-form">
        <label>{t("pg_arrival")}<input type="date" value={arrival} onChange={(e) => setArrival(e.target.value)} /></label>
        <label>{t("pg_days")}<input type="number" min="1" max="30" value={days} onChange={(e) => setDays(e.target.value)} /></label>
        <label>{t("pg_group")}<input type="number" min="1" max="30" value={group} onChange={(e) => setGroup(e.target.value)} /></label>
      </div>

      <h2 className="nf-h2">{t("pg_choose")}</h2>
      {partners.length === 0 && !failed && <p className="nf-text">{t("loading")}</p>}
      <div className="nf-grid">
        {partners.map((p) => (
          <PartnerCard key={p.id} p={p} t={t} pt={pt}>
            <button className={"nf-btn" + (picked.includes(p.id) ? " on" : "")} onClick={() => toggle(p.id)}>
              {picked.includes(p.id) ? t("pg_selected") : t("pg_select")}
            </button>
          </PartnerCard>
        ))}
      </div>

      <div className="nf-bar">
        <div>
          <span className="nf-cap">{t("pg_total")}</span>
          <strong className="nf-big">{picked.length ? rupee(total) : t("pg_none")}</strong>
        </div>
        <button className="nf-btn nf-main-btn" onClick={save} disabled={busy}>{busy ? t("pg_saving") : t("pg_save")}</button>
      </div>
      {failed && <p className="nf-error">{t("error_generic")}</p>}

      {plan && (
        <section className="nf-card nf-result" aria-live="polite">
          <h2 className="nf-h2">{t("pg_saved")}</h2>
          <p className="nf-text">{t("pg_plan_id")}: {plan.id}</p>
          <p className="nf-big">{rupee(plan.total_inr)}</p>
          <h3 className="nf-name">{t("pg_requests")}</h3>
          <ul className="nf-list">
            {plan.bookings.map((b) => (
              <li key={b.id}><span>{b.partner_name}</span><span className="nf-chip">{t("status_" + b.status)}</span></li>
            ))}
          </ul>
          <p className="nf-note">{t("no_payment")}</p>
        </section>
      )}
    </Shell>
  );
}

/* ---------------- JUST LANDED ---------------- */
export function JustLandedPage() {
  const { t, lang } = useT();
  const pt = partnerText(t);
  const [coords, setCoords] = useState(null);
  const [matches, setMatches] = useState(null);
  const [state, setState] = useState("idle");
  const [booking, setBooking] = useState(null);
  const [booked, setBooked] = useState(null);

  const load = async (lat, lng) => {
    setCoords({ lat, lng });
    setState("loading");
    try {
      const d = await api(`/just-landed/matches?lat=${lat}&lng=${lng}&lang=${lang}`);
      setMatches(d.matches);
      setState("idle");
    } catch {
      setState("error");
    }
  };

  useEffect(() => {
    if (coords) load(coords.lat, coords.lng);
  }, [lang]);

  const locate = () => {
    if (!navigator.geolocation) {
      setState("denied");
      return;
    }
    setState("locating");
    navigator.geolocation.getCurrentPosition(
      (p) => load(p.coords.latitude, p.coords.longitude),
      () => setState("denied"),
      { timeout: 10000 }
    );
  };

  const request = async (p) => {
    try {
      const body = { guest_id: guestId(), lat: coords.lat, lng: coords.lng, lang, partner_id: p.id, group_size: 1, note: "" };
      setBooking(await api("/just-landed/requests", { method: "POST", body: JSON.stringify(body) }));
      setBooked(p);
    } catch {
      setState("error");
    }
  };

  const setStatus = async (status) => {
    try {
      setBooking(await api(`/bookings/${booking.id}/status`, { method: "POST", body: JSON.stringify({ status }) }));
    } catch {
      setState("error");
    }
  };

  return (
    <Shell title="JUST LANDED" sub={t("jl_sub")}>
      <p className="nf-intro">{t("jl_intro")}</p>
      <div className="nf-actions">
        <button className="nf-btn nf-main-btn" onClick={locate}>{t("jl_locate")}</button>
        <button className="nf-btn" onClick={() => load(26.8242, 75.8122)}>{t("jl_airport")}</button>
      </div>
      {state === "locating" && <p className="nf-text">{t("jl_locating")}</p>}
      {state === "loading" && <p className="nf-text">{t("jl_finding")}</p>}
      {state === "denied" && <p className="nf-error">{t("jl_denied")}</p>}
      {state === "error" && <p className="nf-error">{t("error_generic")}</p>}

      {booking && booked && (
        <section className="nf-card nf-result" aria-live="polite">
          <h2 className="nf-h2">{t("jl_sent")}</h2>
          <p className="nf-name">{pt.name(booked)}</p>
          <p className="nf-text">{t("jl_price")}: {rupee(booking.quote_inr)}</p>
          <div className="nf-steps">
            <span className={"nf-step on"}>{t("status_requested")}</span>
            <span className={"nf-step" + (booking.status === "confirmed" ? " on" : "")}>{t("status_confirmed")}</span>
            {booking.status === "cancelled" && <span className="nf-step bad">{t("status_cancelled")}</span>}
          </div>
          <p className="nf-text">{t("jl_status")}: <strong>{t("status_" + booking.status)}</strong></p>
          <div className="nf-actions">
            {booking.status === "requested" && <button className="nf-btn" onClick={() => setStatus("confirmed")}>{t("jl_demo_confirm")}</button>}
            {booking.status !== "cancelled" && <button className="nf-btn" onClick={() => setStatus("cancelled")}>{t("jl_cancel")}</button>}
          </div>
          <p className="nf-note">{t("no_payment")}</p>
        </section>
      )}

      {matches && (
        <>
          <h2 className="nf-h2">{t("jl_available")}</h2>
          {matches.length === 0 && <p className="nf-text">{t("jl_none")}</p>}
          <div className="nf-grid">
            {matches.map((p) => (
              <PartnerCard key={p.id} p={p} t={t} pt={pt}>
                <p className="nf-cap">{p.distance_km} {t("jl_km")} / ~{p.approx_minutes} {t("jl_min")}</p>
                {p.speaks_your_language && <p className="nf-good">{t("jl_speaks")}</p>}
                <button className="nf-btn nf-main-btn" onClick={() => request(p)}>{t("jl_request")}</button>
              </PartnerCard>
            ))}
          </div>
        </>
      )}
    </Shell>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans+Devanagari:wght@400;500&family=Noto+Sans+JP:wght@400;500&family=Noto+Sans+SC:wght@400;500&family=Noto+Sans+Bengali:wght@400;500&display=swap');
.nf-root{position:fixed;inset:0;z-index:100000;overflow-y:auto;overflow-x:hidden;color:#fff;background:#140b07;
  font-family:system-ui,'Noto Sans','Noto Sans Devanagari','Noto Sans JP','Noto Sans SC','Noto Sans Bengali',sans-serif}
.nf-bg{position:fixed;inset:0;z-index:0;background:linear-gradient(180deg,rgba(40,12,12,.6),rgba(20,8,6,.92)),
  url('/images/hero-temple.jpg') center/cover,linear-gradient(135deg,#2a1420,#6b3a3a 50%,#3b2418);filter:saturate(1.1)}
.nf-top,.nf-main{position:relative;z-index:1}
.nf-top{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:22px 6vw 0}
.nf-logo{display:flex;align-items:stretch;gap:12px;color:#fff;text-decoration:none}
.nf-line{width:2px;background:#f3c53a}
.nf-word{font-family:'Bebas Neue',Impact,sans-serif;font-size:24px;line-height:1;letter-spacing:.08em}
.nf-lang{display:flex;align-items:center;gap:8px;font-size:13px}
.nf-lang select{background:rgba(255,255,255,.16);color:#fff;border:1px solid rgba(255,255,255,.35);border-radius:999px;padding:8px 12px;font-size:14px}
.nf-lang option{color:#111}
.nf-main{max-width:1000px;margin:0 auto;padding:24px 6vw 90px}
.nf-back{color:#f3c53a;text-decoration:none;font-size:14px}
.nf-h1{margin:14px 0 0;font-family:'Bebas Neue',Impact,sans-serif;font-weight:400;font-size:clamp(52px,11vw,96px);line-height:.95;letter-spacing:.03em}
.nf-sub{margin:6px 0 0;font-size:18px;opacity:.9}
.nf-intro{max-width:60ch;line-height:1.55;opacity:.85;margin:18px 0}
.nf-h2{font-family:'Bebas Neue',Impact,sans-serif;font-weight:400;font-size:30px;letter-spacing:.04em;margin:28px 0 12px}
.nf-form{display:flex;gap:14px;flex-wrap:wrap}
.nf-form label{display:flex;flex-direction:column;gap:6px;font-size:13px;opacity:.9}
.nf-form input{background:rgba(255,255,255,.14);color:#fff;border:1px solid rgba(255,255,255,.35);border-radius:12px;padding:10px 12px;font-size:16px;min-width:130px}
.nf-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px}
.nf-card{display:flex;flex-direction:column;gap:8px;padding:18px;border-radius:16px;background:rgba(255,255,255,.12);
  border:1px solid rgba(255,255,255,.28);-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);box-shadow:0 16px 40px rgba(0,0,0,.3)}
.nf-row{display:flex;gap:8px;flex-wrap:wrap}
.nf-chip{font-size:11px;padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.2);letter-spacing:.04em}
.nf-demo{background:rgba(243,197,58,.25);color:#ffe27a}
.nf-name{margin:2px 0;font-size:19px;font-weight:500}
.nf-text{margin:0;font-size:14px;line-height:1.5;opacity:.85}
.nf-langs{margin:0;font-size:11px;letter-spacing:.12em;opacity:.65}
.nf-price{margin:4px 0;font-size:22px;font-weight:500}
.nf-price small{font-size:12px;opacity:.7;font-weight:400}
.nf-cap{margin:0;font-size:12px;opacity:.7}
.nf-good{margin:0;font-size:12px;color:#8bd17c}
.nf-btn{cursor:pointer;padding:11px 18px;border-radius:999px;font-size:15px;color:#fff;background:transparent;border:1px solid rgba(255,255,255,.55)}
.nf-btn.on,.nf-main-btn{background:#f3c53a;color:#1b1405;border-color:#f3c53a;font-weight:500}
.nf-btn:disabled{opacity:.6;cursor:default}
.nf-btn:focus-visible,.nf-form input:focus-visible,.nf-lang select:focus-visible,.nf-back:focus-visible{outline:2px solid #f3c53a;outline-offset:3px}
.nf-actions{display:flex;gap:10px;flex-wrap:wrap;margin:6px 0 16px}
.nf-bar{display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap;margin-top:24px;padding:16px 18px;border-radius:16px;background:rgba(0,0,0,.4)}
.nf-big{display:block;font-family:'Bebas Neue',Impact,sans-serif;font-weight:400;font-size:34px;letter-spacing:.03em}
.nf-result{margin-top:22px}
.nf-list{list-style:none;margin:6px 0;padding:0;display:flex;flex-direction:column;gap:8px}
.nf-list li{display:flex;justify-content:space-between;gap:10px;align-items:center;font-size:14px}
.nf-steps{display:flex;gap:8px;flex-wrap:wrap}
.nf-step{padding:6px 12px;border-radius:999px;font-size:12px;border:1px solid rgba(255,255,255,.3);opacity:.55}
.nf-step.on{opacity:1;background:#f3c53a;color:#1b1405;border-color:#f3c53a}
.nf-step.bad{opacity:1;background:#ff5a6e;border-color:#ff5a6e}
.nf-note{margin:6px 0 0;font-size:12px;opacity:.7}
.nf-error{color:#ff9aa6;font-size:14px}
`;
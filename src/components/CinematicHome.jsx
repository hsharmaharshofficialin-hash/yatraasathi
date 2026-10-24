"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DESTS } from "@/data/destinations";
import HomeToolkit from "@/components/HomeToolkit";

const HERO = "/images/hero-jaipur.jpg";
const FALLBACK = "/images/hero-temple.jpg";
const grad = (a, b) => `linear-gradient(160deg,${a},${b})`;

const places = DESTS.map((d) => ({
  s: d.s, t: d.n, sub: d.b, h: "/destinations/" + d.s, i: d.i, c: d.c, g: grad(d.c + "99", d.d + "88"),
}));

const tools = [
  { t: "ASK", h: "/ask", i: "💬" },
  { t: "DAYS", h: "/itinerary", i: "🗓" },
  { t: "SOS", h: "/sos", i: "🆘" },
];

const stats = [
  { n: DESTS.length, u: "destinations", cap: "Across India", p: "0,28 20,22 40,25 60,12 80,16 100,4" },
  { n: tools.length, u: "tools", cap: "Built for the trip", p: "0,26 20,18 40,22 60,10 80,14 100,6" },
  { n: 3, u: "packs", cap: "Work offline", p: "0,24 20,26 40,14 60,18 80,8 100,10" },
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600&display=swap');
.ch-root{position:fixed;inset:0;z-index:9999;overflow-y:auto;overflow-x:hidden;overscroll-behavior-x:contain;
  color:#fff7ec;font-family:"Barlow Condensed",Arial Narrow,sans-serif;background:#1a0d12}
.ch-wall{position:fixed;inset:0;z-index:0;background-color:#2b1240;background-size:cover;background-position:center;
  background-repeat:no-repeat;animation:chfade .9s ease}
@keyframes chfade{from{opacity:.2}to{opacity:1}}
.ch-shade{position:fixed;inset:0;z-index:0;background:linear-gradient(to bottom,rgba(15,6,15,.45),rgba(15,6,15,.7))}
.ch-screen{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column;justify-content:space-between;padding:28px 0 96px}
.ch-logo{margin-left:32px;padding-left:12px;border-left:3px solid #ffd86b;font-family:"Bebas Neue",Impact,sans-serif;
  font-size:2.2rem;line-height:.9;letter-spacing:.06em}
.ch-view{overflow:hidden;padding-left:32px;touch-action:pan-y;cursor:grab}
.ch-track{--cw:min(340px,78vw);display:flex;gap:18px;transition:transform .6s cubic-bezier(.2,.7,.2,1);
  transform:translateX(calc(var(--i) * (var(--cw) + 18px) * -1))}
.ch-card{flex:0 0 var(--cw);height:min(44vh,360px);border-radius:22px;padding:20px;display:flex;flex-direction:column;
  justify-content:space-between;backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.25);color:#fff;
  text-decoration:none;user-select:none;opacity:.7;transition:opacity .4s}
.ch-card.on{opacity:1}
.ch-ico{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font-size:1.3rem;
  background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.3)}
.ch-card h2{margin:0;font-family:"Bebas Neue",Impact,sans-serif;font-weight:400;font-size:2.8rem;line-height:.95;letter-spacing:.03em}
.ch-card p{margin:6px 0 0;font-size:1.05rem;line-height:1.25}
.ch-tabs{display:flex;gap:8px;padding:0 32px;flex-wrap:wrap;margin-top:18px}
.ch-tab{display:flex;align-items:center;gap:6px;padding:8px 14px;border-radius:999px;cursor:pointer;font:inherit;font-size:1rem;
  color:#fff7ec;text-decoration:none;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25)}
.ch-tab:hover{background:#ffd86b;color:#1a0d05;border-color:#ffd86b}
.ch-tab:focus-visible,.ch-btn:focus-visible,.ch-card:focus-visible{outline:2px solid #ffd86b;outline-offset:2px}
.ch-stats{display:flex;gap:28px;padding:0 32px;flex-wrap:wrap;align-items:flex-end}
.ch-stat{min-width:130px}
.ch-num{font-family:"Bebas Neue",Impact,sans-serif;font-size:3rem;line-height:1}
.ch-num small{font-family:"Barlow Condensed",sans-serif;font-size:1rem;margin-left:6px;color:#ffd86b}
.ch-cap{font-size:.95rem;color:#ffe9cc}
.ch-line{width:130px;height:32px;display:block}
.ch-line polyline{fill:none;stroke:#ffd86b;stroke-width:2;vector-effect:non-scaling-stroke;
  stroke-dasharray:1;stroke-dashoffset:1;animation:chdraw 1.6s ease forwards}
@keyframes chdraw{to{stroke-dashoffset:0}}
.ch-dot{width:52px;height:52px;border-radius:50%;border:2px solid #ffd86b;
  background:url(${HERO}) center/cover,url(${FALLBACK}) center/cover}
.ch-ctrl{position:fixed;right:24px;bottom:24px;z-index:3;display:flex;align-items:center;gap:12px}
.ch-count{font-family:"Bebas Neue",Impact,sans-serif;font-size:1.4rem;letter-spacing:.08em}
.ch-count i{display:inline-block;width:46px;height:1px;background:#fff7ec;margin:0 8px;vertical-align:middle}
.ch-btn{width:44px;height:44px;border-radius:12px;display:grid;place-items:center;cursor:pointer;color:#fff7ec;
  font-size:1.1rem;text-decoration:none;background:rgba(255,255,255,.14);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.3)}
@media (prefers-reduced-motion:reduce){.ch-track{transition:none}.ch-wall{animation:none}.ch-line polyline{animation:none;stroke-dashoffset:0}}
`;

function Count({ to }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf, start;
    const tick = (ts) => {
      start = start || ts;
      const p = Math.min((ts - start) / 1200, 1);
      setN(Math.round(to * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{n}</>;
}

export default function CinematicHome() {
  const [mounted, setMounted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hover, setHover] = useState(false);
  const drag = useRef({ x: null, moved: false });
  const lastWheel = useRef(0);
  const last = places.length - 1;
  const step = (d) => setIdx((i) => Math.max(0, Math.min(last, i + d)));

  useEffect(() => {
    setMounted(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!playing || hover) return;
    const id = setInterval(() => setIdx((i) => (i >= last ? 0 : i + 1)), 7000);
    return () => clearInterval(id);
  }, [playing, hover, last]);

  if (!mounted) return null;

  const onWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 30 && Date.now() - lastWheel.current > 500) {
      lastWheel.current = Date.now();
      step(e.deltaX > 0 ? 1 : -1);
    }
  };
  const down = (e) => { drag.current = { x: e.clientX, moved: false }; };
  const up = (e) => {
    if (drag.current.x === null) return;
    const d = e.clientX - drag.current.x;
    if (Math.abs(d) > 50) { drag.current.moved = true; step(d < 0 ? 1 : -1); }
    drag.current.x = null;
  };
  const full = () => {
    try {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen();
    } catch (e) {}
  };

  const active = places[idx];

  return createPortal(
    <div className="ch-root" onWheel={onWheel}>
      <style>{css}</style>
      <div
        key={active.s}
        className="ch-wall"
        style={{ backgroundImage: `url(/images/destinations/${active.s}.jpg), url(${HERO}), url(${FALLBACK})` }}
      />
      <div className="ch-shade" />

      <section className="ch-screen">
        <div className="ch-logo">YATRA<br />SATHI</div>

        <div>
          <div className="ch-view" onPointerDown={down} onPointerUp={up}
            onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div className="ch-track" style={{ "--i": idx }}>
              {places.map((it, k) => (
                <a key={it.s} href={it.h} draggable={false} className={"ch-card" + (k === idx ? " on" : "")}
                  style={{ background: it.g }} onClick={(e) => { if (drag.current.moved) e.preventDefault(); }}>
                  <span className="ch-ico">{it.i}</span>
                  <div>
                    <h2 style={{ color: it.c }}>{it.t}</h2>
                    <p>{it.sub}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div style={{ padding: "0 32px", marginTop: 18 }}><HomeToolkit /></div>
        </div>

        <div className="ch-stats">
          {stats.map((s) => (
            <div className="ch-stat" key={s.u}>
              <svg className="ch-line" viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden="true">
                <polyline points={s.p} pathLength="1" />
              </svg>
              <div className="ch-num"><Count to={s.n} /><small>{s.u}</small></div>
              <div className="ch-cap">{s.cap}</div>
            </div>
          ))}
          <div className="ch-dot" aria-hidden="true" />
        </div>
      </section>

      <div className="ch-ctrl">
        <span className="ch-count">{String(idx + 1).padStart(2, "0")}<i />{String(places.length).padStart(2, "0")}</span>
        <button className="ch-btn" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause autoplay" : "Play autoplay"}>
          {playing ? "❚❚" : "▶"}
        </button>
        <button className="ch-btn" onClick={full} aria-label="Full screen">⛶</button>
        <a className="ch-btn" href="/ask" aria-label="Ask">✦</a>
      </div>
    </div>,
    document.body
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HISTORY } from "@/data/destination-history";
import DestinationFeatures from "@/components/DestinationFeatures";
import { DETAILS } from "@/data/destination-details";

const FONTS = {
  royal: '"Cinzel",Georgia,serif',
  classic: '"Cormorant Garamond",Georgia,serif',
  bold: '"Bebas Neue",Impact,sans-serif',
};

export default function DestinationPage({ dest }) {
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

  const img = `/images/destinations/${dest.s}.jpg`;
  const facts = [
    ["Eat", dest.dish, "🍽"],
    ["Wear", dest.dress, "👘"],
    ["Culture", dest.cul, "🎭"],
  ];
  const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cinzel:wght@500;700&family=Cormorant+Garamond:wght@500;700&family=Barlow+Condensed:wght@400;600&display=swap');
.dp{position:fixed;inset:0;z-index:9999;overflow-y:auto;color:#fff7ec;font-family:"Barlow Condensed",Arial Narrow,sans-serif;background:#120a08}
.dp-wall{position:fixed;inset:0;z-index:0;background:url(${img}) center/cover no-repeat,url(/images/hero-jaipur.jpg) center/cover no-repeat,linear-gradient(170deg,var(--d),#120a08)}
.dp-shade{position:fixed;inset:0;z-index:0;background:linear-gradient(90deg,rgba(10,5,4,.78),rgba(10,5,4,.25) 70%),linear-gradient(to top,rgba(10,5,4,.7),transparent 50%)}
.dp-main{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:36px 32px 90px}
.dp-back{color:var(--c);text-decoration:none;font-size:1.1rem}
.dp-main h1{font-family:var(--f);color:var(--c);font-weight:700;font-size:clamp(2.8rem,9vw,6.4rem);line-height:1;margin:18vh 0 8px;max-width:14ch}
.dp-place{font-size:1.4rem;letter-spacing:.04em;margin:0 0 14px}
.dp-orn{display:flex;align-items:center;gap:12px;color:var(--c);margin:0 0 16px}
.dp-orn i{display:block;height:1px;width:90px;background:var(--c)}
.dp-blurb{font-size:1.4rem;line-height:1.5;max-width:40ch;margin:0 0 40px;color:#ffe9cc}
.dp-hist{margin:0 0 36px}
.dp-h2{font-family:var(--f);color:var(--c);font-size:2rem;margin:0 0 14px}
.dp-hcard{padding:22px;margin-bottom:14px;border-radius:20px;backdrop-filter:blur(14px);border:1px solid var(--c);background:rgba(10,5,4,.55)}
.dp-hcard h3{margin:0 0 8px;font-family:var(--f);color:var(--c);font-size:1.6rem}
.dp-hcard h4{margin:14px 0 4px;color:var(--c);font-size:1.1rem;letter-spacing:.06em;text-transform:uppercase}
.dp-hcard p{margin:0;font-size:1.2rem;line-height:1.5;white-space:pre-line}
.dp-hcard a{display:inline-block;margin-top:12px;color:var(--c);font-size:1rem}
.dp-note{font-size:.95rem;color:#ffe9cc;opacity:.8;margin:6px 0 0}
.dp-tabs{margin:0 0 32px}
.dp-tablist{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 16px}
.dp-tab{padding:10px 22px;border-radius:999px;border:1px solid var(--c);background:rgba(255,255,255,.08);color:#fff7ec;font:inherit;font-size:1.2rem;letter-spacing:.08em;cursor:pointer}
.dp-tab[aria-selected="true"]{background:var(--c);color:#1a0d05}
.dp-tab:focus-visible,.dp-items:focus-visible{outline:2px solid #fff;outline-offset:3px}
.dp-items{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;border-radius:20px}
.dp-item{padding:14px;border-radius:20px;backdrop-filter:blur(14px);border:1px solid var(--c);background:linear-gradient(160deg,color-mix(in srgb,var(--d) 55%,transparent),rgba(10,5,4,.5))}
.dp-ph,.dp-tile{display:block;width:100%;aspect-ratio:4/3;border-radius:14px;margin:0 0 10px}
.dp-ph{object-fit:cover}
.dp-tile{display:flex;align-items:center;justify-content:center;font-size:3.4rem;background:linear-gradient(160deg,var(--d),#120a08)}
.dp-item h3{margin:0 0 6px;font-family:var(--f);color:var(--c);font-weight:700;font-size:1.5rem}
.dp-item p{margin:0;font-size:1.15rem;line-height:1.4}
.dp-credit{font-size:.95rem;color:#ffe9cc;opacity:.8;margin:24px 0 0}
@media (prefers-reduced-motion:no-preference){.dp-item{transition:transform .2s}.dp-item:hover{transform:translateY(-3px)}}
.dp-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px;margin-bottom:32px}
.dp-card{padding:22px;border-radius:20px;backdrop-filter:blur(14px);border:1px solid var(--c);
  background:linear-gradient(160deg,color-mix(in srgb,var(--d) 55%,transparent),rgba(10,5,4,.5))}
.dp-card h2{margin:0 0 8px;font-family:var(--f);color:var(--c);font-weight:700;font-size:1.7rem}
.dp-card p{margin:0;font-size:1.25rem;line-height:1.4}
.dp-act{display:flex;gap:12px;flex-wrap:wrap}
.dp-btn{padding:12px 22px;border-radius:999px;text-decoration:none;font-size:1.15rem;color:#fff7ec;border:1px solid var(--c);background:rgba(255,255,255,.1);backdrop-filter:blur(8px)}
.dp-btn.main{background:var(--c);color:#1a0d05}
.dp-btn:focus-visible,.dp-back:focus-visible{outline:2px solid var(--c);outline-offset:3px}
`;
  return createPortal(
    <div className="dp" style={{ "--c": dest.c, "--d": dest.d, "--f": FONTS[dest.f] }}>
      <style>{css}</style>
      <div className="dp-wall" />
      <div className="dp-shade" />
      <main className="dp-main">
        <a className="dp-back" href="/explore">← All destinations</a>
        <h1>{dest.n}</h1>
        <p className="dp-place">{dest.p}</p>
        <div className="dp-orn"><i /><span>✦</span><i /></div>
        <p className="dp-blurb">{dest.b}</p>
        {(HISTORY[dest.s] || []).length > 0 && (
          <section className="dp-hist">
            <h2 className="dp-h2">History and heritage</h2>
            {HISTORY[dest.s].map((h) => (
              <article className="dp-hcard" key={h.name}>
                <h3>{h.name}</h3>
                {h.intro && <p>{h.intro}</p>}
                {h.history && (<><h4>History</h4><p>{h.history}</p></>)}
                {h.about && (<><h4>What makes it special</h4><p>{h.about}</p></>)}
                <a href={h.url} target="_blank" rel="noreferrer">Source: Wikipedia</a>
              </article>
            ))}
            <p className="dp-note">Text from Wikipedia, licensed CC BY-SA 4.0.</p>
          </section>
        )}
        {DETAILS[dest.s] && <DetailTabs dest={dest} />}
        <DestinationFeatures />
      <div className="dp-grid" style={DETAILS[dest.s] ? { display: "none" } : undefined}>
          {facts.map(([h, t, ic]) => (
            <div className="dp-card" key={h}>
              <h2>{ic} {h}</h2>
              <p>{t}</p>
            </div>
          ))}
        </div>
        <div className="dp-act">
          <a className="dp-btn main" href="/itinerary">Plan this trip</a>
          <a className="dp-btn" href="/ask">Ask about {dest.n.toLowerCase()}</a>
        </div>
      <p className="dp-credit">Photos: Wikimedia Commons</p>
      </main>
    </div>,
    document.body
  );
}

function DetailTabs({ dest }) {
  const details = DETAILS[dest.s] || {};
  const [tab, setTab] = useState("eat");
  const [manifest, setManifest] = useState({});
  const [bad, setBad] = useState({});
  useEffect(() => {
    let off = false;
    fetch("/images/destinations/photo-manifest.json")
      .then((r) => (r.ok ? r.json() : {}))
      .then((m) => {
        if (!off) setManifest(m || {});
      })
      .catch(() => {});
    return () => {
      off = true;
    };
  }, []);
  const tabs = [
    ["eat", "EAT", "\u{1F37D}\u{FE0F}"],
    ["wear", "WEAR", "\u{1F458}"],
    ["culture", "CULTURE", "\u{1F38E}"],
  ];
  const icon = tabs.find((t) => t[0] === tab)[2];
  const onKey = (e, i) => {
    let n = i;
    if (e.key === "ArrowRight") n = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") n = (i + tabs.length - 1) % tabs.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = tabs.length - 1;
    else return;
    e.preventDefault();
    setTab(tabs[n][0]);
    const el = document.getElementById("dp-tab-" + tabs[n][0]);
    if (el) el.focus();
  };
  return (
    <section className="dp-tabs">
      <div className="dp-tablist" role="tablist" aria-label="Eat, Wear and Culture">
        {tabs.map(([k, label], i) => (
          <button
            key={k}
            id={"dp-tab-" + k}
            type="button"
            role="tab"
            aria-selected={tab === k}
            aria-controls="dp-panel"
            tabIndex={tab === k ? 0 : -1}
            className="dp-tab"
            onClick={() => setTab(k)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {label}
          </button>
        ))}
      </div>
      <div id="dp-panel" role="tabpanel" aria-labelledby={"dp-tab-" + tab} tabIndex={0} className="dp-items">
        {(details[tab] || []).map((it) => {
          const key = dest.s + "/" + tab + "/" + it.id;
          const show = manifest[key] === true && !bad[key];
          return (
            <div className="dp-item" key={it.id}>
              {show ? (
                <img
                  className="dp-ph"
                  src={"/images/destinations/" + key + ".jpg"}
                  alt={it.name}
                  loading="lazy"
                  onError={() => setBad((b) => ({ ...b, [key]: true }))}
                />
              ) : (
                <div className="dp-tile" aria-hidden="true">{icon}</div>
              )}
              <h3>{it.name}</h3>
              <p>{it.note}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

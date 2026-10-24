"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { DESTS } from "@/data/destinations";
import { DETAILS } from "@/data/destination-details";

const q = (t) => encodeURIComponent(t);
const map = (t) => "https://www.google.com/maps/search/" + q(t);
const web = (t) => "https://www.google.com/search?q=" + q(t);

export default function DestinationFeatures() {
  const slug = (usePathname() || "").split("/").filter(Boolean).pop();
  const list = Array.isArray(DESTS) ? DESTS : Object.values(DESTS);
  const d = list.find((x) => x.s === slug);
  const [open, setOpen] = useState(null);
  if (!d) return null;
  const n = d.n;
  const det = (DETAILS && DETAILS[slug]) || {};
  const tiles = [
    { i: "🏛️", t: "Attractions", h: map("tourist attractions near " + n) },
    { i: "🍽️", t: "Eat", k: "eat" },
    { i: "🎭", t: "Tradition", k: "culture" },
    { i: "👗", t: "Wear", k: "wear" },
    { i: "🏨", t: "Hotels", h: map("hotels near " + n) },
    { i: "🚕", t: "Taxis & Transport", h: map("taxi stand near " + n) },
    { i: "🎟️", t: "Book Tickets", h: web(n + " official ticket booking") },
    { i: "🧭", t: "Local Guides", h: web("government approved tourist guide " + n) },
    { i: "🗺️", t: "Maps & Navigation", h: map(n) },
    { i: "🆘", t: "Emergency Help", h: "tel:112" },
    { i: "🗣️", t: "Culture & Language", h: "/phrases" },
    { i: "🎒", t: "Travel Essentials", h: web("travel essentials for " + n) },
    { i: "🧳", t: "Plans", k: "plans" },
    { i: "💡", t: "Ask about this place", h: "/ask?city=" + slug },
    { i: "🛍️", t: "Shopping & Souvenirs", h: map("souvenir shops near " + n) },
    { i: "📶", t: "eSIM & WiFi", h: web("tourist eSIM India") },
  ];
  const cards = [
    { t: "Find Your Perfect Stay", s: "Hotels near " + n, b: "Browse Hotels", h: map("hotels near " + n) },
    { t: "Travel Comfortably", s: "Taxis and local transport", b: "Find Transport", h: map("taxi stand near " + n) },
    { t: "Explore with Experts", s: "Authorised local guides", b: "Find a Guide", h: web("government approved tourist guide " + n) },
    { t: "Stay Safe, Always", s: "Dial 112 for emergencies", b: "Call 112", h: "tel:112" },
  ];
  const ext = (h) => (h.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {});
  const items = open ? det[open] || [] : [];
  const label = tiles.find((x) => x.k === open);

  return (
    <section className="df" aria-label={"Travel tools for " + n}>
      <div className="df-strip">
        {tiles.map((x) =>
          x.k ? (
            <button key={x.t} type="button" className="df-tile" aria-expanded={open === x.k} onClick={() => setOpen(open === x.k ? null : x.k)}>
              <span className="df-ic">{x.i}</span>
              <span>{x.t}</span>
            </button>
          ) : (
            <a key={x.t} className="df-tile" href={x.h} {...ext(x.h)}>
              <span className="df-ic">{x.i}</span>
              <span>{x.t}</span>
            </a>
          )
        )}
      </div>

      {open === "plans" && (
        <div className="df-panel">
          <h3>🧳 Plans for {n}</h3>
          <div className="df-plans">
            <article className="df-plan">
              <h4>Pack & Go</h4>
              <p><em>Land to a plan, not a problem.</em></p>
              <p>Book 5 to 10 days before you arrive (a few days also works). We plan your itinerary, guide, stay and pickup in advance.</p>
              <a href="/plans">View Pack & Go →</a>
            </article>
            <article className="df-plan">
              <h4>Just Landed</h4>
              <p><em>You have arrived. We are already moving.</em></p>
              <p>Book after you reach {n}. Same-day guide, stay and transport, subject to availability. Priority pricing, with the rush fee shown separately.</p>
              <a href="/plans">View Just Landed →</a>
            </article>
          </div>
        </div>
      )}

      {open && open !== "plans" && (
        <div className="df-panel">
          <h3>{label.i} {label.t} in {n}</h3>
          {items.length === 0 && <p>Details coming soon.</p>}
          <div className="df-items">
            {items.map((it) => (
              <article key={it.id} className="df-item">
                <div className="df-ph" style={{ background: d.d }}>
                  <span>{label.i}</span>
                  {it.photo === true && (
                    <img src={"/images/destinations/" + slug + "/" + open + "/" + it.id + ".jpg"} alt={it.name + " - " + n} loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                  )}
                </div>
                <h4>{it.name}</h4>
                {it.note && <p>{it.note}</p>}
              </article>
            ))}
          </div>
          <small>Photos and notes: Wikipedia and Wikimedia Commons</small>
        </div>
      )}

      <div className="df-cards">
        {cards.map((c) => (
          <a key={c.t} className="df-card" href={c.h} {...ext(c.h)} style={{ background: "linear-gradient(135deg," + d.d + "," + d.c + ")" }}>
            <strong>{c.t}</strong>
            <span>{c.s}</span>
            <em>{c.b} →</em>
          </a>
        ))}
      </div>

      <style>{`
        .df{margin:18px 0;color:#fff}
        .df-strip{display:grid;grid-template-columns:repeat(auto-fit,minmax(92px,1fr));gap:8px;padding:12px;border-radius:18px;background:rgba(255,255,255,.14);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.28)}
        .df-tile{display:flex;flex-direction:column;align-items:center;gap:6px;padding:8px 4px;border-radius:12px;background:transparent;border:0;color:inherit;font:inherit;font-size:12px;text-align:center;text-decoration:none;cursor:pointer;transition:background .2s}
        .df-tile:hover,.df-tile[aria-expanded="true"]{background:rgba(255,255,255,.22)}
        .df-tile:focus-visible,.df-card:focus-visible{outline:3px solid #fff;outline-offset:2px}
        .df-ic{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font-size:22px;background:rgba(255,255,255,.2)}
        .df-panel{margin-top:12px;padding:14px;border-radius:18px;background:rgba(0,0,0,.35);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.25)}
        .df-panel h3{margin:0 0 10px}
        .df-plans{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px}
        .df-plan{padding:14px;border-radius:14px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22)}
        .df-plan h4{margin:0 0 4px;font-size:16px}
        .df-plan p{margin:0 0 8px;font-size:13px}
        .df-plan a{display:inline-block;margin-top:4px;padding:8px 14px;border-radius:8px;background:#fff;color:#111;font-weight:600;font-size:13px;text-decoration:none}
        .df-items{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px}
        .df-item{padding:8px;border-radius:14px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22)}
        .df-item h4{margin:8px 0 4px;font-size:14px}
        .df-item p{margin:0;font-size:12px;opacity:.9}
        .df-ph{position:relative;aspect-ratio:4/3;border-radius:10px;overflow:hidden;display:grid;place-items:center;font-size:34px}
        .df-ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
        .df-panel small{display:block;margin-top:10px;opacity:.8}
        .df-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin-top:12px}
        .df-card{display:flex;flex-direction:column;gap:4px;padding:16px;border-radius:16px;color:#fff;text-decoration:none;border:1px solid rgba(255,255,255,.25)}
        .df-card span{font-size:12px;opacity:.9}
        .df-card em{margin-top:8px;font-style:normal;font-size:12px;font-weight:600}
        @media (prefers-reduced-motion:reduce){.df-tile{transition:none}}
      `}</style>
    </section>
  );
}
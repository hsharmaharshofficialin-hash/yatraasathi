"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useApp } from "@/hooks/useClient";

// Put your cinematic camel-in-desert photo at public/images/desert-camel.jpg
// If it is missing, the wallpaper falls back to Jaisalmer, then Jaipur, then the temple, then a sand gradient.
const WALL = "/images/desert-camel.jpg";

const tools = [
  { t: "ASK", h: "/ask", i: "💬" },
  { t: "BHEED", h: "/crowd", i: "👥" },
  { t: "DAYS", h: "/itinerary", i: "🗓" },
  { t: "BOL CHAAL", h: "/phrases", i: "🗣" },
  { t: "VICHAAR", h: "/ledger", i: "📝" },
  { t: "SOS", h: "/sos", i: "🆘" },
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600&display=swap');
.ts-root{position:fixed;inset:0;z-index:9999;overflow-y:auto;overflow-x:hidden;color:#fff7ec;
  font-family:"Barlow Condensed",Arial Narrow,sans-serif;background:#2a1208}
.ts-wall{position:fixed;inset:0;z-index:0;background-color:#3a1a08;background-size:cover;background-position:center;
  background-repeat:no-repeat;animation:tsfade .9s ease;
  background-image:url(${WALL}),url(/images/destinations/jaisalmer.jpg),url(/images/hero-jaipur.jpg),url(/images/hero-temple.jpg),
  linear-gradient(170deg,#e0a04a,#7a3a14 60%,#2a1208)}
@keyframes tsfade{from{opacity:.2}to{opacity:1}}
.ts-shade{position:fixed;inset:0;z-index:0;background:linear-gradient(to bottom,rgba(20,8,4,.5),rgba(20,8,4,.78))}
.ts-bar{position:relative;z-index:1;display:flex;align-items:center;gap:22px;flex-wrap:wrap;padding:24px 32px 8px}
.ts-logo{padding-left:12px;border-left:3px solid #ffd86b;font-family:"Bebas Neue",Impact,sans-serif;font-size:2.2rem;
  line-height:.9;letter-spacing:.06em;color:#fff7ec;text-decoration:none}
.ts-nav{display:flex;gap:8px;flex-wrap:wrap}
.ts-tab{display:flex;align-items:center;gap:6px;padding:8px 14px;border-radius:999px;font-size:1rem;color:#fff7ec;
  text-decoration:none;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(8px)}
.ts-tab:hover,.ts-tab.on{background:#ffd86b;color:#1a0d05;border-color:#ffd86b}
.ts-tab:focus-visible,.ts-logo:focus-visible{outline:2px solid #ffd86b;outline-offset:2px}
.ts-main{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:16px 32px 80px}
.ts-panel{border-radius:22px;padding:24px;backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.25);
  background:linear-gradient(160deg,rgba(255,200,120,.16),rgba(20,8,4,.58))}
.ts-panel a{color:#ffd86b}
.ts-panel input,.ts-panel textarea,.ts-panel select{background:rgba(0,0,0,.35);color:#fff7ec;
  border:1px solid rgba(255,255,255,.3);border-radius:12px}
.ts-panel input::placeholder,.ts-panel textarea::placeholder{color:rgba(255,247,236,.6)}
@media (prefers-reduced-motion:reduce){.ts-wall{animation:none}}
`;

export default function ToolShell({ children }) {
  const path = usePathname() || "";
  const { t } = useApp();
  const KEYS = { "/ask": "ask", "/arena": "arena", "/crowd": "crowd", "/itinerary": "itinerary", "/phrases": "phrases", "/ledger": "ledger", "/sos": "sos" };
  const labelFor = (it) => { const v = KEYS[it.h] ? t(KEYS[it.h]) : ""; return v ? String(v).toUpperCase() : it.t; };

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="ts-root">
      <style>{css}</style>
      <div className="ts-wall" />
      <div className="ts-shade" />
      <header className="ts-bar">
        <a className="ts-logo" href="/explore">YATRA<br />SATHI</a>
        <nav className="ts-nav">
          {tools.map((it) => {
            const on = path === it.h || path.startsWith(it.h + "/");
            return (
              <a key={it.t} className={"ts-tab" + (on ? " on" : "")} href={it.h}>
                <span>{it.i}</span>{labelFor(it)}
              </a>
            );
          })}
        </nav>
      </header>
      <main className="ts-main">
        <div className="ts-panel">{children}</div>
      </main>
    </div>
  );
}

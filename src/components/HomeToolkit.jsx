"use client";

const I = {
  ask: "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z",
  crowd: "M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 19v-1a4 4 0 0 0-3-3.9M15 4.2a3 3 0 0 1 0 5.6",
  days: "M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z",
  talk: "M3 5h12v9H8l-3 3v-3H3zM17 9h4v9h-2v3l-3-3h-4v-2",
  note: "M4 20h4L19 9l-4-4L4 16zM13 7l4 4",
  sos: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM12 8v5M12 16v.5",
  plan: "M3 7h18v12H3zM8 7V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M3 12h18",
};
const TOOLS = [
  { k: "ask", t: "Ask about a place", s: "History, food and customs", h: "/ask", c: "#3b82f6" },
  { k: "days", t: "Itinerary", s: "Plan your days", h: "/itinerary", c: "#14b8a6" },
];

function Icon({ k, c }) {
  return (
    <span className="ht-ic" style={{ background: c + "2e", color: c }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={I[k]} /></svg>
    </span>
  );
}

export default function HomeToolkit() {
  return (
    <section className="ht" aria-label="Your travel toolkit">
      <header className="ht-head">
        <div>
          <h2>Your travel toolkit</h2>
          <p>Everything for your trip, in one place</p>
        </div>
        <span className="ht-count">{TOOLS.length + 1} tools</span>
      </header>

      <div className="ht-grid">
        <div className="ht-card ht-feat">
          <Icon k="plan" c="#f59e0b" />
          <strong>Plans</strong>
          <span>Let us plan your trip. Choose when you want us involved.</span>
          <div className="ht-btns">
            <a href="/plans?plan=packgo">Pack &amp; Go</a>
            <a href="/plans?plan=justlanded">Just Landed</a>
          </div>
        </div>


        {TOOLS.map((x) => (
          <a key={x.k} href={x.h} className="ht-card ht-link">
            <Icon k={x.k} c={x.c} />
            <strong>{x.t}</strong>
            <span>{x.s}</span>
            <i aria-hidden="true">→</i>
          </a>
        ))}
      </div>

      <div className="ht-sosbar">
        <strong>Need help right now?</strong>
        <span>Quick access to emergency resources</span>
        <a href="/sos" className="ht-sosbtn">SOS Emergency</a>
      </div>

      <style>{`
        .ht-sosbar{margin-top:12px;padding:12px;border-radius:14px;background:rgba(220,38,38,.2);border:1px solid rgba(248,113,113,.55)}
        .ht-sosbar strong{display:block;font-size:15px}
        .ht-sosbar span{font-size:12px;color:rgba(255,255,255,.8)}
        .ht-sosbtn{display:block;margin-top:10px;padding:12px;border-radius:10px;background:#b9301f;color:#fff;text-align:center;font-weight:700;text-decoration:none}
        .ht-sosbtn:hover{background:#d13b27}
        .ht-sosbtn:focus-visible{outline:3px solid #fbbf24;outline-offset:2px}
        .ht{max-width:1000px;margin:0 auto;padding:18px;border-radius:20px;background:rgba(12,18,28,.78);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.14);color:#fff;font-family:system-ui,sans-serif;box-shadow:0 12px 40px rgba(0,0,0,.35)}
        .ht-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
        .ht-head h2{margin:0;font-size:17px;font-weight:650}
        .ht-head p{margin:2px 0 0;font-size:12px;color:rgba(255,255,255,.7)}
        .ht-count{font-size:12px;padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.12);color:rgba(255,255,255,.85)}
        .ht-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px}
        .ht-card{position:relative;display:flex;flex-direction:column;gap:4px;padding:14px;border-radius:14px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.13);color:#fff;text-decoration:none;transition:transform .15s,background .15s,border-color .15s}
        .ht-link:hover{transform:translateY(-3px);background:rgba(255,255,255,.13);border-color:rgba(255,255,255,.3)}
        .ht-card:focus-visible,.ht-btns a:focus-visible{outline:3px solid #fbbf24;outline-offset:2px}
        .ht-ic{width:42px;height:42px;border-radius:12px;display:grid;place-items:center;margin-bottom:6px}
        .ht-card strong{font-size:14px}
        .ht-card span{font-size:12px;color:rgba(255,255,255,.72);line-height:1.4}
        .ht-link i{position:absolute;top:14px;right:14px;font-style:normal;color:rgba(255,255,255,.5)}
        .ht-feat{grid-column:span 2;background:linear-gradient(135deg,rgba(245,158,11,.22),rgba(255,255,255,.06));border-color:rgba(245,158,11,.5)}
        .ht-sos{background:linear-gradient(135deg,rgba(220,38,38,.25),rgba(255,255,255,.06));border-color:rgba(248,113,113,.5)}
        .ht-btns{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
        .ht-btns a{padding:8px 14px;border-radius:8px;background:#fff;color:#111827;font-size:13px;font-weight:650;text-decoration:none}
        .ht-btns a:hover{background:#fde68a}
        @media (max-width:520px){.ht-feat{grid-column:span 1}}
        @media (prefers-reduced-motion:reduce){.ht-card{transition:none}.ht-link:hover{transform:none}}
      `}</style>
    </section>
  );
}
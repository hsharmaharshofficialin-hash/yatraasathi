"use client";
import { useState } from "react";
import { DESTS } from "@/data/destinations";
import { HISTORY } from "@/data/destination-history";
import { DETAILS } from "@/data/destination-details";

const TOPICS = [
  { id: "history", label: "History", words: ["history", "built", "founded", "who ", "when", "origin", "ancient", "dynasty", "king", "ruler"] },
  { id: "special", label: "What makes it special", words: ["special", "famous", "known", "unesco", "heritage", "why", "about", "what is", "significance", "architecture"] },
  { id: "eat", label: "Eat", words: ["eat", "food", "dish", "cuisine", "taste", "restaurant", "meal", "drink", "sweet"] },
  { id: "culture", label: "Tradition", words: ["culture", "tradition", "festival", "custom", "dance", "music", "ritual", "craft", "art"] },
  { id: "wear", label: "Wear", words: ["wear", "dress", "cloth", "attire", "outfit", "saree", "turban"] },
];

function pick(q) {
  const t = q.toLowerCase();
  let best = null;
  let score = 0;
  for (const x of TOPICS) {
    const s = x.words.filter((w) => t.includes(w)).length;
    if (s > score) { score = s; best = x.id; }
  }
  return best;
}

export default function CityAsk({ slug }) {
  const list = Array.isArray(DESTS) ? DESTS : Object.values(DESTS);
  const d = list.find((x) => x.s === slug);
  const [q, setQ] = useState("");
  const [topic, setTopic] = useState(null);
  const [miss, setMiss] = useState(false);

  if (!d) {
    return (
      <main className="ca">
        <h1>Choose a place</h1>
        <p>We could not find that city. Pick one:</p>
        <div className="ca-chips">{list.map((x) => <a key={x.s} href={"/ask?city=" + x.s}>{x.n}</a>)}</div>
        <style>{CSS}</style>
      </main>
    );
  }

  const places = (HISTORY && HISTORY[slug]) || [];
  const det = (DETAILS && DETAILS[slug]) || {};
  const items = topic === "eat" || topic === "culture" || topic === "wear" ? det[topic] || [] : [];
  const go = (id) => { setTopic(id); setMiss(false); };
  const ask = (e) => {
    e.preventDefault();
    const id = pick(q);
    if (id) go(id);
    else { setTopic(null); setMiss(true); }
  };

  return (
    <main className="ca">
      <h1>Ask about {d.n}</h1>
      <p className="ca-sub">{d.p}</p>
      <label className="ca-sel">Place
        <select value={slug} onChange={(e) => { window.location.href = "/ask?city=" + e.target.value; }}>
          {list.map((x) => <option key={x.s} value={x.s}>{x.n}</option>)}
        </select>
      </label>
      <form onSubmit={ask} className="ca-form">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={"Ask about " + d.n + " (history, food, dress, traditions)"} aria-label="Your question" />
        <button type="submit">Show answer</button>
      </form>
      <div className="ca-chips" role="group" aria-label="Topics">
        {TOPICS.map((x) => <button key={x.id} type="button" aria-pressed={topic === x.id} onClick={() => go(x.id)}>{x.label}</button>)}
      </div>

      {miss && <p className="ca-box">We cannot answer that from our verified data yet. Try a topic above. AI answers are coming.</p>}

      {(topic === "history" || topic === "special") && (
        places.length === 0 ? <p className="ca-box">No verified history saved for this place yet.</p> :
        places.map((p) => (
          <article key={p.name} className="ca-box">
            <h2>{p.name}</h2>
            {topic === "special" && p.intro && <p>{p.intro}</p>}
            <p>{topic === "history" ? p.history || "No history text saved." : p.about || "No text saved."}</p>
            {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer">Source: Wikipedia</a>}
            <small>Text from Wikipedia, CC BY-SA.</small>
          </article>
        ))
      )}

      {(topic === "eat" || topic === "culture" || topic === "wear") && (
        items.length === 0 ? <p className="ca-box">Nothing saved for this topic yet.</p> :
        <div className="ca-box">
          {items.map((it) => <p key={it.id}><strong>{it.name}</strong>{it.note ? ": " + it.note : ""}</p>)}
          <small>Notes: Wikipedia and Wikimedia Commons.</small>
        </div>
      )}

      <p className="ca-foot">Answers come only from verified text saved in YatraSathi. Nothing is invented.</p>
      <style>{CSS}</style>
    </main>
  );
}

const CSS = `
.ca{max-width:860px;margin:0 auto;padding:24px 16px;color:#fff;font-family:system-ui,sans-serif}
.ca h1{margin:0 0 4px;font-size:28px}
.ca-sub{margin:0 0 14px;opacity:.8}
.ca-sel{display:flex;flex-direction:column;gap:6px;font-size:13px;font-weight:600;margin-bottom:12px;max-width:320px}
.ca select,.ca input{padding:11px;border-radius:10px;border:1px solid rgba(255,255,255,.35);background:rgba(0,0,0,.4);color:#fff;font-size:15px}
.ca-form{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}
.ca-form input{flex:1;min-width:220px}
.ca button,.ca-chips a{padding:10px 16px;border-radius:999px;border:1px solid rgba(255,255,255,.4);background:rgba(255,255,255,.14);color:#fff;font-size:14px;font-weight:600;cursor:pointer;text-decoration:none}
.ca button[aria-pressed="true"],.ca-form button{background:#fbbf24;color:#1a1a1a;border-color:#fbbf24}
.ca button:focus-visible,.ca input:focus-visible,.ca select:focus-visible,.ca-chips a:focus-visible{outline:3px solid #fff;outline-offset:2px}
.ca-chips{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px}
.ca-box{padding:16px;border-radius:14px;background:rgba(0,0,0,.45);border:1px solid rgba(255,255,255,.22);margin:0 0 12px;line-height:1.55}
.ca-box h2{margin:0 0 8px;font-size:19px}
.ca-box p{margin:0 0 8px}
.ca-box a{color:#fde68a}
.ca-box small{display:block;margin-top:6px;opacity:.75}
.ca-foot{font-size:12px;opacity:.75}
`;
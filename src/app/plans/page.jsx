"use client";
import { useEffect, useState } from "react";
import { DESTS } from "@/data/destinations";

const PLANS = {
  packgo: { name: "Pack & Go", tag: "Land to a plan, not a problem.", when: "Book 5 to 10 days before you arrive. A few days before also works (minimum 2 days).", price: "Standard pricing. The price is confirmed with you before any payment.", points: ["Day-by-day itinerary for your city", "Guide matched to your interests and language", "Hotel shortlist within your budget", "Airport or station pickup arranged", "Time to confirm and adjust everything"] },
  justlanded: { name: "Just Landed", tag: "You've arrived. We're already moving.", when: "Book after you reach the city.", price: "Priority pricing. The rush fee is shown as a separate line before you confirm. Subject to availability.", points: ["Same-day guide on request", "Stay options for tonight", "Local transport arranged", "Itinerary adjusted around your free hours", "One point of contact while you are in the city"] },
};
const INTERESTS = ["History & monuments", "Food", "Culture & festivals", "Nature & scenery", "Spiritual places", "Shopping & crafts", "Photography", "Adventure"];
const NEEDS = ["Stay for tonight", "Guide for today", "Local transport", "Food recommendations", "Plan for my free hours"];
const BLANK = { city: "", name: "", phone: "", email: "", adults: "2", children: "0", date: "", days: "3", mode: "Flight", point: "", time: "", budget: "Mid-range", stay: "Hotel", interests: [], pace: "Balanced", food: "No preference", guide: "Yes", lang: "English", pickup: "Yes", special: "", needs: [], where: "", hours: "4" };

function Sel({ label, value, onChange, opts }) {
  return (<label>{label}<select value={value} onChange={onChange}>{opts.map((o) => <option key={o} value={o}>{o}</option>)}</select></label>);
}
function Inp({ label, ...p }) {
  return (<label>{label}<input {...p} /></label>);
}
function Checks({ legend, opts, value, onToggle }) {
  return (<fieldset><legend>{legend}</legend>{opts.map((o) => (<label key={o} className="pl-ck"><input type="checkbox" checked={value.includes(o)} onChange={() => onToggle(o)} />{o}</label>))}</fieldset>);
}
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => String(a + i));

export default function PlansPage() {
  const list = Array.isArray(DESTS) ? DESTS : Object.values(DESTS);
  const [plan, setPlan] = useState(null);
  const [f, setF] = useState({ ...BLANK, city: list[0].s });
  const [err, setErr] = useState("");
  const [done, setDone] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const pl = p.get("plan");
    const c = p.get("city");
    if (PLANS[pl]) setPlan(pl);
    if (list.some((d) => d.s === c)) setF((x) => ({ ...x, city: c }));
  }, []);

  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));
  const tog = (k) => (v) => setF((x) => ({ ...x, [k]: x[k].includes(v) ? x[k].filter((i) => i !== v) : [...x[k], v] }));
  const fail = (m) => setErr(m);
  const choose = (id) => { setPlan(id); setDone(null); setErr(""); window.history.replaceState(null, "", "?plan=" + id + "&city=" + f.city); };
  const back = () => { setPlan(null); setDone(null); setErr(""); window.history.replaceState(null, "", "/plans"); };

  function submit(e) {
    e.preventDefault();
    setDone(null);
    setCopied(false);
    if (f.name.trim().length < 2) return fail("Please enter your name.");
    if (!/^[0-9+\s-]{8,15}$/.test(f.phone.trim())) return fail("Please enter a valid phone number.");
    if (f.email.trim() && !/^\S+@\S+\.\S+$/.test(f.email.trim())) return fail("Please enter a valid email, or leave it empty.");
    const city = list.find((d) => d.s === f.city).n;
    const L = [["Plan", PLANS[plan].name], ["City", city], ["Name", f.name.trim()], ["Phone", f.phone.trim()]];
    if (f.email.trim()) L.push(["Email", f.email.trim()]);
    L.push(["Travellers", f.adults + " adult(s), " + f.children + " child(ren)"]);
    if (plan === "packgo") {
      if (!f.date) return fail("Please choose your arrival date.");
      const diff = Math.round((new Date(f.date + "T00:00:00") - new Date(new Date().toDateString())) / 86400000);
      if (diff < 2) return fail("Pack & Go needs at least 2 days before arrival. For sooner, choose Just Landed.");
      if (diff > 365) return fail("Please choose a date within the next year.");
      if (!f.interests.length) return fail("Pick at least one interest.");
      L.push(["Arrival", f.date + " by " + f.mode + (f.point.trim() ? " at " + f.point.trim() : "") + (f.time ? ", " + f.time : "")]);
      L.push(["Trip length", f.days + " day(s)"], ["Budget", f.budget], ["Stay", f.stay], ["Interests", f.interests.join(", ")], ["Pace", f.pace], ["Food", f.food], ["Guide", f.guide === "Yes" ? "Yes, " + f.lang : "No"], ["Pickup", f.pickup]);
    } else {
      if (!f.needs.length) return fail("Pick at least one thing you need.");
      L.push(["Needs", f.needs.join(", ")], ["Currently at", f.where.trim() || "Not given"], ["Free hours today", f.hours], ["Budget", f.budget], ["Guide language", f.lang], ["Food", f.food]);
    }
    if (f.special.trim()) L.push(["Special requests", f.special.trim()]);
    setErr("");
    setDone(L);
  }

  async function copy() {
    try { await navigator.clipboard.writeText(done.map((l) => l[0] + ": " + l[1]).join("\n")); setCopied(true); } catch (e) { setCopied(false); }
  }

  const P = plan ? PLANS[plan] : null;
  const cityName = (list.find((d) => d.s === f.city) || list[0]).n;

  return (
    <main className="pl">
      {!P && (
        <>
          <h1>Plan your trip with YatraSathi</h1>
          <p className="pl-sub">Two ways to travel with a plan. Choose when you want us involved.</p>
          <div className="pl-cards">
            {Object.entries(PLANS).map(([id, p]) => (
              <article key={id} className="pl-card">
                <h2>{p.name}</h2>
                <p className="pl-tag">{p.tag}</p>
                <p className="pl-when">{p.when}</p>
                <button type="button" onClick={() => choose(id)}>Choose {p.name}</button>
              </article>
            ))}
          </div>
        </>
      )}

      {P && (
        <>
          <button type="button" className="pl-link" onClick={back}>← All plans</button>
          <a className="pl-link" href={"/destinations/" + f.city}>Back to {cityName}</a>
          <h1>{P.name} for {cityName}</h1>
          <p className="pl-tag">{P.tag}</p>
          <p className="pl-when">{P.when}</p>
          <ul className="pl-pts">{P.points.map((x) => <li key={x}>{x}</li>)}</ul>
          <p className="pl-price">{P.price}</p>

          <form className="pl-form" onSubmit={submit} noValidate>
            <h2>Your journey details</h2>
            <label>City<select value={f.city} onChange={set("city")}>{list.map((d) => <option key={d.s} value={d.s}>{d.n}</option>)}</select></label>
            <Sel label="Adults" value={f.adults} onChange={set("adults")} opts={range(1, 10)} />
            <Sel label="Children" value={f.children} onChange={set("children")} opts={range(0, 8)} />

            {plan === "packgo" ? (
              <>
                <Inp label="Arrival date" type="date" value={f.date} onChange={set("date")} />
                <Sel label="Trip length (days)" value={f.days} onChange={set("days")} opts={range(1, 15)} />
                <Sel label="Arriving by" value={f.mode} onChange={set("mode")} opts={["Flight", "Train", "Bus", "Own vehicle"]} />
                <Inp label="Airport, station or stand" value={f.point} onChange={set("point")} />
                <Inp label="Arrival time" type="time" value={f.time} onChange={set("time")} />
                <Sel label="Budget" value={f.budget} onChange={set("budget")} opts={["Budget-friendly", "Mid-range", "Premium"]} />
                <Sel label="Stay type" value={f.stay} onChange={set("stay")} opts={["Hotel", "Heritage hotel", "Homestay", "Hostel", "No stay needed"]} />
                <Sel label="Pace" value={f.pace} onChange={set("pace")} opts={["Relaxed", "Balanced", "Packed"]} />
                <Sel label="Food preference" value={f.food} onChange={set("food")} opts={["No preference", "Vegetarian", "Non-vegetarian", "Jain", "Vegan"]} />
                <Sel label="Need a guide?" value={f.guide} onChange={set("guide")} opts={["Yes", "No"]} />
                {f.guide === "Yes" && <Sel label="Guide language" value={f.lang} onChange={set("lang")} opts={["English", "Hindi", "Other (write in notes)"]} />}
                <Sel label="Pickup on arrival?" value={f.pickup} onChange={set("pickup")} opts={["Yes", "No"]} />
                <Checks legend="Interests (pick at least one)" opts={INTERESTS} value={f.interests} onToggle={tog("interests")} />
              </>
            ) : (
              <>
                <Checks legend="What do you need? (pick at least one)" opts={NEEDS} value={f.needs} onToggle={tog("needs")} />
                <Inp label="Where are you now? (area or hotel)" value={f.where} onChange={set("where")} />
                <Sel label="Free hours today" value={f.hours} onChange={set("hours")} opts={range(1, 12)} />
                <Sel label="Budget" value={f.budget} onChange={set("budget")} opts={["Budget-friendly", "Mid-range", "Premium"]} />
                <Sel label="Guide language" value={f.lang} onChange={set("lang")} opts={["English", "Hindi", "Other (write in notes)"]} />
                <Sel label="Food preference" value={f.food} onChange={set("food")} opts={["No preference", "Vegetarian", "Non-vegetarian", "Jain", "Vegan"]} />
              </>
            )}

            <label className="pl-wide">Anything else? (seniors, wheelchair, kids, allergies, special wishes)<textarea rows={3} value={f.special} onChange={set("special")} /></label>
            <Inp label="Your name" value={f.name} onChange={set("name")} autoComplete="name" />
            <Inp label="Phone" value={f.phone} onChange={set("phone")} inputMode="tel" autoComplete="tel" />
            <Inp label="Email (optional)" value={f.email} onChange={set("email")} type="email" autoComplete="email" />
            {err && <p className="pl-err" role="alert">{err}</p>}
            <button type="submit" className="pl-go">Request {P.name}</button>
            <small className="pl-wide">Demo: no payment is taken and nothing is sent yet.</small>
          </form>

          {done && (
            <section className="pl-done" role="status">
              <h3>Request summary</h3>
              <dl>{done.map((l) => (<div key={l[0]}><dt>{l[0]}</dt><dd>{l[1]}</dd></div>))}</dl>
              <p>A team member would confirm details and price with you before any payment.</p>
              <button type="button" className="pl-go" onClick={copy}>{copied ? "Copied" : "Copy summary"}</button>
            </section>
          )}
        </>
      )}

      <style>{`
        .pl{max-width:1000px;margin:0 auto;padding:32px 20px;font-family:system-ui,sans-serif;color:#1c2431}
        .pl h1{font-size:30px;margin:12px 0 6px}
        .pl-sub,.pl-price{color:#556070}
        .pl-tag{margin:4px 0 10px;font-style:italic;color:#556070}
        .pl-when{font-weight:600;margin:0 0 10px}
        .pl-pts{margin:0 0 12px;padding-left:18px;line-height:1.7}
        .pl-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px;margin-top:20px}
        .pl-card{background:#fff;border:1px solid #d9dee6;border-radius:12px;padding:22px}
        .pl-card h2{margin:0;font-size:22px}
        .pl button,.pl-go{background:#c2410c;color:#fff;border:0;border-radius:8px;padding:11px 18px;font-size:15px;font-weight:600;cursor:pointer}
        .pl .pl-link{background:none;color:#c2410c;padding:0;font-size:14px;margin-right:16px;text-decoration:underline}
        .pl button:focus-visible,.pl input:focus-visible,.pl select:focus-visible,.pl textarea:focus-visible,.pl-link:focus-visible{outline:3px solid #1c2431;outline-offset:2px}
        .pl-form{margin-top:18px;background:#fff;border:1px solid #d9dee6;border-radius:12px;padding:22px;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px}
        .pl-form h2{grid-column:1/-1;margin:0}
        .pl-form label{display:flex;flex-direction:column;gap:6px;font-size:14px;font-weight:600}
        .pl-form input,.pl-form select,.pl-form textarea{padding:10px;border:1px solid #b9c1cd;border-radius:8px;font-size:15px;font-family:inherit}
        .pl-form fieldset{grid-column:1/-1;border:1px solid #d9dee6;border-radius:8px;display:flex;flex-wrap:wrap;gap:8px 18px;padding:12px}
        .pl-form legend{font-weight:600;font-size:14px;padding:0 6px}
        .pl-form label.pl-ck{flex-direction:row;align-items:center;font-weight:400}
        .pl-form label.pl-ck input{padding:0}
        .pl-wide,.pl-err,.pl-form .pl-go{grid-column:1/-1}
        .pl-form .pl-go{justify-self:start}
        .pl-err{color:#b91c1c;margin:0;font-weight:600}
        .pl-done{margin-top:18px;padding:18px;border-radius:12px;background:#ecfdf3;border:1px solid #86d7a8}
        .pl-done h3{margin:0 0 10px}
        .pl-done dl{margin:0 0 10px}
        .pl-done dl div{display:flex;gap:10px;padding:3px 0}
        .pl-done dt{font-weight:600;min-width:140px}
        .pl-done dd{margin:0}
      `}</style>
    </main>
  );
}

import os, shutil, sys, time

PAGE = os.path.join("src", "components", "DestinationPage.jsx")
DATA = os.path.join("src", "data", "city-extras.js")
COMP = os.path.join("src", "components", "CityPlanner.jsx")

DATA_JS = r"""
const HI = [
  ["Hello", "Namaste"],
  ["Thank you", "Dhanyavaad"],
  ["How much is this?", "Yeh kitne ka hai?"],
  ["Where is ...?", "... kahaan hai?"],
  ["I need water", "Mujhe paani chahiye"],
  ["Please help me", "Kripya meri madad kijiye"],
];
const NOTE = "Romanized and approximate. Verify with a local speaker. Hindi and English are widely understood at most tourist sites.";

export const LANGS = {
  hindi: { name: "Hindi", phrases: HI, note: NOTE },
  punjabi: {
    name: "Punjabi",
    phrases: [
      ["Hello", "Sat sri akaal"],
      ["Thank you", "Shukriya"],
      ["How much is this?", "Eh kinne da hai?"],
      ["Where is ...?", "... kithe hai?"],
      ["I need water", "Mainu paani chahida hai"],
      ["Please help me", "Meri madad karo ji"],
    ],
    note: NOTE,
  },
  malayalam: {
    name: "Malayalam",
    phrases: [
      ["Hello", "Namaskaram"],
      ["Thank you", "Nanni"],
      ["How much is this?", "Ithinu entha vila?"],
      ["Where is ...?", "... evide aanu?"],
      ["I need water", "Enikku vellam venam"],
      ["Please help me", "Dayavayi enne sahayikkoo"],
    ],
    note: NOTE,
  },
  kannada: {
    name: "Kannada",
    phrases: [
      ["Hello", "Namaskara"],
      ["Thank you", "Dhanyavadagalu"],
      ["How much is this?", "Idakke eshtu?"],
      ["Where is ...?", "... elli ide?"],
      ["I need water", "Nanage neeru beku"],
      ["Please help me", "Dayavittu sahaya maadi"],
    ],
    note: NOTE,
  },
  marathi: {
    name: "Marathi",
    phrases: [
      ["Hello", "Namaskar"],
      ["Thank you", "Dhanyavaad"],
      ["How much is this?", "Hyachi kimmat kiti aahe?"],
      ["Where is ...?", "... kuthe aahe?"],
      ["I need water", "Mala paani pahije"],
      ["Please help me", "Krupaya madat kara"],
    ],
    note: NOTE,
  },
  konkani: {
    name: "Konkani",
    phrases: [
      ["Hello (good day)", "Dev borem dis dium"],
      ["Thank you", "Dev borem korum"],
      ["How much is this?", "Hem kitlem?"],
      ["Where is ...?", "... khoim asa?"],
      ["I need water", "Mhaka udak zai"],
      ["Please help me", "Mhaka sahay kor"],
    ],
    note: "Romanized and approximate; Konkani spellings vary. Verify with a local speaker. Hindi and English are widely understood in Goa.",
  },
  odia: {
    name: "Odia",
    phrases: [
      ["Hello", "Namaskar"],
      ["Thank you", "Dhanyabad"],
      ["How much is this?", "Eta kete?"],
      ["Where is ...?", "... kouthare achhi?"],
      ["I need water", "Mote pani darkar"],
      ["Please help me", "Mote sahajya kara"],
    ],
    note: NOTE,
  },
  tamil: {
    name: "Tamil",
    phrases: [
      ["Hello", "Vanakkam"],
      ["Thank you", "Nandri"],
      ["How much is this?", "Idhu evvalavu?"],
      ["Where is ...?", "... enge irukku?"],
      ["I need water", "Enakku thanni venum"],
      ["Please help me", "Dayavu seydhu udhavungal"],
    ],
    note: NOTE,
  },
  kashmiri: {
    name: "Kashmiri (Urdu and Hindi are widely understood)",
    phrases: [["Hello", "Salaam"], ["Thank you", "Shukriya"], ...HI.slice(2)],
    note: "Greeting and thanks are Kashmiri or Urdu; the other phrases are in Hindi. Approximate. Verify with a local speaker.",
  },
  ladakhi: {
    name: "Ladakhi (Hindi is widely understood)",
    phrases: [["Hello (also goodbye)", "Julley"], ["Thank you", "Thuk-je-che"], ...HI.slice(2)],
    note: "Greeting and thanks are Ladakhi; the other phrases are in Hindi. Approximate. Verify with a local speaker.",
  },
};

const AP = "(approximate)";

export const TOOLS = {
  "taj-mahal": { lang: "hindi", best: "October to March, when days are cooler " + AP, busy: "Weekends, public holidays and the winter holiday season", tip: "The monument is closed on Fridays. Go at opening time for fewer crowds. April to June is very hot." },
  "amer-jaipur": { lang: "hindi", best: "October to March " + AP, busy: "Winter months and public holidays", tip: "Go early in the day for fewer crowds and cooler weather. April to June is very hot." },
  "red-fort": { lang: "hindi", best: "October to March " + AP, busy: "Weekends and holidays; security is tight around Independence Day (15 August)", tip: "Closed on Mondays. Expect security checks at the entrance." },
  "qutub-minar": { lang: "hindi", best: "October to March " + AP, busy: "Weekends and public holidays", tip: "Go early in the morning. Delhi summers are very hot and winter mornings can be foggy." },
  "varanasi": { lang: "hindi", best: "October to March " + AP, busy: "Festival periods such as Dev Deepawali (around November) and Maha Shivratri; the evening Ganga Aarti is crowded all year", tip: "During the monsoon (roughly July to September) the river rises and some ghats go under water." },
  "golden-temple": { lang: "punjabi", best: "October to March " + AP, busy: "Weekends and festivals such as Baisakhi (April), Diwali and Gurpurabs", tip: "Cover your head, remove your shoes and wash your feet before entering. The complex stays open very long hours; check locally." },
  "kerala-backwaters": { lang: "malayalam", best: "September or October to March " + AP, busy: "December and January are the peak; the monsoon (June to August) brings heavy rain", tip: "Snake boat races around Onam (August or September) draw large crowds." },
  "mysore-palace": { lang: "kannada", best: "October to February " + AP, busy: "The Dasara festival (September or October) is the busiest period", tip: "The palace is usually lit up on Sunday and public holiday evenings; check current timings." },
  "hampi": { lang: "kannada", best: "October to February " + AP, busy: "Winter months; sunrise and sunset viewpoints get crowded", tip: "March to May is very hot and the ruins have little shade." },
  "khajuraho": { lang: "hindi", best: "October to March " + AP, busy: "The winter holiday season; the Khajuraho Dance Festival is usually held in February", tip: "Visit the temples early in the day and check current opening and show timings locally." },
  "ajanta-ellora": { lang: "marathi", best: "October to March; the monsoon months are green but wet " + AP, busy: "Weekends and winter holidays", tip: "Ajanta is usually closed on Mondays and Ellora on Tuesdays. Confirm before you go." },
  "mumbai": { lang: "marathi", best: "November to February " + AP, busy: "Ganesh Chaturthi (August or September) fills the streets; weekday office hours have heavy traffic", tip: "The monsoon (June to September) brings heavy rain and waterlogging. Carry rain gear." },
  "goa": { lang: "konkani", best: "November to February " + AP, busy: "Christmas to New Year is the peak; Carnival is usually in February", tip: "The monsoon (June to September) is off-season and some beach shacks close." },
  "konark": { lang: "odia", best: "October to March " + AP, busy: "The Konark Dance Festival (usually early December) and the Chandrabhaga Mela (usually in winter)", tip: "Midday is hot and humid. Go in the morning or late afternoon." },
  "meenakshi-madurai": { lang: "tamil", best: "October to March " + AP, busy: "The Chithirai Festival (April or May) and other major temple festivals", tip: "Dress modestly, footwear is left outside, and check the current temple timings." },
  "jaisalmer": { lang: "hindi", best: "October to March " + AP, busy: "The winter season and the Desert Festival (usually February)", tip: "Summer days are extremely hot; desert camps get cold at night in winter." },
  "udaipur": { lang: "hindi", best: "October to March " + AP, busy: "December and January; spring festivals such as Mewar Festival", tip: "Sunset boat rides on Lake Pichola are popular; book ahead in peak season." },
  "ladakh": { lang: "ladakhi", best: "June to September, when the high roads are usually open " + AP, busy: "July and August", tip: "Leh is at about 3,500 metres. Rest for a day or two to acclimatise. The Manali to Leh and Srinagar to Leh roads usually close in winter." },
  "kashmir": { lang: "kashmiri", best: "April to October for spring, summer and autumn; December to February for snow " + AP, busy: "Summer holidays (May to June) and the winter snow season", tip: "Check current travel advisories and road conditions before you go." },
  "rishikesh": { lang: "hindi", best: "September to November and February to April " + AP, busy: "The Char Dham pilgrimage season (roughly May to October) and the International Yoga Festival (March)", tip: "River rafting usually pauses in the peak monsoon. Check with operators." },
};

const DELHI = ["Handicrafts and textiles from state emporiums", "Spices and tea", "Attar (traditional perfumes)", "Silver and costume jewellery"];

export const SOUVENIRS = {
  "taj-mahal": ["Marble inlay work", "Leather goods and footwear", "Petha (local sweet)", "Zardozi embroidery"],
  "amer-jaipur": ["Block-printed textiles", "Blue pottery", "Gemstone and silver jewellery", "Juttis (traditional footwear)"],
  "red-fort": DELHI,
  "qutub-minar": DELHI,
  "varanasi": ["Banarasi silk and brocade", "Wooden lacquerware toys", "Brassware", "Rudraksha beads and religious items"],
  "golden-temple": ["Phulkari embroidery", "Punjabi juttis", "Amritsari papad and wadiyan", "Steel and brass kadas (bangles)"],
  "kerala-backwaters": ["Spices (pepper, cardamom)", "Coir products", "Kasavu cotton saris", "Coconut-shell crafts"],
  "mysore-palace": ["Mysore silk", "Sandalwood and incense", "Mysore Pak (sweet)", "Channapatna wooden toys"],
  "hampi": ["Hand-embroidered textiles and bags", "Stone and wood handicrafts", "Local spices", "Paintings and postcards"],
  "khajuraho": ["Replica stone sculptures", "Brass and metal handicrafts", "Hand-block printed textiles", "Miniature paintings"],
  "ajanta-ellora": ["Himroo fabric", "Paithani saris", "Cave-art inspired paintings", "Local handicrafts"],
  "mumbai": ["Kolhapuri chappals", "Handicrafts from state emporiums", "Spices and dry fruits", "Street fashion and accessories"],
  "goa": ["Cashew nuts", "Goan spices", "Shell and bamboo handicrafts", "Cotton beachwear"],
  "konark": ["Pattachitra paintings", "Pipli applique work", "Stone carvings", "Sambalpuri textiles"],
  "meenakshi-madurai": ["Sungudi cotton saris", "Brass lamps and bronze figurines", "Temple jewellery", "Wooden toys"],
  "jaisalmer": ["Mirror-work embroidery", "Camel-leather items", "Rajasthani puppets", "Silver jewellery"],
  "udaipur": ["Miniature paintings", "Pichhwai paintings", "Silver jewellery", "Block-printed textiles"],
  "ladakh": ["Pashmina and hand-knitted woollens", "Thangka paintings", "Turquoise and silver jewellery", "Dried apricots and apricot products"],
  "kashmir": ["Pashmina shawls", "Saffron", "Papier-mache items", "Walnut-wood carving and dry fruits"],
  "rishikesh": ["Rudraksha beads", "Ayurvedic products and herbal teas", "Yoga accessories", "Handmade incense and brass items"],
};
"""

COMP_JS = r"""
"use client";

import React, { useEffect, useState } from "react";
import { HISTORY } from "@/data/destination-history";
import { DETAILS } from "@/data/destination-details";
import { TOOLS, LANGS, SOUVENIRS } from "@/data/city-extras";

const FEATS = [
  ["attractions", "Attractions", "\u{1F3DB}\u{FE0F}"],
  ["hotels", "Hotels", "\u{1F3E8}"],
  ["transport", "Taxis & Transport", "\u{1F695}"],
  ["tickets", "Book Tickets", "\u{1F39F}\u{FE0F}"],
  ["guides", "Local Guides", "\u{1F9ED}"],
  ["maps", "Maps & Navigation", "\u{1F5FA}\u{FE0F}"],
  ["emergency", "Emergency Help", "\u{1F6E1}\u{FE0F}"],
  ["language", "Culture & Language", "\u{1F5E3}\u{FE0F}"],
  ["essentials", "Travel Essentials", "\u{1F392}"],
  ["days", "Plan Days", "\u{1F5D3}\u{FE0F}"],
  ["tips", "Travel Tips", "\u{1F4A1}"],
  ["shopping", "Shopping & Souvenirs", "\u{1F6CD}\u{FE0F}"],
  ["esim", "eSIM & WiFi", "\u{1F4F6}"],
  ["notes", "My Notes", "\u{1F4DD}"],
];

const SECTIONS = [
  ["eat", "Eat", "\u{1F37D}\u{FE0F}", "Signature dish", "dish", "var(--c)"],
  ["wear", "Wear", "\u{1F458}", "Signature dress", "dress", "color-mix(in srgb,var(--c) 55%,#fff)"],
  ["culture", "Tradition", "\u{1F38E}", "Living culture", "cul", "color-mix(in srgb,var(--c) 70%,#ff9d5c)"],
];

const CSS_BAR = `
.cf{margin:0 0 32px}
.cf-h{font-family:var(--f);color:var(--c);font-size:2rem;margin:0 0 14px}
.cf-bar{display:grid;grid-template-columns:repeat(auto-fit,minmax(104px,1fr));gap:8px;padding:14px;border-radius:20px;backdrop-filter:blur(14px);border:1px solid var(--c);background:rgba(10,5,4,.55)}
.cf-tab{display:flex;flex-direction:column;align-items:center;gap:8px;padding:10px 6px;border-radius:14px;border:1px solid transparent;background:transparent;color:#fff7ec;font:inherit;font-size:1rem;line-height:1.15;text-align:center;cursor:pointer}
.cf-ic{display:flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:50%;font-size:1.5rem;background:color-mix(in srgb,var(--c) 25%,transparent)}
.cf-tab[aria-selected="true"]{border-color:var(--c);background:color-mix(in srgb,var(--c) 18%,transparent)}
.cf-tab:focus-visible{outline:2px solid #fff;outline-offset:2px}
.cf-panel{margin-top:14px;border-radius:20px}
.cf-panel:focus-visible{outline:2px solid #fff;outline-offset:3px}
.cf-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px}
.cf-card{padding:14px;border-radius:20px;backdrop-filter:blur(14px);border:1px solid var(--c);background:linear-gradient(160deg,color-mix(in srgb,var(--d) 55%,transparent),rgba(10,5,4,.5))}
.cf-card.wide{grid-column:1/-1}
.cf-card h3{margin:0 0 6px;font-family:var(--f);color:var(--c);font-size:1.5rem}
.cf-card p{margin:0 0 6px;font-size:1.15rem;line-height:1.4}
.cf-card b{color:var(--c);font-weight:600}
.cf-card ul{margin:0 0 6px;padding-left:1.2em;font-size:1.15rem;line-height:1.5}
.cf-link{display:inline-block;margin:8px 8px 0 0;padding:10px 18px;border-radius:999px;text-decoration:none;font-size:1.1rem;color:#fff7ec;border:1px solid var(--c);background:rgba(255,255,255,.1)}
.cf-link.main{background:var(--c);color:#1a0d05}
.cf-link:focus-visible{outline:2px solid #fff;outline-offset:3px}
.cf-note{font-size:.95rem;color:#ffe9cc;opacity:.85;margin:10px 0 0}
.cf-ta{display:block;width:100%;min-height:140px;box-sizing:border-box;padding:12px;margin:0 0 8px;border-radius:14px;border:1px solid var(--c);background:rgba(10,5,4,.55);color:#fff7ec;font:inherit;font-size:1.15rem}
.cf-ta:focus-visible{outline:2px solid #fff;outline-offset:3px}
@media (prefers-reduced-motion:no-preference){.cf-tab{transition:transform .2s,background .2s}.cf-tab:hover{transform:translateY(-2px)}}
`;

const CSS_SC = `
.sc-wrap{margin:0 0 36px}
.sc{margin:0 0 34px;padding:22px;border-radius:24px;border:1px solid var(--a);border-left-width:6px;background:linear-gradient(160deg,color-mix(in srgb,var(--d) 50%,transparent),rgba(10,5,4,.6));backdrop-filter:blur(14px)}
.sc-head{display:flex;align-items:center;gap:16px;margin:0 0 18px}
.sc-num{font-family:var(--f);font-size:3.2rem;line-height:1;color:var(--a);opacity:.9}
.sc-head h2{margin:0;font-family:var(--f);color:var(--a);font-size:2.2rem;letter-spacing:.04em;text-transform:uppercase}
.sc-sub{margin:4px 0 0;font-size:1.1rem;color:#ffe9cc}
.sc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:16px}
.sc-card{border-radius:18px;overflow:hidden;border:1px solid color-mix(in srgb,var(--a) 55%,transparent);background:rgba(10,5,4,.55)}
.sc-media{position:relative;aspect-ratio:4/3;overflow:hidden}
.sc-media img,.sc-tile{display:block;width:100%;height:100%;object-fit:cover}
.sc-tile{display:flex;align-items:center;justify-content:center;font-size:3.4rem;background:linear-gradient(160deg,var(--d),#120a08)}
.sc-media::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(10,5,4,.88),transparent 60%);pointer-events:none}
.sc-idx{position:absolute;top:10px;left:10px;z-index:2;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--a);color:#1a0d05;font-weight:600}
.sc-name{position:absolute;left:12px;right:12px;bottom:10px;z-index:2;margin:0;font-family:var(--f);color:#fff7ec;font-size:1.45rem;line-height:1.1}
.sc-card p{margin:0;padding:12px 14px 14px;font-size:1.1rem;line-height:1.4}
.sc-credit{font-size:.95rem;color:#ffe9cc;opacity:.8;margin:0}
@media (prefers-reduced-motion:no-preference){.sc-card{transition:transform .2s}.sc-card:hover{transform:translateY(-4px)}}
`;

function clip(s, n) {
  if (s.length <= n) return s;
  const cut = s.slice(0, n);
  const i = cut.lastIndexOf(" ");
  return cut.slice(0, i > 0 ? i : n) + "...";
}
function mapsSearch(q) {
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
}
function webSearch(q) {
  return "https://www.google.com/search?q=" + encodeURIComponent(q);
}
function Ext({ href, children, main }) {
  return (
    <a className={"cf-link" + (main ? " main" : "")} href={href} target="_blank" rel="noopener noreferrer">
      {children} {"\u2197"}
    </a>
  );
}

export default function CityPlanner({ dest }) {
  const T = TOOLS[dest.s] || {};
  const L = LANGS[T.lang] || LANGS.hindi;
  const where = dest.n + ", " + dest.p;
  const places = HISTORY[dest.s] || [];
  const eats = ((DETAILS[dest.s] || {}).eat || []).map((e) => e.name);
  const days = [];
  for (let i = 0; i < places.length && days.length < 4; i += 2) {
    days.push({ places: places.slice(i, i + 2).map((p) => p.name), eat: eats[days.length] || "" });
  }

  const [tab, setTab] = useState("attractions");
  const [note, setNote] = useState("");
  const nkey = "yatrasathi-note-" + dest.s;

  useEffect(() => {
    try {
      setNote(window.localStorage.getItem(nkey) || "");
    } catch (e) {}
  }, [nkey]);
  const save = (v) => {
    setNote(v);
    try {
      window.localStorage.setItem(nkey, v);
    } catch (e) {}
  };
  const onKey = (e, i) => {
    let n = i;
    if (e.key === "ArrowRight") n = (i + 1) % FEATS.length;
    else if (e.key === "ArrowLeft") n = (i + FEATS.length - 1) % FEATS.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = FEATS.length - 1;
    else return;
    e.preventDefault();
    setTab(FEATS[n][0]);
    const el = document.getElementById("cf-tab-" + FEATS[n][0]);
    if (el) el.focus();
  };

  let body = null;
  if (tab === "attractions") {
    body = places.length ? (
      <>
        <div className="cf-cards">
          {places.map((h) => (
            <div className="cf-card" key={h.name}>
              <h3>{h.name}</h3>
              <p>{clip(h.intro || "", 200)}</p>
              {h.url && <Ext href={h.url}>Source: Wikipedia</Ext>}
            </div>
          ))}
        </div>
        <p className="cf-note">Text from Wikipedia, licensed CC BY-SA 4.0. The full history is further down the page.</p>
      </>
    ) : (
      <div className="cf-cards"><div className="cf-card"><p>No place data for this city yet.</p></div></div>
    );
  } else if (tab === "hotels") {
    body = (
      <div className="cf-cards">
        <div className="cf-card wide">
          <h3>Hotels</h3>
          <p>Hotels are not listed, rated or priced here. Use Maps to see real places near the site, then compare on the booking site you trust.</p>
          <Ext href={mapsSearch("hotels near " + where)} main>Hotels near {dest.n}</Ext>
        </div>
      </div>
    );
  } else if (tab === "transport") {
    body = (
      <div className="cf-cards">
        <div className="cf-card wide">
          <h3>Getting here and around</h3>
          <Ext href={mapsSearch("railway station near " + where)}>Railway station</Ext>
          <Ext href={mapsSearch("airport near " + where)}>Airport</Ext>
          <Ext href={mapsSearch("bus station near " + where)}>Bus station</Ext>
          <Ext href={mapsSearch("taxi stand near " + where)}>Taxi stand</Ext>
          <p className="cf-note">No fares or bookings here. Confirm the fare before you start, or use a meter or prepaid counter where one is available.</p>
        </div>
      </div>
    );
  } else if (tab === "tickets") {
    const list = places.length ? places.map((p) => p.name) : [dest.n];
    body = (
      <div className="cf-cards">
        <div className="cf-card wide">
          <h3>Tickets and timings</h3>
          <p>Prices, timings and closing days change. Open the official page for each place.</p>
          {list.map((n) => (
            <Ext key={n} href={webSearch(n + " official ticket booking")}>{n}</Ext>
          ))}
          <p className="cf-note">Prefer official government or temple websites. Be careful with unofficial resellers you do not recognise.</p>
        </div>
      </div>
    );
  } else if (tab === "guides") {
    body = (
      <div className="cf-cards">
        <div className="cf-card wide">
          <h3>Local guides</h3>
          <Ext href={webSearch("government approved tourist guide " + dest.n)} main>Find approved guides</Ext>
          <ul>
            <li>Ask to see the guide's identity card.</li>
            <li>Agree the fee and the duration before you start.</li>
            <li>Be careful with people who approach you uninvited near the entrance.</li>
          </ul>
        </div>
      </div>
    );
  } else if (tab === "maps") {
    body = (
      <div className="cf-cards">
        <div className="cf-card wide">
          <h3>Maps and navigation</h3>
          <Ext href={mapsSearch(where)} main>Open {dest.n} in Google Maps</Ext>
          <Ext href={"https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(where)}>Directions</Ext>
          <Ext href={"https://www.openstreetmap.org/search?query=" + encodeURIComponent(where)}>OpenStreetMap</Ext>
        </div>
      </div>
    );
  } else if (tab === "emergency") {
    body = (
      <div className="cf-cards">
        <div className="cf-card wide">
          <h3>Emergency help</h3>
          <p>112 is India's national emergency number.</p>
          <a className="cf-link main" href="tel:112">Call 112</a>
          <a className="cf-link" href="/sos">Open SOS page</a>
          <p className="cf-note">This app does not dispatch help automatically. Call 112 yourself.</p>
        </div>
      </div>
    );
  } else if (tab === "language") {
    body = (
      <div className="cf-cards">
        <div className="cf-card wide">
          <h3>{L.name}</h3>
          {L.phrases.map(([en, loc]) => (
            <p key={en}>{en}: <b>{loc}</b></p>
          ))}
          <p className="cf-note">{L.note}</p>
        </div>
      </div>
    );
  } else if (tab === "essentials") {
    body = (
      <div className="cf-cards">
        <div className="cf-card">
          <h3>Pack</h3>
          <ul>
            <li>Water bottle and sunscreen</li>
            <li>Comfortable walking shoes</li>
            <li>Light cotton clothes and a light layer</li>
            <li>Modest clothes for temples and mosques (cover shoulders and knees)</li>
            <li>Power bank, a copy of your ID, and some cash</li>
          </ul>
        </div>
        <div className="cf-card">
          <h3>For {dest.n}</h3>
          {T.best && <p>Best time: {T.best}</p>}
          {T.tip && <p>{T.tip}</p>}
          <p className="cf-note">General packing guidance only.</p>
        </div>
      </div>
    );
  } else if (tab === "tips") {
    body = (
      <>
        <div className="cf-cards">
          <div className="cf-card"><h3>Best time</h3><p>{T.best || "Not available yet."}</p></div>
          <div className="cf-card"><h3>Busiest</h3><p>{T.busy || "Not available yet."}</p></div>
          <div className="cf-card"><h3>Tip</h3><p>{T.tip || "Not available yet."}</p></div>
        </div>
        <p className="cf-note">Approximate general guidance, not live crowd data. Check locally before you travel.</p>
      </>
    );
  } else if (tab === "shopping") {
    const list = SOUVENIRS[dest.s] || [];
    body = (
      <div className="cf-cards">
        <div className="cf-card wide">
          <h3>Famous local crafts and souvenirs</h3>
          {list.length ? (
            <ul>{list.map((s) => <li key={s}>{s}</li>)}</ul>
          ) : (
            <p>No data for this city yet.</p>
          )}
          <p className="cf-note">Prices are not shown. Buy from reputable shops, agree the price first, and look for certification or authenticity labels where they exist.</p>
        </div>
      </div>
    );
  } else if (tab === "esim") {
    body = (
      <div className="cf-cards">
        <div className="cf-card wide">
          <h3>Mobile data and Wi-Fi</h3>
          <p>Indian SIM cards need ID verification. Visitors should expect to show a passport and visa details, and may need a photo, at an official operator store or airport counter. Rules and eSIM availability change, so check with the operator.</p>
          <p>Many hotels, cafes and airports offer Wi-Fi. Avoid banking or entering passwords on public Wi-Fi.</p>
        </div>
      </div>
    );
  } else if (tab === "days") {
    body = days.length ? (
      <>
        <div className="cf-cards">
          {days.map((d, i) => (
            <div className="cf-card" key={i}>
              <h3>Day {i + 1}</h3>
              <p>{d.places.join(" and ")}</p>
              {d.eat && <p>Try: {d.eat}</p>}
            </div>
          ))}
        </div>
        <p className="cf-note">A simple outline from the places listed here. Check opening hours before you go.</p>
      </>
    ) : (
      <div className="cf-cards"><div className="cf-card"><p>Not enough place data for this city yet.</p></div></div>
    );
  } else if (tab === "notes") {
    body = (
      <div className="cf-cards">
        <div className="cf-card wide">
          <h3>My notes</h3>
          <textarea
            className="cf-ta"
            aria-label={"Your notes about " + dest.n}
            value={note}
            onChange={(e) => save(e.target.value)}
            placeholder="Write your thoughts, plans or reminders for this place."
          />
          <p className="cf-note">Saved only in this browser, on this device.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="cf">
      <style>{CSS_BAR}</style>
      <h2 className="cf-h">Plan your visit</h2>
      <div className="cf-bar" role="tablist" aria-label="Travel features">
        {FEATS.map(([k, label, ic], i) => (
          <button
            key={k}
            id={"cf-tab-" + k}
            type="button"
            role="tab"
            aria-selected={tab === k}
            aria-controls="cf-panel"
            tabIndex={tab === k ? 0 : -1}
            className="cf-tab"
            onClick={() => setTab(k)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className="cf-ic" aria-hidden="true">{ic}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>
      <div id="cf-panel" role="tabpanel" aria-labelledby={"cf-tab-" + tab} tabIndex={0} className="cf-panel">
        {body}
      </div>
    </section>
  );
}

export function Showcase({ dest }) {
  const det = DETAILS[dest.s] || {};
  const [bad, setBad] = useState({});
  return (
    <div className="sc-wrap">
      <style>{CSS_SC}</style>
      {SECTIONS.map(([k, title, icon, sub, field, accent], n) => {
        const list = det[k] || [];
        if (!list.length) return null;
        return (
          <section className="sc" key={k} style={{ "--a": accent }} aria-labelledby={"sc-h-" + k}>
            <header className="sc-head">
              <span className="sc-num" aria-hidden="true">{"0" + (n + 1)}</span>
              <div>
                <h2 id={"sc-h-" + k}><span aria-hidden="true">{icon}</span> {title}</h2>
                {dest[field] && <p className="sc-sub">{sub}: {dest[field]}</p>}
              </div>
            </header>
            <div className="sc-grid">
              {list.map((it, i) => {
                const key = dest.s + "/" + k + "/" + it.id;
                const show = it.photo !== false && !bad[key];
                return (
                  <article className="sc-card" key={it.id}>
                    <div className="sc-media">
                      {show ? (
                        <img
                          src={"/images/destinations/" + key + ".jpg"}
                          alt={it.name}
                          loading="lazy"
                          onError={() => setBad((b) => ({ ...b, [key]: true }))}
                        />
                      ) : (
                        <div className="sc-tile" aria-hidden="true">{icon}</div>
                      )}
                      <span className="sc-idx" aria-hidden="true">{i + 1}</span>
                      <h3 className="sc-name">{it.name}</h3>
                    </div>
                    <p>{it.note}</p>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
      <p className="sc-credit">Photos and notes: Wikipedia and Wikimedia Commons</p>
    </div>
  );
}
"""


def rd(p):
    with open(p, encoding="utf-8") as f:
        return f.read()


def wr(p, s):
    with open(p, "w", encoding="utf-8", newline="\n") as f:
        f.write(s)


def backup(p):
    if not os.path.exists(p):
        return
    b = p + ".planner.bak"
    if os.path.exists(b):
        b = p + ".planner." + str(int(time.time())) + ".bak"
    shutil.copy2(p, b)
    print("backup:", b)


if not os.path.exists(PAGE):
    sys.exit("Missing file: " + PAGE + " (run this from the project root)")
page = rd(PAGE)
if "CityPlanner" in page:
    sys.exit("DestinationPage.jsx already uses CityPlanner. Nothing changed.")

A_IMPORT = 'import { DETAILS } from "@/data/destination-details";'
A_HIST = "{(HISTORY[dest.s] || []).length > 0 && ("
A_TABS = "{DETAILS[dest.s] && <DetailTabs dest={dest} />}"
A_FEAT = "<DestinationFeatures />"
for a in (A_IMPORT, A_HIST, A_TABS, A_FEAT):
    n = page.count(a)
    if n != 1:
        sys.exit("Anchor found " + str(n) + " times (need exactly 1): " + a + ". Nothing changed.")

backup(PAGE)
backup(DATA)
backup(COMP)

wr(DATA, DATA_JS.lstrip("\n"))
wr(COMP, COMP_JS.lstrip("\n"))

page = page.replace(A_IMPORT, A_IMPORT + '\nimport CityPlanner, { Showcase } from "@/components/CityPlanner";', 1)
page = page.replace(A_HIST, "<CityPlanner dest={dest} />\n        <Showcase dest={dest} />\n        " + A_HIST, 1)
page = page.replace(A_TABS, "{/* Eat, Wear and Tradition now live in Showcase */}", 1)
page = page.replace(A_FEAT, "{/* feature bar moved above the history section */}", 1)
wr(PAGE, page)
print("Done. Wrote", DATA, "and", COMP, "and patched", PAGE)
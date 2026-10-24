import React from "react";
import { places } from "./homeState";

const tools = [
  { t: "ASK", h: "/ask", i: "\u{1F4AC}" },
  { t: "BHEED", h: "/crowd", i: "\u{1F465}" },
  { t: "DAYS", h: "/itinerary", i: "\u{1F5D3}" },
  { t: "BOL CHAAL", h: "/phrases", i: "\u{1F5E3}" },
  { t: "VICHAAR", h: "/ledger", i: "\u{1F4DD}" },
  { t: "SOS", h: "/sos", i: "\u{1F198}" },
];

export default function Cards({ idx }) {
  return (
    <div>
      <div className="ch-view">
        <div className="ch-track" style={{ "--i": idx }}>
          {places.map((it, k) => (
            <a key={it.s} href={it.h} className={"ch-card" + (k === idx ? " on" : "")} style={{ background: it.g }}>
              <span className="ch-ico">{it.i}</span>
              <div>
                <h2 style={{ color: it.c }}>{it.t}</h2>
                <p>{it.sub}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="ch-tabs">
        {tools.map((it) => (
          <a key={it.t} className="ch-tab" href={it.h}><span>{it.i}</span>{it.t}</a>
        ))}
      </div>
    </div>
  );
}

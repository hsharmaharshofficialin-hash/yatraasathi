import React from "react";

export default function Controls({ idx, total, step, play, setPlay }) {
  return (
    <div className="ch-ctrl">
      <span className="ch-count">{String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
      <button className="ch-btn" onClick={() => step(-1)} aria-label="Previous">{"\u2039"}</button>
      <button className="ch-btn" onClick={() => step(1)} aria-label="Next">{"\u203A"}</button>
      <button className="ch-btn" onClick={() => setPlay((p) => !p)} aria-label={play ? "Pause" : "Play"}>{play ? "\u275A\u275A" : "\u25B6"}</button>
      <a className="ch-btn" href="/ask" aria-label="Ask">{"\u2726"}</a>
    </div>
  );
}

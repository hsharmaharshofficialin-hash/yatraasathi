"use client";
import React from "react";
import { createPortal } from "react-dom";
import { places, useHome } from "./homeState";
import Cards from "./Cards";
import Controls from "./Controls";
import "./home1.css";
import "./home2.css";
import "./home3.css";

const HERO = "/images/hero-jaipur.jpg";
const FALL = "/images/hero-temple.jpg";

export default function CityHome() {
  const { ok, idx, step, play, setPlay, setHov } = useHome();
  if (!ok) return null;
  const a = places[idx];
  const bg = "url(/images/destinations/" + a.s + ".jpg), url(" + HERO + "), url(" + FALL + ")";
  return createPortal(
    <div className="ch-root">
      <div key={a.s} className="ch-wall" style={{ backgroundImage: bg }} />
      <div className="ch-shade" />
      <section className="ch-screen">
        <div className="ch-logo">YATRA<br />SATHI</div>
        <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
          <Cards idx={idx} />
        </div>
        <div className="ch-cap">{places.length} destinations across India</div>
      </section>
      <Controls idx={idx} total={places.length} step={step} play={play} setPlay={setPlay} />
    </div>,
    document.body
  );
}

import { useEffect, useState } from "react";
import { DESTS } from "../data/destinations";

export const places = DESTS.map((d) => ({
  s: d.s, t: d.n, sub: d.b, h: "/destinations/" + d.s, i: d.i, c: d.c,
  g: "linear-gradient(160deg," + d.c + "99," + d.d + "88)",
}));

export function useHome() {
  const [ok, setOk] = useState(false);
  const [idx, setIdx] = useState(0);
  const [play, setPlay] = useState(true);
  const [hov, setHov] = useState(false);
  const last = places.length - 1;
  const step = (n) => setIdx((i) => Math.max(0, Math.min(last, i + n)));
  useEffect(() => {
    setOk(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlay(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    if (!play || hov) return;
    const id = setInterval(() => setIdx((i) => (i >= last ? 0 : i + 1)), 7000);
    return () => clearInterval(id);
  }, [play, hov, last]);
  return { ok, idx, step, play, setPlay, setHov };
}

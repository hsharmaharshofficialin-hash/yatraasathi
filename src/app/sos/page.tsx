"use client";

import { useState } from "react";
import { useApp } from "@/hooks/useClient";

export default function SosPage() {
  const { t, net } = useApp();
  const [coords, setCoords] = useState<string>("");
  const [copied, setCopied] = useState(false);

  function prepare() {
    if (!navigator.geolocation) {
      setCoords("Unknown — this browser has no geolocation.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const text = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
        setCoords(text);
      },
      () => setCoords("Unknown — permission denied or unavailable."),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }

  async function copy() {
    if (!coords) prepare();
    if (coords) {
      await navigator.clipboard.writeText(coords);
      setCopied(true);
    }
  }

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <h1 className="font-[family-name:var(--font-display)] text-4xl">{t("safetyTitle")}</h1>
      <p className="frame rounded-[24px] p-4">
        {t("cannotDispatch")} {t("locationPrep")}
      </p>
      {net === "offline" ? (
        <p className="rounded-2xl border border-rose-500/30 bg-rose-950/40 p-4 text-rose-200">{t("noSignal112")}</p>
      ) : null}
      <a href="tel:112" className="btn-sos block rounded-full px-6 py-4 text-center text-xl">
        {t("call112")}
      </a>
      <button type="button" onClick={prepare} className="btn-ghost rounded-full px-4 py-2">
        {t("copyLocation")}
      </button>
      {coords ? (
        <p className="font-mono text-sm">
          {coords}{" "}
          <button type="button" className="underline" onClick={copy}>
            {copied ? t("saved") : t("copyLocation")}
          </button>
        </p>
      ) : null}
      <ul className="list-disc pl-5 text-sm text-[var(--muted)]">
        <li>{t("whatWorks")}: tel:112, on-device coordinates, honest copy.</li>
        <li>{t("whatCannot")}: automated dispatch, guaranteed tower, staying on the line.</li>
      </ul>
    </div>
  );
}

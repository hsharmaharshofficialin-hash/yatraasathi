"use client";

import { useEffect, useState } from "react";
import { cacheTripPack, getReadiness, type Readiness } from "@/lib/offline";
import { useApp } from "@/hooks/useClient";

export function ReadinessPanel() {
  const { t, net } = useApp();
  const [ready, setReady] = useState<Readiness>({ maps: false, stories: false, cards: false, phrases: false });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getReadiness().then(setReady).catch(() => undefined);
  }, []);

  async function cacheAll() {
    setBusy(true);
    try {
      setReady(await cacheTripPack());
    } finally {
      setBusy(false);
    }
  }

  const rows: { key: keyof Readiness; label: ReturnType<typeof t> }[] = [
    { key: "maps", label: t("cacheMaps") },
    { key: "stories", label: t("cacheStories") },
    { key: "cards", label: t("cacheCards") },
    { key: "phrases", label: t("cachePhrases") },
  ];

  return (
    <section className="frame jharokha rounded-[28px] p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-amber-400">{t("readiness")}</p>
      <h2 className="font-[family-name:var(--font-display)] text-3xl text-[#F5F2EB]">{t("jaipurTrip")}</h2>
      <p className="mt-2 text-slate-300">{t("readinessHint")}</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {rows.map((row) => (
          <li key={row.key} className="flex items-center justify-between rounded-2xl border border-[var(--line)] px-3 py-2">
            <span>{row.label}</span>
            <span className="text-xs uppercase tracking-wider">{ready[row.key] ? t("cached") : t("notCached")}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={cacheAll}
        disabled={busy}
        className="btn-gold mt-4 rounded-full px-5 py-2 disabled:opacity-60"
      >
        {busy ? t("modelProgress") : t("cacheNow")}
      </button>
      <p className="mt-3 text-xs text-[var(--muted)]">{t("airplaneHint")}</p>
      {net === "offline" ? <p className="mt-2 text-sm">{t("neuralSkipped")}</p> : null}
    </section>
  );
}

"use client";

import { CROWD_I18N, pickPack } from "@/data/content-i18n";
import { CROWD_EVENTS, crowdForDate } from "@/data/crowd";
import { useApp } from "@/hooks/useClient";

export default function CrowdPage() {
  const { t, lang } = useApp();
  const today = crowdForDate(new Date().toISOString());
  return (
    <div className="space-y-4">
      <h1 className="font-[family-name:var(--font-display)] text-4xl">{t("crowd")}</h1>
      <p className="text-[var(--muted)]">{t("crowdBasis")}</p>
      <div className={`inline-block rounded-full px-4 py-2 text-sm band-${today.band}`}>
        {today.band === "high" ? t("high") : today.band === "medium" ? t("medium") : t("low")}
      </div>
      <p className="max-w-2xl">
        {today.events[0]
          ? pickPack(CROWD_I18N[today.events[0].id]?.basis, lang, lang === "hi" ? today.basisHi : today.basisEn)
          : lang === "hi"
            ? today.basisHi
            : today.basisEn}
      </p>
      <div className="grid gap-3">
        {CROWD_EVENTS.map((event) => (
          <article key={event.id} className="frame rounded-[24px] p-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-xl">
                {pickPack(CROWD_I18N[event.id]?.name, lang, lang === "hi" ? event.nameHi : event.nameEn)}
              </h2>
              <span className={`rounded-full px-3 py-1 text-xs band-${event.band}`}>
                {event.band === "high" ? t("high") : event.band === "medium" ? t("medium") : t("low")}
              </span>
            </div>
            <p className="mt-2 text-sm">
              {pickPack(CROWD_I18N[event.id]?.basis, lang, lang === "hi" ? event.basisHi : event.basisEn)}
            </p>
            {event.mock ? <p className="mt-2 text-xs">{t("mockLabel")}</p> : null}
          </article>
        ))}
      </div>
    </div>
  );
}

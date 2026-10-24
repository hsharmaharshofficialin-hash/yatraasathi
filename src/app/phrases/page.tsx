"use client";

import { PHRASE_I18N, pickPack } from "@/data/content-i18n";
import { PHRASES } from "@/data/phrases";
import { useApp, speak } from "@/hooks/useClient";

export default function PhrasesPage() {
  const { t, lang } = useApp();
  return (
    <div className="space-y-4">
      <h1 className="font-[family-name:var(--font-display)] text-4xl">{t("phrases")}</h1>
      <p className="pill-sand rounded-2xl px-4 py-3 text-sm">{t("mockLabel")}</p>
      <div className="grid gap-3">
        {PHRASES.map((phrase) => (
          <article key={phrase.id} className="frame rounded-[24px] p-4">
            <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.12em]">
              <span>{phrase.region}</span>
              <span>
                {phrase.register === "formal"
                  ? t("registerFormal")
                  : phrase.register === "warm"
                    ? t("registerWarm")
                    : t("registerMarket")}
              </span>
              <span>{phrase.audio === "human" ? t("audioHuman") : t("audioTts")}</span>
              {!phrase.reviewed ? <span className="pill-sand rounded-full px-2">{t("unreviewed")}</span> : null}
            </div>
            <p className="mt-2 text-lg">
              {pickPack(PHRASE_I18N[phrase.id], lang, lang === "hi" ? phrase.hi : phrase.en)}
            </p>
            <p className="text-sm text-[var(--muted)]">{phrase.pronunciation}</p>
            <p className="mt-2 text-sm">{phrase.note}</p>
            <button
              type="button"
              className="btn-gold mt-3 rounded-full px-3 py-1 text-sm"
              onClick={() =>
                speak(pickPack(PHRASE_I18N[phrase.id], lang, lang === "hi" ? phrase.hi : phrase.en), lang)
              }
            >
              {t("speak")}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

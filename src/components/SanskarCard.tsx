"use client";

import { useApp, speak, stopSpeak } from "@/hooks/useClient";
import { etiquetteValue } from "@/lib/localize";
import type { EtiquetteOut, SiteOut } from "@/lib/types";
import type { StringKey } from "@/data/locales";

const FIELDS: StringKey[] = [
  "footwear",
  "head_covering",
  "photography",
  "gendered_access",
  "non_adherent_entry",
  "offering_norms",
  "quiet_hours",
];

export function SanskarCard({ site }: { site: SiteOut }) {
  const { t, lang } = useApp();
  const rows = site.etiquette || [];
  const spoken = rows
    .map((row) => `${t(row.field as StringKey)}. ${etiquetteValue(row, lang)}`)
    .join(" ");

  return (
    <section className="frame jharokha rounded-[28px] p-5 thikri">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-amber-400">{t("threshold")}</p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-[#F5F2EB]">{t("sanskar")}</h2>
        </div>
        <div className="flex gap-2">
          <button type="button" className="btn-gold rounded-full px-3 py-1 text-sm" onClick={() => speak(spoken, lang)}>
            {t("speak")}
          </button>
          <button type="button" className="btn-ghost rounded-full px-3 py-1 text-sm" onClick={stopSpeak}>
            {t("stopSpeak")}
          </button>
        </div>
      </div>
      <div className="mt-4 grid gap-3">
        {FIELDS.map((field) => {
          const row = rows.find((item) => item.field === field);
          return <EtiquetteRow key={field} field={field} row={row} />;
        })}
      </div>
    </section>
  );
}

function EtiquetteRow({ field, row }: { field: StringKey; row?: EtiquetteOut }) {
  const { t, lang } = useApp();
  const status = row?.status === "verified" ? t("verified") : t("unverified");
  const value = row ? etiquetteValue(row, lang) : t("unknown");
  return (
    <article className="rounded-2xl border border-amber-500/20 bg-[#05060b]/60 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#E0C097]">{t(field)}</h3>
        <span
          className={`rounded-full px-2 py-0.5 text-[11px] ${
            row?.status === "verified" ? "pill-jade" : row ? "pill-sand" : "pill-warn"
          }`}
        >
          {row ? status : t("unknown")}
        </span>
      </div>
      <p className="mt-2 leading-relaxed text-slate-300">{value}</p>
      {row?.source ? (
        <p className="mt-2 text-xs text-amber-300/70">
          {t("sources")}: {row.source.title}
          {row.verifiedAt ? ` · ${t("lastVerified")} ${row.verifiedAt.slice(0, 10)}` : ""}
          {row.source.verifier ? ` · ${row.source.verifier}` : ""}
        </p>
      ) : null}
    </article>
  );
}

"use client";

import { useEffect, useState } from "react";
import { pickPack, VICHAAR_I18N } from "@/data/content-i18n";
import { VICHAAR } from "@/data/vichaar";
import { fetchChangelog } from "@/lib/api";
import { useApp } from "@/hooks/useClient";
import type { ChangelogRow } from "@/lib/types";

export default function LedgerPage() {
  const { t, lang, setDemo } = useApp();
  const [open, setOpen] = useState<string | null>(null);
  const [entries, setEntries] = useState<ChangelogRow[]>([]);

  useEffect(() => {
    fetchChangelog().then((res) => {
      setEntries(res.entries);
      setDemo(res.demo);
    });
  }, [setDemo]);

  return (
    <div className="space-y-4">
      <h1 className="font-[family-name:var(--font-display)] text-4xl">{t("ledger")}</h1>
      <p className="text-[var(--muted)]">{t("tapClaim")}</p>
      <div className="grid gap-3">
        {VICHAAR.map((item) => (
          <button
            key={item.id}
            type="button"
            className="frame rounded-[24px] p-4 text-left"
            onClick={() => setOpen(open === item.id ? null : item.id)}
          >
            <p className="text-xs uppercase tracking-[0.14em]">
              {item.kind === "gi" ? t("giBadge") : item.kind === "guide" ? t("guideBadge") : t("homestayBadge")}
              {item.mock ? ` · ${t("mockBadge")}` : ""}
            </p>
            <h2 className="mt-1 text-2xl">
              {pickPack(VICHAAR_I18N[item.id]?.title, lang, lang === "hi" ? item.titleHi : item.titleEn)}
            </h2>
            <p className="text-sm text-[var(--muted)]">
              {pickPack(VICHAAR_I18N[item.id]?.holder, lang, lang === "hi" ? item.holderHi : item.holderEn)}
            </p>
            {open === item.id ? (
              <div className="mt-3 border-t border-[var(--line)] pt-3 text-sm">
                <p>
                  {pickPack(VICHAAR_I18N[item.id]?.evidence, lang, lang === "hi" ? item.evidenceHi : item.evidenceEn)}
                </p>
                <p className="mt-2">
                  {item.sourceTitle}
                  {item.verifiedAt ? ` · ${t("lastVerified")} ${item.verifiedAt.slice(0, 10)}` : ""}
                </p>
                {item.sourceUrl ? (
                  <a className="underline" href={item.sourceUrl} target="_blank" rel="noreferrer">
                    {item.sourceUrl}
                  </a>
                ) : null}
              </div>
            ) : null}
          </button>
        ))}
      </div>
      <section className="frame rounded-[24px] p-4">
        <h2 className="text-xl">{t("correction")}</h2>
        {entries.length === 0 ? <p className="mt-2 text-sm">{t("changelogEmpty")}</p> : null}
        <ul className="mt-3 space-y-2 text-sm">
          {entries.map((entry) => (
            <li key={entry.id} className="border-t border-[var(--line)] pt-2">
              {entry.message}
              <span className="block text-xs text-[var(--muted)]">{entry.createdAt.slice(0, 10)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { LANGUAGES, type Lang } from "@/data/languages";
import { useApp } from "@/hooks/useClient";

export function LanguagePicker() {
  const { lang, setLang, t } = useApp();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const current = LANGUAGES.find((row) => row.code === lang) || LANGUAGES[0];
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return LANGUAGES.filter(
      (row) =>
        !q ||
        row.code.includes(q) ||
        row.name.toLowerCase().includes(q) ||
        row.native.toLowerCase().includes(q),
    );
  }, [query]);
  const india = filtered.filter((row) => row.region === "india");
  const world = filtered.filter((row) => row.region === "world");

  return (
    <div className="relative">
      <button
        type="button"
        className="btn-gold rounded-full px-3 py-1 text-xs"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {current.native} · {t("chooseLanguage")}
      </button>
      {open ? (
        <div className="absolute end-0 z-50 mt-2 w-72 max-w-[90vw] rounded-2xl border border-amber-500/25 bg-slate-900/95 p-3 shadow-2xl shadow-black/80 backdrop-blur-md">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("searchLanguage")}
            className="field w-full rounded-xl px-3 py-2 text-sm"
            autoFocus
          />
          <Group
            title={t("indiaGroup")}
            rows={india}
            current={lang}
            onPick={(code) => {
              setLang(code);
              setOpen(false);
              setQuery("");
            }}
          />
          <Group
            title={t("worldGroup")}
            rows={world}
            current={lang}
            onPick={(code) => {
              setLang(code);
              setOpen(false);
              setQuery("");
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

function Group({
  title,
  rows,
  current,
  onPick,
}: {
  title: string;
  rows: typeof LANGUAGES;
  current: Lang;
  onPick: (code: Lang) => void;
}) {
  if (!rows.length) return null;
  return (
    <div className="mt-3">
      <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">{title}</p>
      <ul className="mt-1 max-h-56 overflow-y-auto">
        {rows.map((row) => (
          <li key={row.code}>
            <button
              type="button"
              className={`flex w-full items-center justify-between rounded-xl px-2 py-1.5 text-left text-sm ${
                row.code === current ? "bg-amber-500/15 text-amber-400" : "hover:bg-white/5"
              }`}
              onClick={() => onPick(row.code)}
            >
              <span>{row.native}</span>
              <span className="text-[11px] opacity-70">{row.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

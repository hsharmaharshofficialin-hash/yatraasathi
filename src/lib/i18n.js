"use client";

import { useEffect, useState } from "react";
import { STRINGS } from "@/data/ui-strings";
import { MORE } from "@/data/ui-strings-more";

const KEY = "ys_lang";
const RTL = ["ur", "ar"];
const ORDER = ["en", "hi", "de", "fr", "ru", "ja", "zh", "ne", "bn", "ms", "ta", "te", "mr", "gu", "kn", "ml", "pa", "ur", "si"];

function dictFor(code) {
  return { ...(STRINGS[code] || {}), ...(MORE[code] || {}) };
}

/* Only languages that really have translations are offered in the picker. */
export function languages() {
  return ORDER.filter((c) => c === "en" || STRINGS[c] || MORE[c]).map((c) => [c, dictFor(c).lang_name || c]);
}

export function useLang() {
  const [lang, setLangState] = useState("en");
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setLangState(saved);
    } catch {}
    const on = (e) => setLangState(e.detail);
    window.addEventListener("ys-lang", on);
    return () => window.removeEventListener("ys-lang", on);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL.includes(lang) ? "rtl" : "ltr";
  }, [lang]);
  const setLang = (code) => {
    try {
      localStorage.setItem(KEY, code);
    } catch {}
    window.dispatchEvent(new CustomEvent("ys-lang", { detail: code }));
  };
  return [lang, setLang];
}

/* t("key") gives the text in the chosen language, falls back to English, then to the key. */
export function useT() {
  const [lang] = useLang();
  const en = STRINGS.en;
  const d = dictFor(lang);
  const t = (key) => d[key] ?? en[key] ?? key;
  return { t, lang };
}
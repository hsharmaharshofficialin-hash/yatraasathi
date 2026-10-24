"use client";

import { isLang, langMeta, speechCode, type Lang } from "@/data/languages";
import { STRINGS, type StringKey } from "@/data/locales";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Net = "online" | "offline" | "degraded";

type Ctx = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: StringKey) => string;
  net: Net;
  setDegraded: (value: boolean) => void;
  guestId: string;
  demo: boolean;
  setDemo: (value: boolean) => void;
};

const AppCtx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [online, setOnline] = useState(true);
  const [guestId, setGuestId] = useState("guest");
  const [demo, setDemo] = useState(false);
  const [degraded, setDegraded] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("ys_lang");
    if (isLang(stored)) {
      setLangState(stored);
      const meta = langMeta(stored);
      document.documentElement.lang = stored;
      document.documentElement.dir = meta.dir;
    }
    let id = window.localStorage.getItem("ys_guest");
    if (!id) {
      id = crypto.randomUUID();
      window.localStorage.setItem("ys_guest", id);
    }
    document.cookie = `ys_guest=${id}; path=/; max-age=31536000; SameSite=Lax`;
    setGuestId(id);
    const sync = () => setOnline(navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem("ys_lang", next);
    const meta = langMeta(next);
    document.documentElement.lang = next;
    document.documentElement.dir = meta.dir;
  }, []);

  const t = useCallback((key: StringKey) => STRINGS[lang][key], [lang]);
  const net: Net = !online ? "offline" : degraded ? "degraded" : "online";

  const value = useMemo(
    () => ({ lang, setLang, t, net, setDegraded, guestId, demo, setDemo }),
    [lang, setLang, t, net, guestId, demo],
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp outside provider");
  return ctx;
}

export function speak(text: string, lang: Lang) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = speechCode(lang);
  window.speechSynthesis.speak(utterance);
}

export function stopSpeak() {
  if (typeof window === "undefined") return;
  window.speechSynthesis.cancel();
}

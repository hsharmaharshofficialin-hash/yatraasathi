"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { LanguagePicker } from "@/components/LanguagePicker";
import { useApp } from "@/hooks/useClient";

const NAV = [
  { href: "/", key: "jaipurTrip" as const },
  { href: "/ask", key: "ask" as const },
  { href: "/itinerary", key: "itinerary" as const },
  { href: "/phrases", key: "phrases" as const },
  { href: "/crowd", key: "crowd" as const },
  { href: "/ledger", key: "ledger" as const },
  { href: "/demo", key: "demo" as const },
  { href: "/sos", key: "sos" as const },
];

export function AppChrome({ children }: { children: ReactNode }) {
  const { t, net, demo } = useApp();
  const path = usePathname();
  const banner =
    net === "offline" ? t("bannerOffline") : net === "degraded" || demo ? t("bannerDegraded") : t("bannerOnline");

  return (
    <div className="jali min-h-screen">
      <a
        href="#places"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-slate-900 focus:p-2 focus:text-amber-300"
      >
        {t("skip")}
      </a>
      <header className="sticky top-0 z-40 border-b border-orange-400/25 bg-[#1a0a12]/90 backdrop-blur-md">
        <div className="rang-bar" />
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="leading-none">
            <p className="font-[family-name:var(--font-display)] text-2xl tracking-[0.08em] text-[#ffc300]">
              {t("brand")}
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#ff8fab]">{t("tagline")}</p>
          </Link>
          <div className="flex items-center gap-2">
            <p className="rounded-full border border-amber-500/25 px-3 py-1 text-xs text-amber-300/80">
              {net === "offline" ? t("offline") : net === "degraded" ? t("degraded") : t("online")}
            </p>
            <LanguagePicker />
            <Link href="/sos" className="btn-sos rounded-full px-3 py-1 text-xs font-semibold">
              {t("sos")}
            </Link>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`thikri whitespace-nowrap rounded-full px-3 py-1 text-sm ${
                path === item.href
                  ? "border border-orange-400/50 bg-gradient-to-r from-orange-500/25 to-pink-500/20 text-[#ffc300]"
                  : "text-[#f3d5b5]"
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
      </header>
      <div
        className={`px-4 py-2 text-center text-sm ${
          net === "offline"
            ? "bg-rose-950/70 text-rose-200 border-y border-rose-500/30"
            : demo || net === "degraded"
              ? "bg-amber-950/50 text-amber-200 border-y border-amber-500/25"
              : "bg-emerald-950/40 text-emerald-300 border-y border-emerald-500/20"
        }`}
      >
        {net === "offline" ? t("engineOffline") + " — " : demo ? t("demoBanner") + " — " : ""}
        {banner}
      </div>
      <div className="mx-auto max-w-6xl px-4 py-6">{children}</div>
      <footer className="border-t border-amber-500/15 px-4 py-8 text-center text-sm text-amber-300/70">
        {t("footerHonesty")}
      </footer>
    </div>
  );
}

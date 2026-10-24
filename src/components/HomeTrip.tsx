"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ReadinessPanel } from "@/components/ReadinessPanel";
import { fetchSites, siteName } from "@/lib/api";
import { siteArea, siteSummary } from "@/lib/localize";
import { GEOFENCE_METERS, haversineMeters } from "@/lib/geo";
import { useApp } from "@/hooks/useClient";
import type { SiteOut } from "@/lib/types";

export function HomeTrip() {
  const { t, lang, setDemo, setDegraded } = useApp();
  const [sites, setSites] = useState<SiteOut[]>([]);
  const [near, setNear] = useState<SiteOut | null>(null);
  const [geoOn, setGeoOn] = useState(false);

  useEffect(() => {
    fetchSites().then((res) => {
      setSites(res.sites);
      setDemo(res.demo);
      setDegraded(res.demo);
    });
  }, [setDemo, setDegraded]);

  useEffect(() => {
    if (!geoOn || !sites.length || !navigator.geolocation) return;
    const watch = navigator.geolocation.watchPosition(
      (pos) => {
        const hit = sites
          .map((site) => ({
            site,
            d: haversineMeters(pos.coords.latitude, pos.coords.longitude, site.lat, site.lng),
          }))
          .filter((row) => row.d <= GEOFENCE_METERS)
          .sort((a, b) => a.d - b.d)[0];
        setNear(hit?.site || null);
      },
      () => undefined,
      { enableHighAccuracy: false, maximumAge: 15000 },
    );
    return () => navigator.geolocation.clearWatch(watch);
  }, [geoOn, sites]);

  return (
    <div className="space-y-8">
      <section className="jharokha overflow-hidden rounded-[32px] border border-orange-400/30 bg-[#1a0a12] shadow-2xl shadow-rose-950/50">
        <div className="grid lg:grid-cols-[1.3fr_1fr]">
          <div className="p-6 sm:p-10">
            <p className="text-xs uppercase tracking-[0.22em] text-[#ff8a1a]">{t("jaipurTrip")}</p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-[1.05] text-[#fff4e6] sm:text-6xl">
              {t("tagline")}
            </h1>
            <p className="mt-4 max-w-xl text-[#ffcc80]">{t("heroBlurb")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/ask" className="btn-gold rounded-full px-5 py-2">
                {t("openAsk")}
              </Link>
              <Link href="/demo" className="btn-ghost thikri rounded-full px-5 py-2">
                {t("demo")}
              </Link>
            </div>
          </div>
          <div className="relative min-h-64">
            <img src="/images/hero-jaipur.jpg" alt="" className="h-full w-full object-cover opacity-80" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-orange-500/10 via-transparent to-[#1a0a12]/75" />
          </div>
        </div>
      </section>

      <ReadinessPanel />

      {near ? (
        <Link href={`/sites/${near.slug}`} className="frame jharokha thikri block rounded-[28px] p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-amber-400">{t("threshold")}</p>
          <p className="text-2xl">{t("imAt")} {siteName(near, lang)}</p>
          <p className="text-sm text-[var(--muted)]">{t("sanskar")}</p>
        </Link>
      ) : null}

      <label className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <input type="checkbox" checked={geoOn} onChange={(event) => setGeoOn(event.target.checked)} />
        {t("enableGeo")}
      </label>
      <p className="text-xs text-[var(--muted)]">{t("geofenceHint")}</p>

      <section id="places">
        <h2 className="font-[family-name:var(--font-display)] text-3xl">{t("sites")}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => (
            <article key={site.slug} className="frame jharokha thikri overflow-hidden rounded-[24px]">
              <img src={site.imageUrl} alt="" className="h-44 w-full object-cover opacity-85" />
              <div className="p-4">
                <p className="text-[11px] uppercase tracking-[0.14em] text-amber-300/70">
                  {t("day")} {site.dayHint} · {siteArea(site, lang)}
                </p>
                <h3 className="mt-1 font-[family-name:var(--font-display)] text-2xl text-[#F5F2EB]">{siteName(site, lang)}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-slate-300">
                  {siteSummary(site, lang)}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link href={`/sites/${site.slug}`} className="btn-gold rounded-full px-3 py-1 text-xs">
                    {t("imAt")} {siteName(site, lang)}
                  </Link>
                  {site.unesco ? (
                    <span className="pill-jade rounded-full px-2 py-1 text-[11px]">{t("unesco")}</span>
                  ) : (
                    <span className="pill-sand rounded-full px-2 py-1 text-[11px]">{t("notUnesco")}</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

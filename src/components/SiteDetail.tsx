"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SanskarCard } from "@/components/SanskarCard";
import { fetchServices, fetchSite, postChangelog, siteName } from "@/lib/api";
import { siteArea, siteNarrative, siteSummary } from "@/lib/localize";
import { useApp, speak } from "@/hooks/useClient";
import type { SiteOut } from "@/lib/types";

export function SiteDetail({ slug }: { slug: string }) {
  const { t, lang, setDemo, setDegraded } = useApp();
  const [site, setSite] = useState<SiteOut | null>(null);
  const [services, setServices] = useState<{ kind: string; name: string | null }[]>([]);
  const [servicesUnknown, setServicesUnknown] = useState(false);
  const [here, setHere] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSite(slug).then((res) => {
      setSite(res.site);
      setDemo(res.demo);
      setDegraded(res.demo);
    });
  }, [slug, setDemo, setDegraded]);

  useEffect(() => {
    if (!site) return;
    fetchServices(site.lat, site.lng).then((res) => {
      setServices(res.services);
      setServicesUnknown(res.unknown);
    });
  }, [site]);

  if (!site) {
    return <p>{t("unknown")}</p>;
  }

  const narrative = siteNarrative(site, lang);
  const bbox = `${site.lng - 0.02},${site.lat - 0.02},${site.lng + 0.02},${site.lat + 0.02}`;

  return (
    <div className="space-y-6">
      <div className="jharokha overflow-hidden rounded-[32px] border border-amber-500/20">
        <img src={site.imageUrl} alt="" className="h-72 w-full object-cover opacity-85" />
        <div className="bg-[#05060b] p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-amber-400">
            {siteArea(site, lang)}
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl text-[#F5F2EB]">{siteName(site, lang)}</h1>
          <p className="mt-2 max-w-3xl text-[#E0C097]">{siteSummary(site, lang)}</p>
          <p className="mt-2 text-xs text-amber-300/70">{site.imageCredit}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn-gold rounded-full px-4 py-2" onClick={() => setHere(true)}>
          {t("imHere")}
        </button>
        <button type="button" className="btn-ghost rounded-full px-4 py-2" onClick={() => speak(narrative, lang)}>
          {t("speak")}
        </button>
        <Link href={`/ask?site=${site.slug}`} className="btn-gold rounded-full px-4 py-2">
          {t("openAsk")}
        </Link>
      </div>

      <article className="frame rounded-[28px] p-5 leading-relaxed">
        <p>{narrative}</p>
      </article>

      {here ? <SanskarCard site={site} /> : <p className="text-sm text-[var(--muted)]">{t("geofenceHint")}</p>}

      <section className="frame rounded-[28px] p-5">
        <h2 className="font-[family-name:var(--font-display)] text-2xl">{t("nearbyServices")}</h2>
        <p className="text-sm text-[var(--muted)]">{t("overpassNote")}</p>
        <iframe
          title="map"
          className="mt-3 h-64 w-full rounded-2xl border-0"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${site.lat}%2C${site.lng}`}
        />
        {servicesUnknown ? <p className="mt-3 text-sm">{t("localServicesFail")}</p> : null}
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {services.map((svc, index) => (
            <li key={`${svc.kind}-${index}`} className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm">
              {svc.kind}
              {svc.name ? ` · ${svc.name}` : ""}
            </li>
          ))}
        </ul>
      </section>

      <form
        className="frame rounded-[28px] p-5"
        onSubmit={async (event) => {
          event.preventDefault();
          if (!message.trim()) return;
          const res = await postChangelog({ siteSlug: site.slug, message, lang });
          setDemo(res.demo);
          setMessage("");
        }}
      >
        <label className="text-sm">{t("correction")}</label>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="field mt-2 min-h-20 w-full rounded-2xl p-3"
        />
        <button type="submit" className="btn-gold mt-3 rounded-full px-4 py-2">
          {t("sendCorrection")}
        </button>
      </form>
    </div>
  );
}

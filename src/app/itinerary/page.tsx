"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { defaultItineraryItems, siteName, syncItinerary } from "@/lib/api";
import { SITES } from "@/data/jaipur-sites";
import { idbGet, idbSet, queuePush } from "@/lib/idb";
import { useApp } from "@/hooks/useClient";
import type { ItineraryItem } from "@/lib/types";

export default function ItineraryPage() {
  const { t, lang, guestId, net, setDemo } = useApp();
  const [items, setItems] = useState<ItineraryItem[]>([]);
  const [queued, setQueued] = useState(false);

  useEffect(() => {
    idbGet<ItineraryItem[]>("itinerary").then((stored) => {
      setItems(stored?.length ? stored : defaultItineraryItems());
    });
  }, []);

  async function persist(next: ItineraryItem[]) {
    setItems(next);
    await idbSet("itinerary", next);
    if (net === "offline") {
      await queuePush({ id: `itin-${Date.now()}`, kind: "itinerary", payload: next });
      setQueued(true);
      return;
    }
    const res = await syncItinerary(guestId, next);
    setDemo(res.demo);
    setQueued(res.demo);
    if (res.items?.length) {
      setItems(res.items);
      await idbSet("itinerary", res.items);
    }
  }

  const days = [1, 2, 3];
  return (
    <div className="space-y-5">
      <h1 className="font-[family-name:var(--font-display)] text-4xl">{t("itinerary")}</h1>
      <p className="text-[var(--muted)]">{t("itineraryHint")}</p>
      {queued ? <p className="pill-warn inline-block rounded-full px-3 py-1 text-sm">{t("notYetSaved")}</p> : null}
      {days.map((day) => (
        <section key={day} className="frame rounded-[28px] p-5">
          <h2 className="text-xl">
            {t("day")} {day}
          </h2>
          <ul className="mt-3 space-y-3">
            {items
              .filter((item) => item.dayNumber === day)
              .map((item) => {
                const site = SITES.find((row) => row.slug === item.siteSlug);
                return (
                  <li key={item.clientId} className="rounded-2xl border border-[var(--line)] p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Link href={item.siteSlug ? `/sites/${item.siteSlug}` : "/"} className="font-semibold">
                        {site ? siteName(site, lang) : t("unknown")}
                      </Link>
                      <button
                        type="button"
                        className="text-xs underline"
                        onClick={() => persist(items.filter((row) => row.clientId !== item.clientId))}
                      >
                        {t("remove")}
                      </button>
                    </div>
                    <input
                      value={item.notes}
                      onChange={(event) =>
                        persist(
                          items.map((row) =>
                            row.clientId === item.clientId
                              ? { ...row, notes: event.target.value, rev: row.rev, updatedAt: new Date().toISOString() }
                              : row,
                          ),
                        )
                      }
                      className="field mt-2 w-full rounded-xl px-3 py-2 text-sm"
                    />
                  </li>
                );
              })}
          </ul>
        </section>
      ))}
    </div>
  );
}

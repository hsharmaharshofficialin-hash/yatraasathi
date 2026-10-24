"use client";

import { useEffect, useMemo, useState } from "react";
import { ClaimLedger } from "@/components/ClaimLedger";
import { PRESET_Q, pickPack } from "@/data/content-i18n";
import { askQuestion, fetchSites, siteName } from "@/lib/api";
import { useApp, speak } from "@/hooks/useClient";
import { loadCachedPack } from "@/lib/offline";
import { packMessage } from "@/lib/localize";
import { buildPramaanAnswer } from "@/lib/pramaan";
import type { AskResponse, SiteOut } from "@/lib/types";

export function AskPanel({ demoPresets = false }: { demoPresets?: boolean }) {
  const { t, lang, net, setDemo, setDegraded } = useApp();
  const [question, setQuestion] = useState(pickPack(PRESET_Q[0].q, "en"));
  const [siteSlug, setSiteSlug] = useState("amer-fort");
  const [sites, setSites] = useState<SiteOut[]>([]);
  const [answer, setAnswer] = useState<AskResponse | null>(null);
  const [progress, setProgress] = useState<string | null>(null);

  useEffect(() => {
    fetchSites().then((res) => {
      setSites(res.sites);
      setDemo(res.demo);
      setDegraded(res.demo);
    });
  }, [setDemo, setDegraded]);

  const siteOptions = useMemo(() => sites, [sites]);

  async function onDeviceAsk(nextQuestion: string) {
    setProgress(t("modelProgress"));
    const pack = await loadCachedPack();
    const worker = new Worker("/workers/offline-engine.js");
    return new Promise<AskResponse>((resolve) => {
      worker.onmessage = (event) => {
        if (event.data.type === "progress") {
          setProgress(`${event.data.percent}% ${event.data.label}`);
        }
        if (event.data.type === "ready") {
          worker.postMessage({
            question: nextQuestion,
            lang,
            siteSlug,
            pack,
            unknownText: packMessage(lang, "unknown"),
          });
        }
        if (event.data.type === "answer") {
          setProgress(null);
          worker.terminate();
          resolve({
            segments: event.data.segments,
            sources: event.data.sources || [],
            engine: "on-device",
            mode: "pramaan",
            lang,
            abstained: event.data.abstained,
          });
        }
      };
      worker.postMessage({ stage: "load" });
    });
  }

  async function run(nextQuestion?: string) {
    const q = (nextQuestion || question).trim();
    if (!q) return;
    setAnswer(null);
    if (net === "offline") {
      const offline = await onDeviceAsk(q);
      setAnswer(offline);
      return;
    }
    const res = await askQuestion({ question: q, lang, siteSlug });
    setDemo(res.demo);
    setAnswer(res.answer);
  }

  return (
    <div className="space-y-5">
      {demoPresets ? (
        <div className="flex flex-wrap gap-2">
          {PRESET_Q.map((preset) => {
            const q = pickPack(preset.q, lang, pickPack(preset.q, "en"));
            return (
              <button
                key={preset.site + q}
                type="button"
                className="thikri rounded-full border border-amber-500/25 bg-slate-900/70 px-3 py-1 text-sm text-slate-200"
                onClick={() => {
                  setQuestion(q);
                  setSiteSlug(preset.site);
                  run(q);
                }}
              >
                {q}
              </button>
            );
          })}
        </div>
      ) : null}
      <form
        className="frame jharokha rounded-[28px] p-4"
        onSubmit={(event) => {
          event.preventDefault();
          run();
        }}
      >
        <label className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">{t("ask")}</label>
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder={t("askPlaceholder")}
          className="field mt-2 min-h-24 w-full resize-y rounded-2xl p-3"
        />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <select
            value={siteSlug}
            onChange={(event) => setSiteSlug(event.target.value)}
            className="field rounded-full px-3 py-2"
          >
            {siteOptions.map((site) => (
              <option key={site.slug} value={site.slug}>
                {siteName(site, lang)}
              </option>
            ))}
          </select>
          <button type="submit" className="btn-gold rounded-full px-5 py-2">
            {t("askSubmit")}
          </button>
          {answer ? (
            <button
              type="button"
              className="rounded-full border border-[var(--line)] px-4 py-2"
              onClick={() => speak(answer.segments.map((seg) => seg.text).join(" "), lang)}
            >
              {t("speak")}
            </button>
          ) : null}
        </div>
        {progress ? <p className="mt-3 text-sm">{progress}</p> : null}
        <p className="mt-3 text-xs text-[var(--muted)]">{t("noKey")}</p>
      </form>
      {answer ? (
        <div className="frame rounded-[28px] p-5">
          <ClaimLedger answer={answer} />
        </div>
      ) : null}
      {net === "offline" && !answer ? (
        <p className="text-sm text-[var(--muted)]">{t("neuralSkipped")}</p>
      ) : null}
      {!answer ? (
        <p className="text-sm text-[var(--muted)]">
          Offline fallback uses {buildPramaanAnswer({ question: "unesco", lang: "en" }).engine} retrieval, never memory.
        </p>
      ) : null}
    </div>
  );
}

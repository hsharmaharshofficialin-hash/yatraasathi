"use client";

import { useState } from "react";
import { useApp } from "@/hooks/useClient";
import type { AskResponse, SegmentOut, SourceOut } from "@/lib/types";

function labelFor(status: SegmentOut["status"], t: (k: "verified" | "inferred" | "unknown") => string) {
  if (status === "verified") return t("verified");
  if (status === "inferred") return t("inferred");
  return t("unknown");
}

export function ClaimLedger({
  answer,
  highlightUnsupported,
}: {
  answer: AskResponse;
  highlightUnsupported?: string[];
}) {
  const { t } = useApp();
  const [open, setOpen] = useState<SegmentOut | null>(null);
  const unsupported = new Set(highlightUnsupported || []);

  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">{t("tapClaim")}</p>
      {answer.segments.map((segment, index) => {
        const bad = unsupported.has(segment.text);
        const cls = bad
          ? "claim-plain-bad"
          : segment.status === "verified"
            ? "claim-verified"
            : segment.status === "inferred"
              ? "claim-inferred"
              : "claim-unknown";
        return (
          <button
            type="button"
            key={`${index}-${segment.text.slice(0, 24)}`}
            className={`frame thikri w-full rounded-2xl p-4 text-left ${cls}`}
            onClick={() => setOpen(segment)}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em]">
              {bad ? t("unsupported") : labelFor(segment.status, t)}
            </p>
            <p className="mt-2 text-[1.05rem] leading-relaxed">{segment.text}</p>
          </button>
        );
      })}
      <p className="text-xs text-[var(--muted)]">
        {t("enginePramaan")}: {answer.engine} · {answer.abstained ? t("unknown") : t("verified")}
      </p>
      {open ? (
        <EvidenceDrawer
          segment={open}
          sources={answer.sources}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </div>
  );
}

function EvidenceDrawer({
  segment,
  sources,
  onClose,
}: {
  segment: SegmentOut;
  sources: SourceOut[];
  onClose: () => void;
}) {
  const { t } = useApp();
  const hits = sources.filter((src) => segment.sourceIds.includes(src.code));
  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-black/70 p-3 sm:place-items-center">
      <div className="frame jharokha max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">{t("evidence")}</p>
        <p className="mt-2 text-lg">{segment.text}</p>
        <p className="mt-3 text-sm font-semibold">
          {labelFor(segment.status, t)}
          {segment.reason ? ` — ${segment.reason}` : ""}
        </p>
        {hits.length === 0 ? (
          <p className="mt-4 text-sm text-[var(--muted)]">{t("unknownValid")}</p>
        ) : (
          hits.map((src) => (
            <article key={src.code} className="mt-4 border-t border-[var(--line)] pt-4 text-sm">
              <p className="font-semibold">{src.title}</p>
              <p>
                {src.publisher}
                {src.verifiedAt ? ` · ${t("lastVerified")} ${src.verifiedAt.slice(0, 10)}` : ""}
              </p>
              <p className="text-[var(--muted)]">{src.verifier}</p>
              {src.notes ? <p className="mt-2">{src.notes}</p> : null}
              {src.url ? (
                <a className="mt-2 inline-block underline" href={src.url} target="_blank" rel="noreferrer">
                  {src.url}
                </a>
              ) : null}
            </article>
          ))
        )}
        <button type="button" className="btn-gold mt-6 rounded-full px-4 py-2" onClick={onClose}>
          {t("close")}
        </button>
      </div>
    </div>
  );
}

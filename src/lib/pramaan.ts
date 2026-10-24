import { KNOWLEDGE, SOURCES, type KnowledgeRecord, type SourceRecord } from "@/data/jaipur-sites";
import { asLang, packMessage } from "@/lib/localize";
import type { AskResponse, ClaimStatus, SegmentOut, SourceOut } from "@/lib/types";

const STOP = new Set(
  "a an the is are was were be to of in on for and or what when where who how does do did can i we you they this that these those hai kya kab kahan kaun kaiki ke ki se mein me jaipur site temple fort".split(
    " ",
  ),
);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOP.has(token));
}

function sourceMap(): Map<string, SourceRecord> {
  return new Map(SOURCES.map((row) => [row.code, row]));
}

export function toSourceOut(row: SourceRecord | undefined): SourceOut | null {
  if (!row) return null;
  return {
    code: row.code,
    title: row.title,
    publisher: row.publisher,
    url: row.url,
    verifiedAt: row.verifiedAt,
    verifier: row.verifier,
    notes: row.notes,
  };
}

export function scoreFact(tokens: string[], fact: KnowledgeRecord): number {
  const hay = `${fact.claimEn} ${fact.claimHi} ${fact.tags} ${fact.siteSlug ?? ""}`.toLowerCase();
  let score = 0;
  for (const token of tokens) {
    if (hay.includes(token)) score += token.length > 4 ? 2 : 1;
  }
  if (fact.status === "verified") score += 0.5;
  return score;
}

export function retrieveFacts(
  question: string,
  siteSlug?: string | null,
  pack: KnowledgeRecord[] = KNOWLEDGE,
): KnowledgeRecord[] {
  const tokens = tokenize(question);
  if (!tokens.length) return [];
  const ranked = pack
    .map((fact) => {
      let score = scoreFact(tokens, fact);
      if (siteSlug && fact.siteSlug === siteSlug) score += 2;
      return { fact, score };
    })
    .filter((row) => row.score >= 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((row) => row.fact);
  return ranked;
}

function claimText(fact: KnowledgeRecord, lang: string): string {
  const code = asLang(lang);
  if (code === "hi") return fact.claimHi;
  return fact.claimEn;
}

export function unknownSegment(lang: string, hint?: string): SegmentOut {
  const base = packMessage(lang, "unknown");
  return {
    text: hint ? `${base} ${hint}` : base,
    status: "unknown",
    sourceIds: [],
  };
}

function inferIfSerial(facts: KnowledgeRecord[], lang: string): SegmentOut | null {
  const hasAmer = facts.some((f) => f.siteSlug === "amer-fort" && f.sourceCode === "src_unesco_247");
  const hasSix = facts.some((f) => (f.tags || "").includes("six"));
  if (!hasAmer || !hasSix) return null;
  return {
    text: packMessage(lang, "inferred"),
    status: "inferred",
    sourceIds: ["src_unesco_247", "src_hindu_2013_forts"],
    reason: "Combination of the 2013 serial inscription and the named list of six forts.",
  };
}

export function buildPramaanAnswer(options: {
  question: string;
  lang: string;
  siteSlug?: string | null;
  pack?: KnowledgeRecord[];
  engine?: AskResponse["engine"];
}): AskResponse {
  const lang = asLang(options.lang);
  const pack = options.pack ?? KNOWLEDGE;
  const retrieved = retrieveFacts(options.question, options.siteSlug, pack);
  const verified = retrieved.filter((row) => row.status === "verified" && row.sourceCode);
  const sourcesUsed = sourceMap();
  const sourceCodes = new Set<string>();

  if (!verified.length) {
    return {
      segments: [unknownSegment(lang)],
      sources: [],
      engine: options.engine ?? "rule-based",
      mode: "pramaan",
      lang,
      abstained: true,
    };
  }

  const segments: SegmentOut[] = verified.map((fact) => {
    if (fact.sourceCode) sourceCodes.add(fact.sourceCode);
    return {
      text: claimText(fact, lang),
      status: "verified" as ClaimStatus,
      sourceIds: fact.sourceCode ? [fact.sourceCode] : [],
    };
  });

  const inferred = inferIfSerial(verified, lang);
  if (inferred) {
    inferred.sourceIds.forEach((code) => sourceCodes.add(code));
    segments.push(inferred);
  }

  const sources = [...sourceCodes]
    .map((code) => toSourceOut(sourcesUsed.get(code)))
    .filter((row): row is SourceOut => Boolean(row));

  return {
    segments,
    sources,
    engine: options.engine ?? "rule-based",
    mode: "pramaan",
    lang,
    abstained: false,
  };
}

export function buildPlainAnswer(options: {
  question: string;
  lang: string;
  siteSlug?: string | null;
}): AskResponse {
  const lang = asLang(options.lang);
  const pramaan = buildPramaanAnswer(options);
  const extras: SegmentOut[] = [
    {
      text: packMessage(lang, "plain1"),
      status: "unknown",
      sourceIds: [],
      reason: "Ungrounded superlative and commercial advice — not in the pack.",
    },
    {
      text: packMessage(lang, "plain2"),
      status: "unknown",
      sourceIds: [],
      reason: "Operational access and instrument precision were not retrieved as verified facts.",
    },
  ];

  return {
    segments: [
      ...pramaan.segments.filter((seg) => seg.status === "verified").slice(0, 2),
      ...extras,
    ],
    sources: pramaan.sources,
    engine: "rule-based",
    mode: "plain",
    lang,
    abstained: false,
  };
}

export function unsupportedFromPlain(plain: AskResponse, pramaan: AskResponse) {
  const verifiedText = new Set(
    pramaan.segments.filter((seg) => seg.status === "verified").map((seg) => seg.text),
  );
  return plain.segments
    .filter((seg) => !verifiedText.has(seg.text))
    .map((seg) => ({
      text: seg.text,
      reason: seg.reason || "Sentence is not supported by a verified knowledge-pack claim.",
    }));
}

export function parseTaggedLlm(raw: string): SegmentOut[] {
  const pattern =
    /\[(VERIFIED:([^\]]+)|INFERRED|UNKNOWN)\]\s*([\s\S]*?)(?=\[(?:VERIFIED:|INFERRED|UNKNOWN)\]|$)/g;
  const segments: SegmentOut[] = [];
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(raw))) {
    const tag = match[1];
    const text = match[3].trim();
    if (!text) continue;
    if (tag.startsWith("VERIFIED:")) {
      segments.push({ text, status: "verified", sourceIds: [match[2]] });
    } else if (tag === "INFERRED") {
      segments.push({ text, status: "inferred", sourceIds: [] });
    } else {
      segments.push({ text, status: "unknown", sourceIds: [] });
    }
  }
  if (!segments.length) return [unknownSegment("en")];
  return segments;
}

export async function maybeOpenAiSegments(prompt: string): Promise<SegmentOut[] | null> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0,
        messages: [
          {
            role: "system",
            content:
              "You may only restate facts from the user-supplied knowledge pack. Use tags [VERIFIED:source_code] sentence [INFERRED] sentence [UNKNOWN] sentence. If nothing fits, output one [UNKNOWN] sentence. Never invent ratings.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const content = data.choices?.[0]?.message?.content;
    if (!content) return null;
    return parseTaggedLlm(content);
  } catch {
    return null;
  }
}

export function knowledgePackPayload() {
  return {
    facts: KNOWLEDGE,
    sources: SOURCES,
  };
}

import { buildPramaanAnswer, maybeOpenAiSegments, unknownSegment } from "@/lib/pramaan";
import { KNOWLEDGE, SOURCES } from "@/data/jaipur-sites";
import type { AskResponse } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    question?: string;
    lang?: string;
    site_slug?: string;
    mode?: "pramaan" | "plain";
    stream?: boolean;
  };
  const question = (body.question || "").trim();
  const lang = body.lang || "en";
  if (!question) {
    return Response.json({ error: "question required" }, { status: 400 });
  }

  let answer = buildPramaanAnswer({
    question,
    lang,
    siteSlug: body.site_slug,
  });

  const wantLlm = Boolean(process.env.OPENAI_API_KEY);
  if (wantLlm && body.mode !== "plain") {
    const packText = KNOWLEDGE.filter((row) => row.status === "verified")
      .map((row) => `[${row.sourceCode}] ${row.claimEn}`)
      .join("\n");
    const llm = await maybeOpenAiSegments(
      `Question: ${question}\nLang: ${lang}\nSite: ${body.site_slug || "none"}\nPack:\n${packText}\nSources: ${SOURCES.map((s) => s.code).join(", ")}`,
    );
    if (llm) {
      const allowed = new Set(KNOWLEDGE.map((row) => row.sourceCode).filter(Boolean));
      const safe = llm.every(
        (seg) =>
          seg.status !== "verified" || seg.sourceIds.every((code) => allowed.has(code)),
      );
      answer = {
        ...answer,
        segments: safe ? llm : [unknownSegment(lang)],
        engine: "openai",
        abstained: !safe || llm.every((seg) => seg.status === "unknown"),
      };
    }
  }

  const payload: AskResponse = answer;
  const stream = body.stream === true;
  if (!stream) return Response.json(payload);

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(`${JSON.stringify(payload)}\n`));
      controller.close();
    },
  });
  return new Response(readable, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

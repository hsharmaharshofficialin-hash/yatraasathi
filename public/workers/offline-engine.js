function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1);
}

function retrieve(question, facts, siteSlug) {
  const tokens = tokenize(question);
  return facts
    .map((fact) => {
      const hay = `${fact.claimEn} ${fact.claimHi} ${fact.tags} ${fact.siteSlug || ""}`.toLowerCase();
      let score = 0;
      for (const token of tokens) if (hay.includes(token)) score += 1;
      if (siteSlug && fact.siteSlug === siteSlug) score += 2;
      if (fact.status === "verified") score += 0.5;
      return { fact, score };
    })
    .filter((row) => row.score >= 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((row) => row.fact)
    .filter((fact) => fact.status === "verified");
}

self.onmessage = (event) => {
  const { question, lang, siteSlug, pack, stage, unknownText } = event.data || {};
  if (stage === "load") {
    self.postMessage({ type: "progress", percent: 30, label: "Reading cached knowledge pack" });
    self.postMessage({ type: "progress", percent: 70, label: "No neural weights bundled — using pack retrieval" });
    self.postMessage({ type: "ready" });
    return;
  }
  const facts = (pack && pack.facts) || [];
  const verified = retrieve(question || "", facts, siteSlug);
  const hi = lang === "hi";
  if (!verified.length) {
    self.postMessage({
      type: "answer",
      engine: "on-device",
      abstained: true,
      segments: [
        {
          text:
            unknownText ||
            (hi
              ? "डिवाइस पर, ऑफ़लाइन: सहेजे पैक में सत्यापित उत्तर नहीं मिला। सिग्नल आने पर फिर पूछें, या दहलीज़ पर पूछें।"
              : "On-device, offline: the cached pack has no verified answer. Ask again with signal, or ask at the threshold."),
          status: "unknown",
          sourceIds: [],
        },
      ],
      sources: [],
    });
    return;
  }
  self.postMessage({
    type: "answer",
    engine: "on-device",
    abstained: false,
    segments: verified.map((fact) => ({
      text: hi ? fact.claimHi : fact.claimEn,
      status: "verified",
      sourceIds: fact.sourceCode ? [fact.sourceCode] : [],
    })),
    sources: (pack.sources || []).filter((src) => verified.some((fact) => fact.sourceCode === src.code)),
  });
};

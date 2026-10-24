from sqlalchemy import select
from sqlalchemy.orm import Session

from src.models import KnowledgeFact, Source
from src.schemas.api import AskOut, SegmentOut, SourceOut
from src.services.fallback import unknown_answer
from src.services.retrieval import retrieve


def _text(fact: KnowledgeFact, lang: str) -> str:
    return fact.claim_hi if lang == "hi" else fact.claim_en


def answer(session: Session, question: str, lang: str, site_slug: str | None) -> AskOut:
    lang = lang or "en"
    facts = [f for f in retrieve(session, question, site_slug) if f.status == "verified" and f.source_code]
    if not facts:
        return unknown_answer(lang)
    codes = {f.source_code for f in facts if f.source_code}
    sources = list(session.scalars(select(Source).where(Source.code.in_(codes))).all())
    segments = [
        SegmentOut(text=_text(fact, lang), status="verified", sourceIds=[fact.source_code] if fact.source_code else [])
        for fact in facts
    ]
    has_amer = any(f.site_slug == "amer-fort" and f.source_code == "src_unesco_247" for f in facts)
    has_six = any("six" in (f.tags or "") for f in facts)
    if has_amer and has_six:
        segments.append(
            SegmentOut(
                text=(
                    "इससे अनुमान है कि आमेर एक क्रमबद्ध छह-दुर्ग संपत्ति का सदस्य है, एकल यूनेस्को स्मारक नहीं।"
                    if lang == "hi"
                    else "From those listings it follows that Amer is one member of a serial group of six forts, not a stand-alone UNESCO monument."
                ),
                status="inferred",
                sourceIds=["src_unesco_247", "src_hindu_2013_forts"],
                reason="Combination of the 2013 serial inscription and the named list of six forts.",
            )
        )
    return AskOut(
        segments=segments,
        sources=[
            SourceOut(
                code=s.code,
                title=s.title,
                publisher=s.publisher,
                url=s.url,
                verifiedAt=s.verified_at,
                verifier=s.verifier,
                notes=s.notes,
            )
            for s in sources
        ],
        engine="rule-based",
        mode="pramaan",
        lang=lang,
        abstained=False,
    )


def plain_answer(session: Session, question: str, lang: str, site_slug: str | None) -> AskOut:
    lang = lang or "en"
    base = answer(session, question, lang, site_slug)
    extras = (
        [
            SegmentOut(
                text="स्थानीय लोग कहते हैं कि आमेर भारत का सबसे सुंदर दुर्ग है और हर किसी को हाथी की सवारी लेनी चाहिए।",
                status="unknown",
                sourceIds=[],
                reason="Ungrounded superlative.",
            ),
            SegmentOut(
                text="जल महल के अंदर हमेशा टिकट से घूमा जा सकता है।",
                status="unknown",
                sourceIds=[],
                reason="Interior access not verified.",
            ),
        ]
        if lang == "hi"
        else [
            SegmentOut(
                text="Locals say Amer is India’s most beautiful fort and every visitor should take the elephant ride.",
                status="unknown",
                sourceIds=[],
                reason="Ungrounded superlative.",
            ),
            SegmentOut(
                text="You can always tour inside Jal Mahal on a ticket, and the sundial is accurate to two seconds.",
                status="unknown",
                sourceIds=[],
                reason="Access and precision not verified.",
            ),
        ]
    )
    verified = [seg for seg in base.segments if seg.status == "verified"][:2]
    return AskOut(
        segments=verified + extras,
        sources=base.sources,
        engine="rule-based",
        mode="plain",
        lang=lang,
        abstained=False,
    )

from src.schemas.api import AskOut, SegmentOut, SourceOut


def unknown_answer(lang: str, engine: str = "rule-based") -> AskOut:
    text = (
        "इस प्रश्न का सत्यापित उत्तर ज्ञान पैक में नहीं है। स्थल पर पूछें।"
        if lang == "hi"
        else "This pack has no verified answer to that question. Ask on site, or ask something a source here can hold."
    )
    return AskOut(
        segments=[SegmentOut(text=text, status="unknown", sourceIds=[])],
        sources=[],
        engine=engine,
        mode="pramaan",
        lang=lang,
        abstained=True,
    )


def source_out(row) -> SourceOut:
    return SourceOut(
        code=row.code,
        title=row.title,
        publisher=row.publisher,
        url=row.url,
        verifiedAt=row.verified_at,
        verifier=row.verifier,
        notes=row.notes,
    )

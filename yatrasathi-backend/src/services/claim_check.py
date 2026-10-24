import re

from src.schemas.api import SegmentOut


def parse_tagged(raw: str) -> list[SegmentOut]:
    pattern = re.compile(
        r"\[(VERIFIED:([^\]]+)|INFERRED|UNKNOWN)\]\s*(.*?)(?=\[(?:VERIFIED:|INFERRED|UNKNOWN)\]|$)",
        re.S,
    )
    segments: list[SegmentOut] = []
    for match in pattern.finditer(raw):
        tag, source, text = match.group(1), match.group(2), match.group(3).strip()
        if not text:
            continue
        if tag.startswith("VERIFIED:"):
            segments.append(SegmentOut(text=text, status="verified", sourceIds=[source]))
        elif tag == "INFERRED":
            segments.append(SegmentOut(text=text, status="inferred", sourceIds=[]))
        else:
            segments.append(SegmentOut(text=text, status="unknown", sourceIds=[]))
    if not segments:
        return [
            SegmentOut(
                text="Parse failure — returning unknown. The model output was not tagged.",
                status="unknown",
                sourceIds=[],
            )
        ]
    return segments

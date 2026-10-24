from src.config import get_settings
from src.schemas.api import SegmentOut
from src.services.claim_check import parse_tagged


def try_openai(prompt: str) -> list[SegmentOut] | None:
    settings = get_settings()
    if not settings.OPENAI_API_KEY:
        return None
    try:
        from openai import OpenAI

        client = OpenAI(api_key=settings.OPENAI_API_KEY)
        completion = client.chat.completions.create(
            model=settings.OPENAI_MODEL,
            temperature=0,
            messages=[
                {
                    "role": "system",
                    "content": "Only restate pack facts. Tag [VERIFIED:code] [INFERRED] [UNKNOWN]. Never invent ratings.",
                },
                {"role": "user", "content": prompt},
            ],
        )
        content = completion.choices[0].message.content or ""
        return parse_tagged(content)
    except Exception:
        return None

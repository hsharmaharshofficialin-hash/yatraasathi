"""Report missing environment variables. Run from yatrasathi-backend."""

from __future__ import annotations

import os
import sys
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parents[1] / ".env")

REQUIRED = {
    "DATABASE_URL": "PostgreSQL connection string (Neon or local).",
}
OPTIONAL = {
    "FRONTEND_ORIGIN": "Comma-separated CORS origins for the Vercel frontend.",
    "OPENAI_API_KEY": "Optional. Empty means rule-based Pramaan only.",
    "OPENAI_MODEL": "Optional chat model name.",
    "PORT": "Listen port. Render/Railway set this. Default 4000.",
}


def main() -> int:
    missing = [name for name in REQUIRED if not os.environ.get(name)]
    print("YatraSathi backend environment")
    for name, help_text in REQUIRED.items():
        mark = "OK" if os.environ.get(name) else "MISSING"
        print(f"  [{mark}] {name} — {help_text}")
    for name, help_text in OPTIONAL.items():
        mark = "set" if os.environ.get(name) else "empty"
        print(f"  [{mark}] {name} — {help_text}")
    if missing:
        print("Missing required variables:", ", ".join(missing))
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())

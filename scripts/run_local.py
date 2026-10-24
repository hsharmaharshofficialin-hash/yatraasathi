"""Print and optionally run local migrate + seed + servers.

Usage, from the repo root (PowerShell):

    py scripts/run_local.py
"""

from __future__ import annotations

import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BACKEND = ROOT / "yatrasathi-backend"


def run(cmd: list[str], cwd: Path) -> None:
    print(">", " ".join(cmd), f"(cwd={cwd})")
    subprocess.check_call(cmd, cwd=str(cwd))


def main() -> None:
    print("YatraSathi local stack")
    print("1) Next.js frontend at repo root, port 3000")
    print("2) FastAPI backend in yatrasathi-backend, port 4000")
    print("Migrations/seed are not run by Uvicorn at startup.")
    if "--apply" not in sys.argv:
        print("Re-run with --apply to execute drizzle push, alembic, seed.")
        print("Then in two terminals:")
        print("  npm run dev")
        print("  cd yatrasathi-backend && .venv/Scripts/uvicorn src.main:app --reload --port 4000")
        return
    run(["npx", "drizzle-kit", "push"], ROOT)
    env = os.environ.copy()
    run([sys.executable, "-m", "alembic", "upgrade", "head"], BACKEND)
    run([sys.executable, "scripts/seed.py"], BACKEND)
    print("Done. Start servers yourself so this script does not leave them running.")


if __name__ == "__main__":
    main()

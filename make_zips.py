"""Create delivery zips with the Python standard library only.

    py make_zips.py
"""

from __future__ import annotations

import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent

SKIP_DIRS = {
    ".git",
    ".next",
    "node_modules",
    ".venv",
    "venv",
    "__pycache__",
    ".pytest_cache",
}
SKIP_FILES = {".env"}
SKIP_SUFFIX = {".pyc", ".zip"}


def wanted(path: Path) -> bool:
    rel = path.relative_to(ROOT)
    if any(part in SKIP_DIRS for part in rel.parts):
        return False
    if path.name in SKIP_FILES:
        return False
    if path.suffix in SKIP_SUFFIX:
        return False
    return True


def add_tree(zf: zipfile.ZipFile, base: Path, prefix: str) -> None:
    for path in base.rglob("*"):
        if not path.is_file() or not wanted(path):
            continue
        rel = path.relative_to(base)
        zf.write(path, Path(prefix) / rel)


def main() -> None:
    frontend_zip = ROOT / "yatrasathi-frontend.zip"
    backend_zip = ROOT / "yatrasathi-backend.zip"
    full_zip = ROOT / "yatrasathi-full.zip"

    frontend_roots = [
        "src",
        "public",
        "package.json",
        "package-lock.json",
        "tsconfig.json",
        "next.config.ts",
        "postcss.config.mjs",
        "eslint.config.mjs",
        "drizzle.config.json",
        ".env.example",
        "README.md",
    ]

    with zipfile.ZipFile(frontend_zip, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.write(ROOT / "yatrasathi-frontend" / ".env.example", "yatrasathi-frontend/.env.example")
        for name in frontend_roots:
            path = ROOT / name
            if not path.exists():
                continue
            if path.is_file():
                zf.write(path, Path("yatrasathi-frontend") / name)
            else:
                add_tree(zf, path, f"yatrasathi-frontend/{name}")

    with zipfile.ZipFile(backend_zip, "w", zipfile.ZIP_DEFLATED) as zf:
        add_tree(zf, ROOT / "yatrasathi-backend", "yatrasathi-backend")

    with zipfile.ZipFile(full_zip, "w", zipfile.ZIP_DEFLATED) as zf:
        for path in ROOT.rglob("*"):
            if not path.is_file() or not wanted(path):
                continue
            if path.name in {"yatrasathi-frontend.zip", "yatrasathi-backend.zip", "yatrasathi-full.zip"}:
                continue
            zf.write(path, Path("yatrasathi") / path.relative_to(ROOT))

    print("Wrote", frontend_zip.name, backend_zip.name, full_zip.name)


if __name__ == "__main__":
    main()

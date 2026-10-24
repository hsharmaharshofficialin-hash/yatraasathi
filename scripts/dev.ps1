# One-machine local run notes for Windows PowerShell.
# Terminal 1 — backend
Set-Location yatrasathi-backend
if (-not (Test-Path .venv)) { py -3.12 -m venv .venv }
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
python scripts\check_env.py
alembic upgrade head
python scripts\seed.py
$listenPort = $env:PORT
if (-not $listenPort) { $listenPort = "4000" }
uvicorn src.main:app --reload --host 0.0.0.0 --port $listenPort

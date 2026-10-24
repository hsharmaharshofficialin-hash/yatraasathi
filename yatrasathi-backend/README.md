# YatraSathi backend

FastAPI service for the Pramaan Engine, site records, itinerary sync and changelog.

This folder talks to the frontend **only over HTTP**. Do not import frontend code.

## Local run (Windows PowerShell)

```powershell
cd yatrasathi-backend
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
python scripts\check_env.py
alembic upgrade head
python scripts\seed.py
uvicorn src.main:app --reload --host 0.0.0.0 --port $env:PORT
```

If `PORT` is empty, Uvicorn still needs a number:

```powershell
uvicorn src.main:app --reload --host 0.0.0.0 --port 4000
```

Open http://127.0.0.1:4000/health and http://127.0.0.1:4000/docs

Migrations and seed are **never** run at process start. You run them from your computer against local or hosted Postgres.

## Contract

Pydantic models in `src/schemas/api.py` are the contract. FastAPI `/docs` is the human view.

HTTP JSON is produced by FastAPI. There are no developer-edited `.json` data files in this folder.

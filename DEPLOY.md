# Deploy YatraSathi (Hosting Mode B)

Frontend on **Vercel**. Backend as a long-lived web service on **Render** (Railway notes at the end). You work on Windows in VS Code with PowerShell.

Migrations and seed **always run from your computer** against the hosted database. They never run when the server starts.

## 0. Commit and push from VS Code

1. Click the Source Control icon in the left sidebar (branch / Git).
2. Review files. `.env` must **not** appear (it is gitignored). `.env.example` should appear.
3. Type a message, for example `YatraSathi Jaipur trip`.
4. Click **Commit**, then **Sync Changes** / **Publish Branch**.
5. If GitHub asks you to sign in, finish that first. Render and Vercel will read this repo.

## 1. Create the Neon database

1. Open [https://console.neon.tech](https://console.neon.tech) and sign in.
2. Create a project (region close to you). Copy the connection string.
3. It looks like `postgresql://USER:PASSWORD@HOST/dbname?sslmode=require`.
4. Keep it secret. You will paste it into Render **and** into a local `.env` only on your machine.

## 2. Migrate and seed from your PC

In PowerShell, from the repo:

```powershell
cd yatrasathi-backend
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
notepad .env
```

Set `DATABASE_URL` to the Neon string. Save. Then:

```powershell
python scripts\check_env.py
alembic upgrade head
python scripts\seed.py
```

You should see `Seeded Jaipur pack.` If it says the database already has sites, you already seeded.

## 3. Deploy the backend on Render

1. Open [https://dashboard.render.com](https://dashboard.render.com) and sign in with GitHub.
2. **New +** → **Web Service** → connect this GitHub repo.
3. Settings:
   - **Name:** `yatrasathi-backend` (any name is fine)
   - **Root Directory:** `yatrasathi-backend`
   - **Runtime:** Python 3
   - **Build command:** `pip install -r requirements.txt`
   - **Start command:** `uvicorn src.main:app --host 0.0.0.0 --port $PORT`
4. Python version: this folder contains `.python-version` with `3.12`. If the dashboard asks, choose 3.12.
5. Environment variables (backend project):

   | Variable | Value |
   | --- | --- |
   | `DATABASE_URL` | Neon connection string |
   | `FRONTEND_ORIGIN` | `http://localhost:3000` for now; you will replace this with the Vercel URL |
   | `OPENAI_API_KEY` | optional; leave empty for rule-based Pramaan |
   | `OPENAI_MODEL` | `gpt-4o-mini` if you use a key |
   | `PORT` | Render sets this. Do not invent a value. |

6. Create the service and wait until it is live.
7. Open `https://YOUR-SERVICE.onrender.com/docs`. You should see the API contract.
8. Open `https://YOUR-SERVICE.onrender.com/health`. You want `{ "ok": true, "service": "yatrasathi-backend" }`.

### Idle sleep (free plans)

**Free Render (and some Railway) plans put idle services to sleep.** The first request after a nap can take a minute. Before a demo, open the backend URL (or `/health`) a few minutes early so it wakes.

### UptimeRobot-style health check

In [UptimeRobot](https://uptimerobot.com) (or any ping monitor):

- Monitor type: **HTTPS**
- URL: `https://YOUR-SERVICE.onrender.com/health`
- Keyword / expect HTTP 200
- Interval: 5 minutes

This is only a wake-up ping. It is **not** an emergency dispatch system.

## 4. Deploy the frontend on Vercel

1. Open [https://vercel.com](https://vercel.com) → **Add New** → **Project** → import the same GitHub repo.
2. Root Directory: **leave as the repository root** (this sandbox’s Next.js app). If you unzip `yatrasathi-frontend.zip` as its own repo, set Root Directory to that folder.
3. Framework preset: Next.js.
4. Environment variable:

   | Variable | Project | When applied |
   | --- | --- | --- |
   | `NEXT_PUBLIC_API_URL` | Vercel frontend | **Build time.** Value: `https://YOUR-SERVICE.onrender.com` (no trailing slash) |
   | `DATABASE_URL` | Vercel frontend | Only needed if you use the Next `/api` fallback against Neon. Optional when FastAPI is the API. |

5. Deploy. Copy the Vercel URL, for example `https://yatrasathi.vercel.app`.

`NEXT_PUBLIC_API_URL` is inlined when Vercel runs `npm run build`. Changing it later requires a **redeploy**.

## 5. Set FRONTEND_ORIGIN and redeploy the backend

1. Render → backend service → Environment.
2. Set `FRONTEND_ORIGIN` to your Vercel origin, for example `https://yatrasathi.vercel.app`. Comma-separated list is supported if you have a preview URL too.
3. Save. Render redeploys.
4. After **any** environment change, redeploy that project. Vercel: Deployments → Redeploy. Render: Manual Deploy.

## Environment variable table

| Variable | Who needs it | Notes |
| --- | --- | --- |
| `DATABASE_URL` | Backend (Render). Optional on Vercel if using `/api` fallback | Neon string. Never commit it. |
| `FRONTEND_ORIGIN` | Backend | CORS. Comma-separated origins. |
| `PORT` | Backend | Injected by Render/Railway. Local default 4000. |
| `OPENAI_API_KEY` | Backend only | Optional. Empty = rule-based. |
| `OPENAI_MODEL` | Backend | Optional. |
| `NEXT_PUBLIC_API_URL` | Frontend | Public backend `https` URL. Build-time. |

Secrets never go in the frontend bundle except `NEXT_PUBLIC_*`.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| CORS errors in the browser | `FRONTEND_ORIGIN` must match the Vercel origin exactly (`https`, no path). Then redeploy backend. |
| 500 on `/ask` or `/sites` | `DATABASE_URL` wrong or seed not run. Run `python scripts\seed.py` from your PC. |
| Missing module on Render | Root Directory is not `yatrasathi-backend`. Build command not `pip install -r requirements.txt`. |
| Frontend talks to localhost | `NEXT_PUBLIC_API_URL` empty or still `http://127.0.0.1:4000`. Set the Render `https` URL and **rebuild**. |
| Slow first request | Free plan sleep. Open `/health` a few minutes before the demo. Add UptimeRobot on `GET /health`. |
| `/docs` 404 | Wrong Root Directory or start command. Must be `uvicorn src.main:app --host 0.0.0.0 --port $PORT`. |
| Health 500 | Database unreachable from Render. Check Neon allow rules / connection string `sslmode=require`. |

## Railway instead of Render

1. New project → deploy from GitHub.
2. Set **Root Directory** to `yatrasathi-backend`.
3. Build: `pip install -r requirements.txt`
4. Start: `uvicorn src.main:app --host 0.0.0.0 --port $PORT`
5. Add the same environment variables. Railway injects `PORT`.
6. Open `/docs`, then set `FRONTEND_ORIGIN` to the Vercel URL and redeploy.

Railway trial/free instances can also sleep. Wake them before the demo. Same UptimeRobot note: `GET /health`.

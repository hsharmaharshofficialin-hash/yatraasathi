The Next.js frontend in this monorepo lives at the **repository root** (`src/`, `public/`, `package.json`) so the preview platform can build it.

This folder only holds `.env.example` for a Vercel project.

```powershell
copy .env.example .env
npm install
npm run dev
```

Set `NEXT_PUBLIC_API_URL` to the FastAPI origin before `npm run build`. It is applied at build time.

If the backend is unreachable, the UI shows seeded demo data and a banner that says so.

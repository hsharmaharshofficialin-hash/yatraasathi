import shutil

P = "src/components/DestinationPage.jsx"
s = open(P, encoding="utf-8").read()

if "HISTORY" in s:
    raise SystemExit("Already patched. Nothing changed.")

A_IMPORT = 'import { createPortal } from "react-dom";'
A_GRID = '<div className="dp-grid">'
A_CSS = ".dp-grid{display:grid"

for a in (A_IMPORT, A_GRID, A_CSS):
    if s.count(a) != 1:
        raise SystemExit("Anchor not found exactly once: " + a + ". Nothing changed. Send me the file.")

shutil.copyfile(P, P + ".history.bak")

s = s.replace(A_IMPORT, A_IMPORT + '\nimport { HISTORY } from "@/data/destination-history";')

block = """{(HISTORY[dest.s] || []).length > 0 && (
          <section className="dp-hist">
            <h2 className="dp-h2">History and heritage</h2>
            {HISTORY[dest.s].map((h) => (
              <article className="dp-hcard" key={h.name}>
                <h3>{h.name}</h3>
                {h.intro && <p>{h.intro}</p>}
                {h.history && (<><h4>History</h4><p>{h.history}</p></>)}
                {h.about && (<><h4>What makes it special</h4><p>{h.about}</p></>)}
                <a href={h.url} target="_blank" rel="noreferrer">Source: Wikipedia</a>
              </article>
            ))}
            <p className="dp-note">Text from Wikipedia, licensed CC BY-SA 4.0.</p>
          </section>
        )}
        """
s = s.replace(A_GRID, block + A_GRID)

css = """.dp-hist{margin:0 0 36px}
.dp-h2{font-family:var(--f);color:var(--c);font-size:2rem;margin:0 0 14px}
.dp-hcard{padding:22px;margin-bottom:14px;border-radius:20px;backdrop-filter:blur(14px);border:1px solid var(--c);background:rgba(10,5,4,.55)}
.dp-hcard h3{margin:0 0 8px;font-family:var(--f);color:var(--c);font-size:1.6rem}
.dp-hcard h4{margin:14px 0 4px;color:var(--c);font-size:1.1rem;letter-spacing:.06em;text-transform:uppercase}
.dp-hcard p{margin:0;font-size:1.2rem;line-height:1.5;white-space:pre-line}
.dp-hcard a{display:inline-block;margin-top:12px;color:var(--c);font-size:1rem}
.dp-note{font-size:.95rem;color:#ffe9cc;opacity:.8;margin:6px 0 0}
"""
s = s.replace(A_CSS, css + A_CSS)

open(P, "w", encoding="utf-8", newline="").write(s)
print("PATCHED. Backup saved as " + P + ".history.bak")
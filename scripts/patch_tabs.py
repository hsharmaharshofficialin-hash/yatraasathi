import os, shutil

P = "src/components/DestinationPage.jsx"
D = "src/data/destination-details.js"
if not os.path.exists(D):
    raise SystemExit("destination-details.js is missing. Run the step 1 command first. Nothing changed.")

s = open(P, encoding="utf-8").read()
if "DetailTabs" in s:
    raise SystemExit("Already patched. Nothing changed.")

A_IMPORT = 'import { HISTORY } from "@/data/destination-history";'
A_GRID = '<div className="dp-grid">'
A_CSS = ".dp-grid{display:grid"
A_END = "</main>"
for a in (A_IMPORT, A_GRID, A_CSS, A_END):
    if s.count(a) != 1:
        raise SystemExit("Anchor not found exactly once: " + a + ". Nothing changed. Send me the file.")

CSS = r""".dp-tabs{margin:0 0 32px}
.dp-tablist{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 16px}
.dp-tab{padding:10px 22px;border-radius:999px;border:1px solid var(--c);background:rgba(255,255,255,.08);color:#fff7ec;font:inherit;font-size:1.2rem;letter-spacing:.08em;cursor:pointer}
.dp-tab[aria-selected="true"]{background:var(--c);color:#1a0d05}
.dp-tab:focus-visible,.dp-items:focus-visible{outline:2px solid #fff;outline-offset:3px}
.dp-items{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;border-radius:20px}
.dp-item{padding:14px;border-radius:20px;backdrop-filter:blur(14px);border:1px solid var(--c);background:linear-gradient(160deg,color-mix(in srgb,var(--d) 55%,transparent),rgba(10,5,4,.5))}
.dp-ph,.dp-tile{display:block;width:100%;aspect-ratio:4/3;border-radius:14px;margin:0 0 10px}
.dp-ph{object-fit:cover}
.dp-tile{display:flex;align-items:center;justify-content:center;font-size:3.4rem;background:linear-gradient(160deg,var(--d),#120a08)}
.dp-item h3{margin:0 0 6px;font-family:var(--f);color:var(--c);font-weight:700;font-size:1.5rem}
.dp-item p{margin:0;font-size:1.15rem;line-height:1.4}
.dp-credit{font-size:.95rem;color:#ffe9cc;opacity:.8;margin:24px 0 0}
@media (prefers-reduced-motion:no-preference){.dp-item{transition:transform .2s}.dp-item:hover{transform:translateY(-3px)}}
"""

COMPONENT = r"""function DetailTabs({ dest }) {
  const details = DETAILS[dest.s] || {};
  const [tab, setTab] = useState("eat");
  const [manifest, setManifest] = useState({});
  const [bad, setBad] = useState({});
  useEffect(() => {
    let off = false;
    fetch("/images/destinations/photo-manifest.json")
      .then((r) => (r.ok ? r.json() : {}))
      .then((m) => {
        if (!off) setManifest(m || {});
      })
      .catch(() => {});
    return () => {
      off = true;
    };
  }, []);
  const tabs = [
    ["eat", "EAT", "\u{1F37D}\u{FE0F}"],
    ["wear", "WEAR", "\u{1F458}"],
    ["culture", "CULTURE", "\u{1F38E}"],
  ];
  const icon = tabs.find((t) => t[0] === tab)[2];
  const onKey = (e, i) => {
    let n = i;
    if (e.key === "ArrowRight") n = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") n = (i + tabs.length - 1) % tabs.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = tabs.length - 1;
    else return;
    e.preventDefault();
    setTab(tabs[n][0]);
    const el = document.getElementById("dp-tab-" + tabs[n][0]);
    if (el) el.focus();
  };
  return (
    <section className="dp-tabs">
      <div className="dp-tablist" role="tablist" aria-label="Eat, Wear and Culture">
        {tabs.map(([k, label], i) => (
          <button
            key={k}
            id={"dp-tab-" + k}
            type="button"
            role="tab"
            aria-selected={tab === k}
            aria-controls="dp-panel"
            tabIndex={tab === k ? 0 : -1}
            className="dp-tab"
            onClick={() => setTab(k)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {label}
          </button>
        ))}
      </div>
      <div id="dp-panel" role="tabpanel" aria-labelledby={"dp-tab-" + tab} tabIndex={0} className="dp-items">
        {(details[tab] || []).map((it) => {
          const key = dest.s + "/" + tab + "/" + it.id;
          const show = manifest[key] === true && !bad[key];
          return (
            <div className="dp-item" key={it.id}>
              {show ? (
                <img
                  className="dp-ph"
                  src={"/images/destinations/" + key + ".jpg"}
                  alt={it.name}
                  loading="lazy"
                  onError={() => setBad((b) => ({ ...b, [key]: true }))}
                />
              ) : (
                <div className="dp-tile" aria-hidden="true">{icon}</div>
              )}
              <h3>{it.name}</h3>
              <p>{it.note}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
"""

shutil.copyfile(P, P + ".tabs.bak")
s = s.replace(A_IMPORT, A_IMPORT + '\nimport { DETAILS } from "@/data/destination-details";')
s = s.replace(A_GRID, '{DETAILS[dest.s] && <DetailTabs dest={dest} />}\n        <div className="dp-grid" style={DETAILS[dest.s] ? { display: "none" } : undefined}>')
s = s.replace(A_CSS, CSS + A_CSS)
s = s.replace(A_END, '<p className="dp-credit">Photos: Wikimedia Commons</p>\n      ' + A_END)
s = s.rstrip("\n") + "\n\n" + COMPONENT
open(P, "w", encoding="utf-8", newline="").write(s)

d = open(D, encoding="utf-8").read()
print("PATCHED. Backup: " + P + ".tabs.bak")
print("Items in details file:", d.count('id: "'), "(expected 45)")

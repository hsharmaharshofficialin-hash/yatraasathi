import os, shutil, sys
edits = []
def lines_without(path, needle):
    t = open(path, encoding="utf-8").read().split("\n")
    hit = [i for i, l in enumerate(t) if needle in l]
    if len(hit) != 1:
        sys.exit("STOP: %s: '%s' found %d times" % (path, needle, len(hit)))
    del t[hit[0]]
    edits.append((path, "\n".join(t)))
for p, n in [("public/sw.js", '"/arena"'), ("src/components/AppChrome.tsx", 'href: "/arena"'), ("src/components/Cards.jsx", 'h: "/arena"'), ("src/components/CinematicHome.jsx", 'h: "/arena"'), ("src/components/ToolShell.jsx", 'h: "/arena"')]:
    lines_without(p, n)
m = "yatrasathi-backend/src/main.py"
t = open(m, encoding="utf-8").read().split("\n")
a = [i for i, l in enumerate(t) if l.strip() == "from src.routers import arena, ask, changelog, itinerary, sites"]
b = [i for i, l in enumerate(t) if l.strip() == "app.include_router(arena.router)"]
if len(a) != 1 or len(b) != 1:
    sys.exit("STOP: main.py anchors not found exactly once")
t[a[0]] = t[a[0]].replace("arena, ", "")
del t[b[0]]
edits.append((m, "\n".join(t)))
moves = [("src/app/arena", "_arena_removed/app_arena"), ("src/app/api/arena", "_arena_removed/api_arena"), ("yatrasathi-backend/src/routers/arena.py", "_arena_removed/router_arena.py")]
for s, d in moves:
    if not os.path.exists(s):
        sys.exit("STOP: missing " + s)
if os.path.exists("_arena_removed"):
    sys.exit("STOP: _arena_removed already exists")
for p, new in edits:
    shutil.copy(p, p + ".arena.bak")
    open(p, "w", encoding="utf-8").write(new)
os.makedirs("_arena_removed")
for s, d in moves:
    shutil.move(s, d)
print("OK: Arena removed. Moved files are in _arena_removed. Backups: *.arena.bak")
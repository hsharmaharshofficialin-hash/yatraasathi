import os, shutil, subprocess, sys

ROOT = r"C:\Users\HP\Desktop\vercel-and-backend-deployment"
NAV = ["src/components/AppChrome.tsx", "src/components/Cards.jsx",
       "src/components/CinematicHome.jsx", "src/components/ToolShell.jsx"]

def read(rel):
    with open(os.path.join(ROOT, rel), encoding="utf-8", newline="") as f:
        return f.read()

plan = {}
for rel in NAV:
    lines = read(rel).split("\n")
    hits = [i for i, l in enumerate(lines) if '"/arena"' in l]
    if len(hits) != 1:
        sys.exit("STOP " + rel + ": expected 1 arena link line, found " + str(len(hits)))
    plan[rel] = (lines, hits[0])

for rel, (lines, i) in plan.items():
    path = os.path.join(ROOT, rel)
    shutil.copy2(path, path + ".arena2.bak")
    del lines[i]
    with open(path, "w", encoding="utf-8", newline="") as f:
        f.write("\n".join(lines))
    print("OK:", rel)

OUT = os.path.join(os.path.expanduser("~"), "Desktop", "arena-next.txt")
ask = read("src/components/AskPanel.tsx")
api = read("src/lib/api.ts").split("\n")[92:145]
typ = read("src/lib/types.ts").split("\n")[22:60]
with open(OUT, "w", encoding="utf-8") as f:
    f.write("=== AskPanel.tsx ===\n" + ask + "\n=== api.ts 93-145 ===\n" + "\n".join(api) + "\n=== types.ts 23-60 ===\n" + "\n".join(typ))
print("Saved", OUT)
subprocess.Popen(["notepad", OUT])
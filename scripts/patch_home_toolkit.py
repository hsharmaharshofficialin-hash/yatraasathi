import re, shutil, sys
P = "src/components/CinematicHome.jsx"
s = open(P, encoding="utf-8").read()
if "HomeToolkit" in s:
    sys.exit("STOP: already patched")
imp = 'import { DESTS } from "@/data/destinations";'
if s.count(imp) != 1:
    sys.exit("STOP: import anchor found %d times" % s.count(imp))
pat = re.compile(r'<div className="ch-tabs">\s*\{tools\.map\(\(it\) => \(\s*<a key=\{it\.t\} className="ch-tab" href=\{it\.h\}>\s*<span>\{it\.i\}</span>\{it\.t\}\s*</a>\s*\)\)\}\s*</div>')
if len(pat.findall(s)) != 1:
    sys.exit("STOP: pill block found %d times" % len(pat.findall(s)))
shutil.copy(P, P + ".toolkit.bak")
s = s.replace(imp, imp + '\nimport HomeToolkit from "@/components/HomeToolkit";', 1)
s = pat.sub(lambda m: '<div style={{ padding: "0 32px", marginTop: 18 }}><HomeToolkit /></div>', s, count=1)
open(P, "w", encoding="utf-8").write(s)
print("OK: patched. Backup: " + P + ".toolkit.bak")
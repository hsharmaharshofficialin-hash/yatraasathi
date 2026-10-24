import shutil, sys
P = "src/components/DestinationFeatures.jsx"
s = open(P, encoding="utf-8").read()
pairs = [
    ('<a href="/plans">View Pack & Go →</a>', '<a href={"/plans?plan=packgo&city=" + slug}>View Pack & Go →</a>'),
    ('<a href="/plans">View Just Landed →</a>', '<a href={"/plans?plan=justlanded&city=" + slug}>View Just Landed →</a>'),
]
for o, n in pairs:
    if s.count(o) != 1:
        sys.exit("STOP: anchor not found exactly once: " + o)
shutil.copy(P, P + ".plans2.bak")
for o, n in pairs:
    s = s.replace(o, n, 1)
open(P, "w", encoding="utf-8").write(s)
print("OK: patched")
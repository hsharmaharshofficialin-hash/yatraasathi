import re, shutil, sys
P = "src/components/DestinationPage.jsx"
s = open(P, encoding="utf-8").read()
if "DestinationFeatures" in s:
    sys.exit("STOP: already patched")
imp = re.findall(r'^import \{ HISTORY \}.*$', s, flags=re.M)
if len(imp) != 1:
    sys.exit("STOP: HISTORY import found %d times" % len(imp))
anchor = '<div className="dp-grid"'
if s.count(anchor) != 1:
    sys.exit("STOP: dp-grid anchor found %d times" % s.count(anchor))
shutil.copy(P, P + ".features.bak")
s = s.replace(imp[0], imp[0] + '\nimport DestinationFeatures from "@/components/DestinationFeatures";', 1)
s = s.replace(anchor, "<DestinationFeatures />\n      " + anchor, 1)
open(P, "w", encoding="utf-8").write(s)
print("OK: patched. Backup: " + P + ".features.bak")
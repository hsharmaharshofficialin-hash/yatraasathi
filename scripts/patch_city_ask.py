import os, shutil, sys
C = "src/components/CityAsk.jsx"
if not os.path.exists(C) or os.path.getsize(C) < 500:
    sys.exit("STOP: CityAsk.jsx missing or empty (paste Step 2 and save)")
A = "src/app/ask/page.tsx"
a = open(A, encoding="utf-8").read()
if "CityAsk" in a:
    sys.exit("STOP: ask page already patched")
if "AskPanel" not in a or len(a.strip().split("\n")) > 12:
    sys.exit("STOP: ask/page.tsx is not the short file I expected")
F = "src/components/DestinationFeatures.jsx"
f = open(F, encoding="utf-8").read()
old = 't: "Travel Tips", h: "/ask" }'
if f.count(old) != 1:
    sys.exit("STOP: Travel Tips tile found %d times" % f.count(old))
PAGE = '''import { AskPanel } from "@/components/AskPanel";
import CityAsk from "@/components/CityAsk";

export default async function AskPage({ searchParams }: { searchParams: Promise<{ city?: string }> }) {
  const sp = await searchParams;
  const city = typeof sp?.city === "string" ? sp.city : "";
  return city ? <CityAsk slug={city} /> : <AskPanel />;
}
'''
shutil.copy(A, A + ".city.bak")
shutil.copy(F, F + ".city.bak")
open(A, "w", encoding="utf-8").write(PAGE)
open(F, "w", encoding="utf-8").write(f.replace(old, 't: "Ask about this place", h: "/ask?city=" + slug }', 1))
print("OK: patched. Backups: *.city.bak")
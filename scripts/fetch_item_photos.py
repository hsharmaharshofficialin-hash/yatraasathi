import json, os, re, sys, time, urllib.request, urllib.parse, urllib.error

UA = {"User-Agent": "YatraSathiDemo/1.0 (student project)"}
DETAILS = "src/data/destination-details.js"
OUTDIR = "public/images/destinations"
MANIFEST = OUTDIR + "/photo-manifest.json"


def get(url, binary=False):
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=40) as r:
                data = r.read()
                return data if binary else json.loads(data.decode("utf-8"))
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < 3:
                time.sleep(20)
                continue
            return None
        except Exception:
            return None
    return None


def parse():
    items = []
    slug = None
    sec = None
    for line in open(DETAILS, encoding="utf-8"):
        m = re.match(r'^  "([a-z0-9-]+)": \{', line)
        if m:
            slug = m.group(1)
            continue
        m = re.match(r'^    (eat|culture|wear): \[', line)
        if m:
            sec = m.group(1)
            continue
        m = re.search(r'id: "([^"]+)"', line)
        w = re.findall(r'wiki: "([^"]+)"', line)
        if slug and sec and m and w:
            items.append((slug, sec, m.group(1), w[-1]))
    return items


def thumb(title):
    q = urllib.parse.urlencode({"action": "query", "titles": title, "prop": "pageimages",
                                "format": "json", "pithumbsize": 800, "redirects": 1})
    d = get("https://en.wikipedia.org/w/api.php?" + q)
    if not d:
        return None
    for p in d.get("query", {}).get("pages", {}).values():
        t = p.get("thumbnail")
        if t:
            return t.get("source")
    return None


only = set(sys.argv[1:])
items = [i for i in parse() if not only or i[0] in only]
os.makedirs(OUTDIR, exist_ok=True)
try:
    manifest = json.load(open(MANIFEST, encoding="utf-8"))
except Exception:
    manifest = {}

ok = 0
missing = []
for slug, sec, iid, wiki in items:
    key = slug + "/" + sec + "/" + iid
    path = "%s/%s/%s/%s.jpg" % (OUTDIR, slug, sec, iid)
    if os.path.exists(path) and os.path.getsize(path) > 0:
        manifest[key] = True
        ok += 1
        print("have  " + key)
        continue
    os.makedirs(os.path.dirname(path), exist_ok=True)
    url = thumb(wiki)
    time.sleep(1.5)
    data = get(url, True) if url else None
    if data:
        open(path, "wb").write(data)
        manifest[key] = True
        ok += 1
        print("ok    " + key + "  <- " + wiki)
    else:
        manifest[key] = False
        missing.append(key)
        print("MISS  " + key + "  <- " + wiki)
    with open(MANIFEST, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=1)
    time.sleep(1.5)

with open(MANIFEST, "w", encoding="utf-8") as f:
    json.dump(manifest, f, indent=1)
print("")
print("DONE. Photos ok: %d of %d" % (ok, len(items)))
print("No photo (%d): %s" % (len(missing), ", ".join(missing) if missing else "none"))

import json, re, os, sys, time, urllib.request, urllib.parse, urllib.error

UA = {"User-Agent": "YatraSathiDemo/1.0 (student project)"}
OUT = "src/data/destination-details.js"
HEAD = "export const DETAILS = "

L = {
"taj-mahal": ("Petha; Bedai; Dalmoth; Biryani; Seekh kebab", "Taj Mahotsav; Pietra dura; Zardozi; Mushaira; Fatehpur Sikri", "Sherwani; Angarkha; Chikankari; Dupatta; Mojari"),
"amer-jaipur": ("Dal baati churma; Laal maas; Ghewar; Kachori; Mirchi bada", "Ghoomar; Kathputli; Block printing; Jantar Mantar, Jaipur; Jaipur Literature Festival", "Bandhani; Leheriya; Pagri; Lehenga; Mojari"),
"red-fort": ("Chaat; Jalebi; Nihari; Paratha; Daulat ki chaat", "Qawwali; Independence Day (India); Chandni Chowk; Jama Masjid, Delhi; Kathak", "Kurta; Sherwani; Banarasi sari; Zardozi; Dupatta"),
"qutub-minar": ("Nihari; Kebab; Chole bhature; Butter chicken; Kulfi", "Qutub Festival; Iron pillar of Delhi; Alai Darwaza; Mehrauli Archaeological Park; Qawwali", "Kurta; Churidar; Zari; Dupatta; Mojari"),
"varanasi": ("Paan; Kachori; Malaiyo; Thandai; Lassi", "Ganga Aarti; Dev Deepawali; Ghats in Varanasi; Banaras gharana; Kashi Vishwanath Temple", "Banarasi sari; Brocade; Dhoti; Kurta; Gamchha"),
"golden-temple": ("Langar (Sikhism)|Langar; Kulcha; Lassi; Sarson da saag; Chole bhature", "Bhangra (dance)|Bhangra; Kirtan; Vaisakhi; Jallianwala Bagh; Giddha", "Turban; Patiala salwar; Phulkari; Salwar kameez; Mojari"),
"kerala-backwaters": ("Appam; Sadhya; Puttu; Kerala porotta; Payasam", "Kathakali; Nehru Trophy Boat Race; Onam; Mohiniyattam; Kalaripayattu", "Kasavu; Mundum Neriyathum; Mundu; Veshti; Kerala sari"),
"mysore-palace": ("Mysore pak; Bisi bele bath; Masala dosa; Ragi mudde; Filter coffee", "Mysore Dasara; Yakshagana; Carnatic music; Mysore painting; Channapatna toys", "Mysore silk; Mysore Peta; Ilkal sari; Dhoti; Kasuti"),
"hampi": ("Puran poli; Ragi mudde; Bisi bele bath; Dosa; Mirchi bajji", "Vijayanagara Empire; Virupaksha Temple, Hampi; Vittala Temple; Hemakuta Hill; Lotus Mahal", "Ilkal sari; Dhoti; Kasuti; Mysore Peta; Kurta"),
"khajuraho": ("Poha; Jalebi; Dal bafla; Malpua; Rabri", "Khajuraho Dance Festival; Chandela dynasty; Kandariya Mahadeva Temple; Lakshmana Temple, Khajuraho; Kathak", "Chanderi sari; Lehenga; Dhoti; Pagri; Maheshwari sari"),
"ajanta-ellora": ("Puran poli; Misal pav; Shrikhand; Thalipeeth; Bhakri", "Ajanta Caves; Kailasa temple, Ellora; Ellora Caves; Bibi Ka Maqbara; Daulatabad Fort", "Paithani; Nauvari sari; Pheta; Kolhapuri chappal; Himroo"),
"mumbai": ("Vada pav; Pav bhaji; Bhelpuri; Bombay sandwich; Bombay duck", "Ganesh Chaturthi; Dabbawala; Bollywood; Elephanta Caves; Kala Ghoda Arts Festival", "Nauvari sari; Paithani; Kolhapuri chappal; Kurta; Gandhi cap"),
"goa": ("Vindaloo; Xacuti; Bebinca; Sorpotel; Feni", "Goa Carnival; Shigmo; Fugdi; Basilica of Bom Jesus; Se Cathedral", "Pano bhaju; Kunbi; Nauvari sari; Cotton; Linen"),
"konark": ("Pakhala; Dalma; Chhena poda; Rasabali; Odia cuisine", "Odissi; Konark Dance Festival; Ratha Yatra; Pattachitra; Pipli, Odisha", "Sambalpuri sari; Bomkai; Khandua; Dhoti; Kotpad"),
"meenakshi-madurai": ("Jigarthanda; Idli; Dosa; Murukku; Sambar", "Chithirai Festival; Bharatanatyam; Jallikattu; Thirumalai Nayakkar Mahal; Pongal (festival)|Pongal", "Kanchipuram silk; Sungudi; Veshti; Angavastram; Pattu pavadai"),
"jaisalmer": ("Ker sangri; Gatte ki sabzi; Bajra; Laal maas; Ghevar", "Kalbelia; Jaisalmer Desert Festival; Patwon Ki Haveli; Gadisar Lake; Sam Sand Dunes", "Shisha embroidery; Bandhani; Pagri; Mojari; Lehenga"),
"udaipur": ("Dal baati churma; Laal maas; Malpua; Kachori; Ghevar", "Gangaur; Pichwai; Rajput painting; Shilpgram; Jagdish Temple", "Bandhani; Pagri; Leheriya; Mojari; Lehenga"),
"ladakh": ("Thukpa; Momo (dumpling)|Momo; Po cha; Tsampa; Chhurpi", "Hemis Monastery; Hemis festival; Cham dance; Thiksey Monastery; Pangong Tso", "Goncha; Perak; Chuba; Pashmina; Tibetan clothing"),
"kashmir": ("Wazwan; Rogan josh; Kahwa; Gushtaba; Noon chai", "Shikara; Sufiana music; Shalimar Bagh, Srinagar; Kashmiri carpet; Papier-mache", "Pheran; Pashmina; Kani shawl; Sozni; Kangri"),
"rishikesh": ("Bal mithai; Kafuli; Aloo ke gutke; Puri; Kheer", "Yoga; Lakshman Jhula; Kumbh Mela; Har Ki Pauri; Beatles in India", "Rudraksha; Kurta; Dhoti; Rangwali pichora; Pashmina"),
}


def call(params):
    url = "https://en.wikipedia.org/w/api.php?" + urllib.parse.urlencode(params)
    for attempt in range(4):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
                return json.loads(r.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            time.sleep(20 if e.code == 429 else 3)
        except Exception:
            time.sleep(3)
    return None


def page_for(title):
    q = {"action": "query", "format": "json", "prop": "extracts|pageimages", "exintro": 1, "explaintext": 1,
         "exsentences": 2, "pithumbsize": 800, "redirects": 1, "titles": title}
    d = call(q)
    page = next(iter(d["query"]["pages"].values())) if d else {}
    if "missing" in page or not page.get("extract"):
        s = call({"action": "query", "format": "json", "list": "search", "srsearch": title, "srlimit": 1})
        hits = s["query"]["search"] if s else []
        if not hits:
            return None
        q["titles"] = hits[0]["title"]
        d = call(q)
        page = next(iter(d["query"]["pages"].values())) if d else None
    return page


def trim(t, n=260):
    t = re.sub(r"\s+", " ", t or "").strip()
    if len(t) > n:
        cut = t[:n]
        i = cut.rfind(". ")
        t = cut[: i + 1] if i > 80 else cut.rstrip() + "..."
    return t


def disp(raw):
    name = raw.split("|")[0]
    return re.sub(r"\s*\(.*?\)", "", name).split(",")[0].strip()


def load():
    if os.path.exists(OUT):
        t = open(OUT, encoding="utf-8").read()
        return json.loads(t[t.index(HEAD) + len(HEAD): t.rindex(";")])
    return {}


def save(data):
    os.makedirs("src/data", exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("// Notes and photos from Wikipedia / Wikimedia Commons. Generated by scripts/fetch_details.py\n")
        f.write(HEAD + json.dumps(data, ensure_ascii=False, indent=1) + ";\n")


data = load()
slugs = sys.argv[1:] or list(L.keys())
for slug in slugs:
    entry = {}
    for sec, raw in zip(("eat", "culture", "wear"), L[slug]):
        items = []
        for item in [x.strip() for x in raw.split(";")]:
            title = item.split("|")[-1]
            name = disp(item)
            iid = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
            page = page_for(title)
            note = trim(page.get("extract")) if page else ""
            src = (page.get("thumbnail") or {}).get("source") if page else None
            has = False
            if src:
                path = "public/images/destinations/%s/%s/%s.jpg" % (slug, sec, iid)
                os.makedirs(os.path.dirname(path), exist_ok=True)
                if os.path.exists(path):
                    has = True
                else:
                    try:
                        with urllib.request.urlopen(urllib.request.Request(src, headers=UA), timeout=40) as r:
                            open(path, "wb").write(r.read())
                        has = True
                    except Exception:
                        has = False
            print("%-5s %-18s %-28s -> %s | note:%s photo:%s" % (
                "ok" if note else "MISS", slug, name, page.get("title") if page else "-", bool(note), has))
            items.append({"id": iid, "name": name, "note": note, "photo": has})
            time.sleep(1.2)
        entry[sec] = items
    data[slug] = entry
    save(data)
print("DONE. Cities saved:", len(data))
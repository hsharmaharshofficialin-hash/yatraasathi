import re, shutil, sys
P = "src/components/HomeToolkit.jsx"
s = open(P, encoding="utf-8").read()
if "ht-sosbar" in s:
    sys.exit("STOP: already patched")
L = s.split("\n")
for key in ['k: "talk"', 'k: "crowd"', 'k: "note"']:
    hit = [i for i, l in enumerate(L) if key in l]
    if len(hit) != 1:
        sys.exit("STOP: %s found %d times" % (key, len(hit)))
    del L[hit[0]]
s = "\n".join(L)
card = re.compile(r'\n        <div className="ht-card ht-sos">.*?</div>\n        </div>', re.S)
if len(card.findall(s)) != 1:
    sys.exit("STOP: emergency card found %d times" % len(card.findall(s)))
s = card.sub("", s, count=1)
cnt = "{TOOLS.length + 2} tools"
sty = "      <style>{`"
if s.count(cnt) != 1 or s.count(sty) != 1:
    sys.exit("STOP: count/style anchor not found exactly once")
strip = '''      <div className="ht-sosbar">
        <strong>Need help right now?</strong>
        <span>Quick access to emergency resources</span>
        <a href="/sos" className="ht-sosbtn">SOS Emergency</a>
      </div>

'''
css = '''
        .ht-sosbar{margin-top:12px;padding:12px;border-radius:14px;background:rgba(220,38,38,.2);border:1px solid rgba(248,113,113,.55)}
        .ht-sosbar strong{display:block;font-size:15px}
        .ht-sosbar span{font-size:12px;color:rgba(255,255,255,.8)}
        .ht-sosbtn{display:block;margin-top:10px;padding:12px;border-radius:10px;background:#b9301f;color:#fff;text-align:center;font-weight:700;text-decoration:none}
        .ht-sosbtn:hover{background:#d13b27}
        .ht-sosbtn:focus-visible{outline:3px solid #fbbf24;outline-offset:2px}'''
shutil.copy(P, P + ".sos.bak")
s = s.replace(cnt, "{TOOLS.length + 1} tools", 1).replace(sty, strip + sty + css, 1)
open(P, "w", encoding="utf-8").write(s)
print("OK: patched. Backup: " + P + ".sos.bak")
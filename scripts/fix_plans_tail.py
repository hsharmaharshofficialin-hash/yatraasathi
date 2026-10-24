import shutil, sys
P = "src/app/plans/page.jsx"
L = open(P, encoding="utf-8").read().split("\n")
s = "\n".join(L)
if "</main>" in s or "pl-done{" in s:
    sys.exit("STOP: file already has its ending")
if len(L) < 145 or not L[144].strip().startswith("<Inp") or 'label="Your name"' not in L[143]:
    sys.exit("STOP: line 144/145 are not what I expected")
shutil.copy(P, P + ".cut.bak")
tail = r'''            <Inp label="Phone" value={f.phone} onChange={set("phone")} inputMode="tel" autoComplete="tel" />
            <Inp label="Email (optional)" value={f.email} onChange={set("email")} type="email" autoComplete="email" />
            {err && <p className="pl-err" role="alert">{err}</p>}
            <button type="submit" className="pl-go">Request {P.name}</button>
            <small className="pl-wide">Demo: no payment is taken and nothing is sent yet.</small>
          </form>

          {done && (
            <section className="pl-done" role="status">
              <h3>Request summary</h3>
              <dl>{done.map((l) => (<div key={l[0]}><dt>{l[0]}</dt><dd>{l[1]}</dd></div>))}</dl>
              <p>A team member would confirm details and price with you before any payment.</p>
              <button type="button" className="pl-go" onClick={copy}>{copied ? "Copied" : "Copy summary"}</button>
            </section>
          )}
        </>
      )}

      <style>{`
        .pl{max-width:1000px;margin:0 auto;padding:32px 20px;font-family:system-ui,sans-serif;color:#1c2431}
        .pl h1{font-size:30px;margin:12px 0 6px}
        .pl-sub,.pl-price{color:#556070}
        .pl-tag{margin:4px 0 10px;font-style:italic;color:#556070}
        .pl-when{font-weight:600;margin:0 0 10px}
        .pl-pts{margin:0 0 12px;padding-left:18px;line-height:1.7}
        .pl-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px;margin-top:20px}
        .pl-card{background:#fff;border:1px solid #d9dee6;border-radius:12px;padding:22px}
        .pl-card h2{margin:0;font-size:22px}
        .pl button,.pl-go{background:#c2410c;color:#fff;border:0;border-radius:8px;padding:11px 18px;font-size:15px;font-weight:600;cursor:pointer}
        .pl .pl-link{background:none;color:#c2410c;padding:0;font-size:14px;margin-right:16px;text-decoration:underline}
        .pl button:focus-visible,.pl input:focus-visible,.pl select:focus-visible,.pl textarea:focus-visible,.pl-link:focus-visible{outline:3px solid #1c2431;outline-offset:2px}
        .pl-form{margin-top:18px;background:#fff;border:1px solid #d9dee6;border-radius:12px;padding:22px;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px}
        .pl-form h2{grid-column:1/-1;margin:0}
        .pl-form label{display:flex;flex-direction:column;gap:6px;font-size:14px;font-weight:600}
        .pl-form input,.pl-form select,.pl-form textarea{padding:10px;border:1px solid #b9c1cd;border-radius:8px;font-size:15px;font-family:inherit}
        .pl-form fieldset{grid-column:1/-1;border:1px solid #d9dee6;border-radius:8px;display:flex;flex-wrap:wrap;gap:8px 18px;padding:12px}
        .pl-form legend{font-weight:600;font-size:14px;padding:0 6px}
        .pl-form label.pl-ck{flex-direction:row;align-items:center;font-weight:400}
        .pl-form label.pl-ck input{padding:0}
        .pl-wide,.pl-err,.pl-form .pl-go{grid-column:1/-1}
        .pl-form .pl-go{justify-self:start}
        .pl-err{color:#b91c1c;margin:0;font-weight:600}
        .pl-done{margin-top:18px;padding:18px;border-radius:12px;background:#ecfdf3;border:1px solid #86d7a8}
        .pl-done h3{margin:0 0 10px}
        .pl-done dl{margin:0 0 10px}
        .pl-done dl div{display:flex;gap:10px;padding:3px 0}
        .pl-done dt{font-weight:600;min-width:140px}
        .pl-done dd{margin:0}
      `}</style>
    </main>
  );
}
'''
open(P, "w", encoding="utf-8").write("\n".join(L[:144]) + "\n" + tail)
print("OK: fixed. Backup: " + P + ".cut.bak")
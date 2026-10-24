"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useApp } from "@/hooks/useClient";
import LangTranslate from "@/components/LangTranslate";
import { DESTS } from "@/data/destinations";
import { MENU_STRINGS } from "@/data/menu-strings";
import { LANGUAGES } from "@/data/languages";

const KEY = "ys_bucket";

function readBucket() {
  try {
    const raw = localStorage.getItem(KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list.filter((x) => x && typeof x.s === "string") : [];
  } catch {
    return [];
  }
}

function writeBucket(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent("ys-bucket"));
  } catch {}
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600&family=Noto+Sans+Devanagari:wght@400;600&family=Noto+Sans+JP:wght@400;600&display=swap');
.gm-btn{position:fixed;top:14px;right:14px;z-index:10001;width:46px;height:46px;border-radius:12px;display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:5px;cursor:pointer;background:rgba(255,255,255,.16);backdrop-filter:blur(10px);
  border:1px solid rgba(255,255,255,.35);padding:0}
.gm-btn span{display:block;width:22px;height:2px;border-radius:2px;background:#fff7ec}
.gm-btn:hover{background:#ffd86b}.gm-btn:hover span{background:#1a0d05}
.gm-btn:focus-visible,.gm-x:focus-visible,.gm-lang:focus-visible,.gm-link:focus-visible,.gm-save:focus-visible,.gm-rm:focus-visible{outline:2px solid #ffd86b;outline-offset:2px}
.gm-back{position:fixed;inset:0;z-index:10002;background:rgba(10,5,4,.55);display:flex;justify-content:flex-end}
.gm-panel{width:min(400px,100vw);height:100%;overflow-y:auto;padding:22px 22px 40px;color:#fff7ec;font-size:1.1rem;
  font-family:"Barlow Condensed","Noto Sans Devanagari","Noto Sans JP",system-ui,Arial,sans-serif;
  background:linear-gradient(170deg,rgba(70,28,12,.97),rgba(20,8,4,.98));border-left:1px solid rgba(255,255,255,.25);animation:gmin .28s ease}
@keyframes gmin{from{transform:translateX(100%)}to{transform:none}}
.gm-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.gm-brand{font-family:"Bebas Neue",Impact,sans-serif;font-size:1.9rem;letter-spacing:.08em;padding-left:10px;border-left:3px solid #ffd86b}
.gm-x{width:40px;height:40px;border-radius:10px;border:1px solid rgba(255,255,255,.3);background:rgba(255,255,255,.1);color:#fff7ec;font-size:1.4rem;cursor:pointer}
.gm-sec{margin-top:22px;padding-top:16px;border-top:1px solid rgba(255,255,255,.18)}
.gm-sec h3{margin:0 0 10px;font-family:"Bebas Neue",Impact,sans-serif;font-weight:400;font-size:1.4rem;letter-spacing:.08em;color:#ffd86b}
.gm-prof{display:flex;gap:12px;align-items:center;margin-bottom:12px}
.gm-prof p{margin:2px 0 0;font-size:1rem;color:#ffe9cc}
.gm-av{width:48px;height:48px;border-radius:50%;display:grid;place-items:center;font-size:1.4rem;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.3)}
.gm-row{display:flex;gap:8px;flex-wrap:wrap}
.gm-link{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;box-sizing:border-box;padding:10px 14px;margin-bottom:8px;
  border-radius:12px;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.1);color:#fff7ec;text-decoration:none;font:inherit;cursor:pointer;text-align:left}
a.gm-link:hover{background:#ffd86b;color:#1a0d05}
.gm-link:disabled{opacity:.55;cursor:not-allowed}
.gm-link em{font-style:normal;font-size:.85rem;padding:2px 8px;border-radius:999px;background:rgba(255,216,107,.2);color:#ffd86b;white-space:nowrap}
.gm-langs{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}
.gm-lang{padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.1);color:#fff7ec;font:inherit;cursor:pointer}
.gm-lang.on{background:#ffd86b;color:#1a0d05;border-color:#ffd86b}
.gm-note{margin:6px 0 0;font-size:.95rem;color:#ffe9cc;opacity:.85}
.gm-save{width:100%;padding:10px 14px;margin-bottom:10px;border-radius:12px;border:1px solid #ffd86b;background:#ffd86b;color:#1a0d05;font:inherit;cursor:pointer}
.gm-save:disabled{opacity:.6;cursor:default}
.gm-list{list-style:none;margin:0;padding:0}
.gm-list li{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.12)}
.gm-list a{color:#ffd86b;text-decoration:none}
.gm-rm{padding:4px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.3);background:transparent;color:#fff7ec;font:inherit;font-size:.95rem;cursor:pointer}
@media (prefers-reduced-motion:reduce){.gm-panel{animation:none}}
`;

export default function GlobalMenu() {
  const path = usePathname() || "";
  const app = useApp();
  const lang = app.lang;
  const setLang = (code) => {
    app.setLang(code);
    window.dispatchEvent(new CustomEvent("ys-lang", { detail: code }));
  };
  const [open, setOpen] = useState(false);
  const [bucket, setBucket] = useState([]);
  const btnRef = useRef(null);
  const panelRef = useRef(null);

  const t = (k) => (MENU_STRINGS[lang] && MENU_STRINGS[lang][k]) || MENU_STRINGS.en[k] || k;

  useEffect(() => {
    const sync = () => setBucket(readBucket());
    sync();
    window.addEventListener("ys-bucket", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("ys-bucket", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    if (btnRef.current) btnRef.current.focus();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusables = () =>
      panel ? Array.from(panel.querySelectorAll("a[href],button:not([disabled])")) : [];
    const first = focusables()[0];
    if (first) first.focus();
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const f = focusables();
      if (!f.length) return;
      const a = f[0];
      const z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) {
        e.preventDefault();
        z.focus();
      } else if (!e.shiftKey && document.activeElement === z) {
        e.preventDefault();
        a.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  const m = path.match(/^\/destinations\/([^/?#]+)/);
  const here = m ? DESTS.find((d) => d.s === m[1]) : null;
  const saved = here ? bucket.some((b) => b.s === here.s) : false;
  const save = () => {
    if (!here || saved) return;
    writeBucket([...readBucket(), { s: here.s, n: here.n }]);
  };
  const remove = (s) => writeBucket(readBucket().filter((b) => b.s !== s));

  const soon = (label) => (
    <button type="button" className="gm-link" disabled aria-disabled="true">
      <span>{label}</span>
      <em>{t("soon")}</em>
    </button>
  );

  return (
    <>
      <LangTranslate />
      <style>{css}</style>
      <button
        ref={btnRef}
        type="button"
        className="gm-btn"
        aria-label={t("menu")}
        aria-expanded={open}
        aria-controls="gm-panel"
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>
      {open && (
        <div className="gm-back" onClick={close}>
          <aside
            id="gm-panel"
            ref={panelRef}
            className="gm-panel"
            role="dialog"
            aria-modal="true"
            aria-label={t("menu")}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="gm-top">
              <span className="gm-brand" translate="no">YATRASATHI</span>
              <button type="button" className="gm-x" aria-label={t("close")} onClick={close}>
                {"\u00D7"}
              </button>
            </div>

            <section className="gm-sec">
              <h3>{t("profile")}</h3>
              <div className="gm-prof">
                <span className="gm-av" aria-hidden="true">{"\u{1F464}"}</span>
                <div>
                  <strong>{t("guest")}</strong>
                  <p>{t("signin_hint")}</p>
                </div>
              </div>
              {soon(t("login"))}
              {soon(t("signup"))}
            </section>

            <section className="gm-sec">
              <h3>{t("language")}</h3>
              <div className="gm-langs" translate="no">
                {LANGUAGES.map(({ code, native: name }) => (
                  <button
                    key={code}
                    type="button"
                    lang={code}
                    className={"gm-lang" + (lang === code ? " on" : "")}
                    aria-pressed={lang === code}
                    onClick={() => setLang(code)}
                  >
                    {name}
                  </button>
                ))}
              </div>
              {lang !== "en" && <p className="gm-note">{t("ai_note")}</p>}
              {lang !== "en" && <p className="gm-note">Automatic translation. It may contain mistakes.</p>}
            </section>

            <section className="gm-sec">
              <h3>{t("payments")}</h3>
              <a className="gm-link" href="/pack-and-go">{"PACK & GO"}</a>
              <a className="gm-link" href="/just-landed">{"JUST LANDED"}</a>
              <p className="gm-note">{t("pay_note")}</p>
            </section>

            <section className="gm-sec">
              <h3>{t("bucket")}</h3>
              {here && (
                <button type="button" className="gm-save" onClick={save} disabled={saved}>
                  {saved ? t("bucket_saved") : t("bucket_save") + " (" + here.n + ")"}
                </button>
              )}
              {bucket.length === 0 ? (
                <p className="gm-note">{t("bucket_empty")}</p>
              ) : (
                <ul className="gm-list">
                  {bucket.map((b) => (
                    <li key={b.s}>
                      <a href={"/destinations/" + b.s}>{b.n}</a>
                      <button type="button" className="gm-rm" aria-label={t("bucket_remove") + " " + b.n} onClick={() => remove(b.s)}>
                        {t("bucket_remove")}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="gm-sec">
              <h3>{t("legal")}</h3>
              {soon(t("terms"))}
              {soon(t("privacy"))}
              {soon(t("refund"))}
              {soon(t("disclaimer"))}
            </section>
          </aside>
        </div>
      )}
    </>
  );
}
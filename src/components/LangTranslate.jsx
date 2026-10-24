"use client";

import React, { useEffect } from "react";

// Google's website translator is used for every text that has no hand-written translation.
// Google's codes differ from ours only for Chinese.
const GOOGLE = { zh: "zh-CN" };
const gcode = (c) => GOOGLE[c] || c;

const css = `
.skiptranslate iframe,.goog-te-banner-frame,.goog-te-balloon-frame,#goog-gt-tt,.goog-te-gadget-icon{display:none!important}
body{top:0!important}
.goog-text-highlight{background:none!important;box-shadow:none!important}
`;

function readCookie() {
  const m = document.cookie.match(/(?:^|; )googtrans=([^;]*)/);
  return m ? decodeURIComponent(m[1]) : "";
}

function targetOf(v) {
  return v ? v.split("/").pop() : "";
}

function wantedTarget(code) {
  return code && code !== "en" ? gcode(code) : "";
}

function setCookie(value) {
  const host = window.location.hostname;
  document.cookie = "googtrans=" + value + "; path=/";
  if (host.indexOf(".") > -1) document.cookie = "googtrans=" + value + "; path=/; domain=." + host;
}

function clearCookie() {
  const host = window.location.hostname;
  const gone = "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  document.cookie = "googtrans" + gone;
  document.cookie = "googtrans" + gone + "; domain=" + host;
  document.cookie = "googtrans" + gone + "; domain=." + host;
}

// Returns true only when it started a page reload.
function apply(code) {
  const want = wantedTarget(code);
  let have = targetOf(readCookie());
  if (have === "en") have = "";
  if (want === have) return false;
  try {
    const last = Number(sessionStorage.getItem("ys_gt_t") || 0);
    if (Date.now() - last < 4000) return false; // never loop
    sessionStorage.setItem("ys_gt_t", String(Date.now()));
  } catch {}
  if (want) setCookie("/en/" + want);
  else clearCookie();
  window.location.reload();
  return true;
}

// Google's translator swaps text nodes, which can make React throw. These two guards are the known workaround.
function patchDom() {
  if (window.__ysDomPatched) return;
  window.__ysDomPatched = true;
  const rc = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) return child;
    return rc.apply(this, arguments);
  };
  const ib = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (node, ref) {
    if (ref && ref.parentNode !== this) return node;
    return ib.apply(this, arguments);
  };
}

function loadWidget() {
  if (window.__ysGt) return;
  window.__ysGt = true;
  window.ysGtInit = function () {
    try {
      new window.google.translate.TranslateElement({ pageLanguage: "en", autoDisplay: false }, "ys-gt");
    } catch (e) {}
  };
  const s = document.createElement("script");
  s.src = "https://translate.google.com/translate_a/element.js?cb=ysGtInit";
  s.async = true;
  document.body.appendChild(s);
}

function start(code) {
  if (apply(code)) return;
  if (wantedTarget(code)) {
    patchDom();
    loadWidget();
  }
}

export default function LangTranslate() {
  useEffect(() => {
    let stored = "en";
    try {
      stored = localStorage.getItem("ys_lang") || "en";
    } catch {}
    start(stored);
    const on = (e) => start((e && e.detail) || "en");
    window.addEventListener("ys-lang", on);
    return () => window.removeEventListener("ys-lang", on);
  }, []);

  return (
    <>
      <style>{css}</style>
      <div id="ys-gt" translate="no" style={{ position: "fixed", left: -9999, top: 0 }} />
    </>
  );
}
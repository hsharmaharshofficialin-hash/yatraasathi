const SHELL = [
  "/",
  "/ask",
  "/arena",
  "/demo",
  "/itinerary",
  "/sos",
  "/phrases",
  "/crowd",
  "/ledger",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("yatrasathi-shell-v1").then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "cache-shell") {
    event.waitUntil(caches.open("yatrasathi-shell-v1").then((cache) => cache.addAll(SHELL)));
  }
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open("yatrasathi-runtime-v1").then((cache) => cache.put(req, copy));
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || caches.match("/"))),
  );
});

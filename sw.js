/* Schita service worker.
 * Update strategy: network-first (3 s timeout) so a fresh deploy shows up as soon as the
 * device is online; the cache is only the offline fallback. A new VERSION creates a new
 * cache; pwa.js shows an "update" toast and sends SKIP_WAITING, the old caches are deleted
 * on activate. Same-origin GET requests only. */

// must match APP_VERSION in index.html — bump both on every release
const VERSION = "1.0.0";
const CACHE = `schita-${VERSION}`;
const NETWORK_TIMEOUT_MS = 3000;

// Without these the app cannot start offline -> install fails if they fail.
const CRITICAL = ["./", "index.html"];
// Everything else: added one by one, a missing file does not break the install.
// When you add a lesson, add its path here too.
const OPTIONAL = [
  "lessons/index.js",
  "lessons/fox-01.js",
  "future/ai-lessons.js",
  "future/ai-feedback.js",
  "future/camera-overlay.js",
  "pwa/pwa.js",
  "pwa/manifest.webmanifest",
  "icons/icon.svg",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "icons/apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(CRITICAL);
    await Promise.allSettled(OPTIONAL.map((url) => cache.add(url)));
    // No skipWaiting() here: the page asks for it via the toast (SKIP_WAITING message).
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(
      names.filter((n) => n.startsWith("schita-") && n !== CACHE).map((n) => caches.delete(n))
    );
    await self.clients.claim();
  })());
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(networkFirst(req));
});

async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), NETWORK_TIMEOUT_MS);
  try {
    const res = await fetch(req, { signal: controller.signal });
    clearTimeout(timer);
    if (res && res.status === 200 && res.type === "basic") {
      cache.put(req, res.clone()).catch(() => {});
    }
    return res;
  } catch (err) {
    clearTimeout(timer);
    const hit = await cache.match(req, { ignoreSearch: true });
    if (hit) return hit;
    if (req.mode === "navigate") {
      const page = (await cache.match("index.html")) || (await cache.match("./"));
      if (page) return page;
    }
    return new Response("Offline", { status: 503, statusText: "Offline" });
  }
}

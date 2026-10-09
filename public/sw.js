// Service worker léger : lecture hors connexion des pages déjà visitées.
// Pages : réseau d'abord, copie en cache ; sans réseau, la copie, sinon la page « hors connexion ».
// Ressources (CSS, JS, polices, images) : cache d'abord. Les PDF et les pages du magazine ne sont pas
// mis en cache d'office (trop lourds pour un forfait mobile), seulement s'ils ont été consultés.
const PAGES = 'pages-v1';
const ASSETS = 'assets-v1';
const OFFLINE = '/hors-ligne/';
const PRECACHE = [OFFLINE, '/publications/comment-dieu-guerit-les-coeurs-brises/extrait/'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(PAGES).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => ![PAGES, ASSETS].includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;

  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) { const copy = res.clone(); caches.open(PAGES).then((c) => c.put(req, copy)); }
          return res;
        })
        .catch(async () => (await caches.match(req, { ignoreSearch: true })) || (await caches.match(OFFLINE)))
    );
    return;
  }

  if (url.pathname.endsWith('.pdf')) return; // laissé au navigateur

  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      if (res.ok && (url.pathname.startsWith('/_astro/') || url.pathname.startsWith('/magazine/') || /\.(woff2|png|jpg|webp|svg)$/.test(url.pathname))) {
        const copy = res.clone(); caches.open(ASSETS).then((c) => c.put(req, copy));
      }
      return res;
    }))
  );
});

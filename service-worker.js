/* Service Worker — هيئة محبي الحسين
   • ملفات البرنامج (html/js/css): الشبكة أولاً ← التحديث يصل فوراً
   • الصور والأيقونات: الذاكرة أولاً ← سرعة في الفتح
   • طلبات Firebase والخطوط: تمر مباشرة بلا تخزين ← لا تتعطّل المزامنة
   • بلا إنترنت: يرجع لآخر نسخة مخزّنة تلقائياً
*/
const CACHE = 'husain-v4';

const APP_SHELL = [
  './',
  './index.html',
  './app.js',
  './assets.js',
  './cloud.js',
  './manifest.json'
];

/* الملفات الساكنة التي نادراً ما تتغيّر */
const STATIC_RE = /\.(png|jpe?g|gif|svg|webp|ico|woff2?|ttf|otf)$/i;

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(APP_SHELL.map(a => c.add(a))))
      .then(() => self.skipWaiting())          // النسخة الجديدة تعمل فوراً
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())        // تتحكّم بكل الصفحات المفتوحة
  );
});

self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch (_) { return; }

  /* طلبات خارجية (Firebase / خطوط Google) — لا نتدخّل إطلاقاً */
  if (url.origin !== self.location.origin) return;

  /* الصور والأيقونات والخطوط — الذاكرة أولاً */
  if (STATIC_RE.test(url.pathname)) {
    e.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      }))
    );
    return;
  }

  /* ملفات البرنامج والصفحات — الشبكة أولاً، والذاكرة احتياط عند انقطاع الإنترنت */
  e.respondWith(
    fetch(req)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then(c => c || caches.match('./index.html')))
  );
});

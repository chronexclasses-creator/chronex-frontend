// ✅ Versioned cache name (V11 e upgrade kora holo jate purono cache clear hoye jay)
const CACHE_NAME = 'chronex-cache-v11'; 

// ✅ Core files to pre-cache (Tor notun update kora file er list)
const urlsToCache = [
  './index.html',
  './setup.html',             // Notun form page
  './home.html',
  './study.html',
  './chapters.html',
  './lectures.html',
  './arko-master-panel.html', // Tor notun secure admin page
  './Resources.html',
  './Courses.html',
  './Contact.html',
  './firebase-setup.js',
  './manifest.json',
  './Logo_2.png' 
];

// ✅ Install Service Worker and cache essential files
self.addEventListener('install', (event) => {
  console.log('📦 Installing service worker and caching app shell...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// ✅ Fetch requests
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // 🔥 BULLETPROOF BYPASS FOR RENDER API, FIREBASE & AUTH REDIRECTS 🔥
  // Ei link gulo kokhono cache hobe na, always live database theke asbe
  if (
      req.method !== 'GET' || 
      url.hostname.includes('googleapis.com') || 
      url.hostname.includes('gstatic.com') ||
      url.hostname.includes('firebase') ||
      url.hostname.includes('onrender.com') || // <-- NOTUN: Tor Custom Backend bypass
      url.pathname.startsWith('/__/') 
  ) {
      return; // Skip Service Worker, direct network call
  }

  // HTML page gulor jonno: Network First (Aage internet theke notun design anbe, fail korle cache theke anbe)
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith(
      fetch(req)
        .then((networkRes) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, networkRes.clone());
            return networkRes;
          });
        })
        .catch(() => {
          return caches.match(req, { ignoreSearch: true }).then((cachedRes) => {
            return cachedRes || caches.match('./index.html');
          });
        })
    );
    return;
  }

  // Static Assets (Chobi, CSS, JS) er jonno: Cache First (Aage memory theke anbe, jate fast load hoy)
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cachedRes) => {
      return cachedRes || fetch(req).then((networkRes) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(req, networkRes.clone());
          return networkRes;
        });
      });
    })
  );
});

// ✅ Activate new service worker and remove old caches
self.addEventListener('activate', (event) => {
  console.log('♻️ Activating new service worker and clearing old data...');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

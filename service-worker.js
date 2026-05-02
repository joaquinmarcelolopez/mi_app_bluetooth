const CACHE_NAME = 'v1-rn9-lora';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://unpkg.com/dexie/dist/dexie.js'
];

// Instalación: Guardar archivos en caché
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Activación: Limpiar cachés viejas
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

// Estrategia: Primero buscar en internet, si falla, usar caché
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

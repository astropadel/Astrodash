/* AstroDash · avisos push. No cachea nada: solo muestra los avisos y abre la app al tocarlos. */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('push', function (e) {
  var d = {}; try { d = e.data ? e.data.json() : {}; } catch (x) { d = { body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Astro Padel', { body: d.body || '', icon: 'icon-192.png', badge: 'icon-192.png', tag: 'astro-envios', renotify: true, data: { url: d.url || './' } }));
});
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var u = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (cs) {
    for (var i = 0; i < cs.length; i++) { if ('focus' in cs[i]) { cs[i].focus(); if ('navigate' in cs[i]) { try { cs[i].navigate(u); } catch (x) { /* sigue */ } } return; } }
    return self.clients.openWindow(u);
  }));
});

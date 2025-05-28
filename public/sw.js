self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'Bildirim', {
      body: data.body || '',
      icon: '/logo.png'
    })
  );
}); 
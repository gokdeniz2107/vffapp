// Eventleri localStorage'da sakla
export function saveEvent(event) {
  const events = getEvents();
  events.push({...event, id: Date.now()});
  localStorage.setItem('events', JSON.stringify(events));
}

// Tüm eventleri getir
export function getEvents() {
  const events = localStorage.getItem('events');
  return events ? JSON.parse(events) : [];
}

// Eventi güncelle
export function updateEvent(id, event) {
  const events = getEvents();
  const index = events.findIndex(e => e.id === id);
  if (index !== -1) {
    events[index] = {...event, id};
    localStorage.setItem('events', JSON.stringify(events));
  }
}

// Eventi sil
export function deleteEvent(id) {
  const events = getEvents();
  const filteredEvents = events.filter(e => e.id !== id);
  localStorage.setItem('events', JSON.stringify(filteredEvents));
}

// Belirli bir tarih için eventleri getir
export function getEventsForDate(date) {
  const events = getEvents();
  return events.filter(e => e.date === date);
}

// Event hatırlatma zamanı geldi mi kontrol et
export function checkEventReminder(event) {
  const now = new Date();
  const eventDate = new Date(`${event.date}T${event.time}`);
  const reminderDate = new Date(eventDate.getTime() - (parseInt(event.reminderTime) * 60000));
  
  return now.getTime() >= reminderDate.getTime() && now.getTime() < eventDate.getTime();
}

// Yaklaşan eventleri getir (bugün ve yarın)
export function getUpcomingEvents() {
  const events = getEvents();
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  
  return events.filter(e => e.date === today || e.date === tomorrow);
} 
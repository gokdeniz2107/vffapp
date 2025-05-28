// Hatırlatıcıları localStorage'da sakla
export function saveReminder(reminder) {
  const reminders = getReminders();
  reminders.push(reminder);
  localStorage.setItem('reminders', JSON.stringify(reminders));
}

// Tüm hatırlatıcıları getir
export function getReminders() {
  const reminders = localStorage.getItem('reminders');
  return reminders ? JSON.parse(reminders) : [];
}

// Hatırlatıcıyı güncelle
export function updateReminder(index, reminder) {
  const reminders = getReminders();
  reminders[index] = reminder;
  localStorage.setItem('reminders', JSON.stringify(reminders));
}

// Hatırlatıcıyı sil
export function deleteReminder(index) {
  const reminders = getReminders();
  reminders.splice(index, 1);
  localStorage.setItem('reminders', JSON.stringify(reminders));
}

// Belirli bir gün için hatırlatıcıları getir
export function getRemindersForDay(day) {
  const reminders = getReminders();
  return reminders.filter(r => r.repeatDays.includes(day));
}

// Hatırlatıcı zamanı geldi mi kontrol et
export function checkReminderTime(reminder) {
  const now = new Date();
  const [hours, minutes] = reminder.time.split(':').map(Number);
  const reminderTime = new Date();
  reminderTime.setHours(hours, minutes, 0, 0);
  
  return now.getHours() === hours && now.getMinutes() === minutes;
}

export function addNotification(notification) {
  const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
  notifications.unshift({ ...notification, id: Date.now(), read: false });
  localStorage.setItem('notifications', JSON.stringify(notifications));
} 
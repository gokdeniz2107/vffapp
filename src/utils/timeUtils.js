export function isMorning() {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 12;
}
export function isEvening() {
  const hour = new Date().getHours();
  return hour >= 18 && hour < 22;
} 
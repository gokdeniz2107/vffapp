// OpenWeatherMap API'den hava durumu çek
export async function getWeather(city = 'Istanbul') {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=tr`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Hava durumu alınamadı');
  return await res.json();
} 
import React, { useState, useEffect } from 'react';
import './NewsWeather.css';

const NewsWeather = () => {
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/weather');
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error('Weather fetch error:', error);
      }
    };

    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('News fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    fetchNews();
  }, []);

  if (loading) {
    return <div className="loading">Yükleniyor...</div>;
  }

  return (
    <div className="news-weather">
      {weather && (
        <div className="weather-card">
          <h3>Hava Durumu</h3>
          <div className="weather-info">
            <img
              src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description}
            />
            <div className="weather-details">
              <span className="temperature">{Math.round(weather.temp)}°C</span>
              <span className="description">{weather.description}</span>
              <span className="location">{weather.location}</span>
            </div>
          </div>
        </div>
      )}

      <div className="news-card">
        <h3>Günün Haberleri</h3>
        <div className="news-list">
          {news.map((item, index) => (
            <div key={index} className="news-item">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                Devamını Oku
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsWeather; 
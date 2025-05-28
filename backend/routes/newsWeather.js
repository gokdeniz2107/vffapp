const express = require('express');
const router = express.Router();
const axios = require('axios');

// Weather API configuration
const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// News API configuration
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_BASE_URL = 'https://newsapi.org/v2/top-headlines';

// Get weather data
router.get('/weather', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const response = await axios.get(WEATHER_BASE_URL, {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
        units: 'metric',
        lang: 'tr'
      }
    });

    const weatherData = {
      temp: response.data.main.temp,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      location: response.data.name
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Weather API Error:', error);
    res.status(500).json({ error: 'Weather data fetch failed' });
  }
});

// Get news data
router.get('/news', async (req, res) => {
  try {
    const response = await axios.get(NEWS_BASE_URL, {
      params: {
        country: 'tr',
        apiKey: NEWS_API_KEY,
        pageSize: 5
      }
    });

    const newsData = response.data.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url
    }));

    res.json(newsData);
  } catch (error) {
    console.error('News API Error:', error);
    res.status(500).json({ error: 'News data fetch failed' });
  }
});

module.exports = router; 
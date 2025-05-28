import React, { useState } from 'react';
import ReminderModal from './ReminderModal';
import { saveReminder } from '../utils/reminderUtils';
import { useNavigate } from 'react-router-dom';
import { getWeather } from '../utils/weather';
import { getNews } from '../utils/news';

const morningQuestions = [
  "What time should I wake you up?",
  "Would you like to listen to the news today?",
  "Would you like to hear your to-do list?",
  "Are you a morning person?"
];
const eveningQuestions = [
  "How was your day?",
  "Shall we keep a diary together?",
  "Would you like to plan tomorrow?",
  "Would you like me to remind you of an upcoming event?"
];

const DeepConvoModal = ({ mode, onClose }) => {
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [showNews, setShowNews] = useState(false);
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState(null);
  const [newsCountry, setNewsCountry] = useState('tr');
  const [newsCategory, setNewsCategory] = useState('general');
  const [weatherCity, setWeatherCity] = useState('Istanbul');
  const navigate = useNavigate();

  const handleMorningQuestionClick = (question) => {
    if (question === "What time should I wake you up?") {
      setShowReminderModal(true);
    } else if (question === "Would you like to listen to the news today?") {
      setShowNews(true);
      setShowWeather(false);
    } else if (question === "Would you like to hear your to-do list?") {
      navigate('/route');
      onClose();
    } else if (question === "Are you a morning person?") {
      navigate('/chat', { state: { initialPrompt: "Are you a morning person?" } });
      onClose();
    }
  };

  const handleReminderSave = (reminder) => {
    saveReminder(reminder);
    setShowReminderModal(false);
  };

  const handleWeather = async () => {
    setShowWeather(true);
    setWeather(null);
    try {
      const data = await getWeather(weatherCity);
      setWeather(data);
    } catch (e) {
      setWeather({ error: 'Hava durumu alınamadı.' });
    }
  };
  const handleNews = async () => {
    setShowNews(true);
    setNews(null);
    try {
      const data = await getNews(newsCountry, newsCategory);
      setNews(data);
    } catch (e) {
      setNews({ error: 'Haberler alınamadı.' });
    }
  };

  return (
    <>
      <div className="modal" style={{background:'rgba(104,68,233,0.85)',borderRadius:20,padding:32,maxWidth:400,margin:'0 auto',color:'#fff',boxShadow:'0 4px 32px #0008',position:'fixed',top:'20%',left:'50%',transform:'translateX(-50%)',zIndex:1000}}>
        <h2 style={{fontSize:28,marginBottom:16}}>{mode === 'morning' ? "Good morning!" : "Good evening!"}</h2>
        <div style={{marginBottom:16,display:'flex',gap:12,flexWrap:'wrap'}}>
          <button onClick={()=>setShowWeather(v=>!v)} style={{background:'#251C35',color:'#FFD600',border:'2px solid #FFD600',borderRadius:8,padding:'8px 16px',fontWeight:600,fontSize:15,cursor:'pointer'}}>Weather</button>
          <button onClick={()=>setShowNews(v=>!v)} style={{background:'#251C35',color:'#6844E9',border:'2px solid #6844E9',borderRadius:8,padding:'8px 16px',fontWeight:600,fontSize:15,cursor:'pointer'}}>News</button>
        </div>
        {showWeather && (
          <div style={{marginBottom:16}}>
            <input value={weatherCity} onChange={e=>setWeatherCity(e.target.value)} placeholder="Şehir" style={{background:'#181024',color:'#fff',border:'1px solid #6844E9',borderRadius:8,padding:'6px 12px',marginBottom:8}} />
            <button onClick={handleWeather} style={{marginLeft:8,background:'#6844E9',color:'#fff',border:'none',borderRadius:8,padding:'6px 16px',fontWeight:600,cursor:'pointer'}}>Göster</button>
            {weather && (
              weather.error ? <div style={{color:'#FFD600',marginTop:8}}>{weather.error}</div> :
              <div style={{marginTop:8}}>
                <div style={{fontSize:18,fontWeight:600}}>{weather.name} - {weather.weather[0].description}</div>
                <div style={{fontSize:16}}>{Math.round(weather.main.temp)}°C, {weather.weather[0].main}</div>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" style={{width:48}} />
              </div>
            )}
          </div>
        )}
        {showNews && (
          <div style={{marginBottom:16}}>
            <div style={{display:'flex',gap:8,marginBottom:8}}>
              <input value={newsCountry} onChange={e=>setNewsCountry(e.target.value)} placeholder="Ülke kodu (tr,us,gb...)" style={{background:'#181024',color:'#fff',border:'1px solid #6844E9',borderRadius:8,padding:'6px 12px'}} />
              <input value={newsCategory} onChange={e=>setNewsCategory(e.target.value)} placeholder="Kategori (general, business...)" style={{background:'#181024',color:'#fff',border:'1px solid #6844E9',borderRadius:8,padding:'6px 12px'}} />
              <button onClick={handleNews} style={{background:'#6844E9',color:'#fff',border:'none',borderRadius:8,padding:'6px 16px',fontWeight:600,cursor:'pointer'}}>Göster</button>
            </div>
            {news && (
              news.error ? <div style={{color:'#FFD600'}}>{news.error}</div> :
              <div style={{maxHeight:120,overflowY:'auto'}}>
                {news.articles && news.articles.slice(0,5).map((a,i)=>(
                  <div key={i} style={{marginBottom:6,fontSize:15}}>
                    <b>{a.title}</b>
                    <div style={{fontSize:13,opacity:0.7}}>{a.source.name}</div>
                    {a.url && (
                      <a
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#FFD600',
                          fontSize: 13,
                          textDecoration: 'underline',
                          marginTop: 4,
                          display: 'inline-block'
                        }}
                      >
                        Devamını Oku
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {mode === 'morning' && (
          <ul style={{marginBottom:24}}>
            {[
              "What time should I wake you up?",
              "Would you like to listen to the news today?",
              "Would you like to hear your to-do list?",
              "Are you a morning person?"
            ].map(q => (
              <li
                key={q}
                style={{
                  marginBottom:8,
                  fontSize:18,
                  cursor:'pointer',
                  padding:'8px 12px',
                  borderRadius:8,
                  transition:'background 0.2s'
                }}
                onClick={() => handleMorningQuestionClick(q)}
                onMouseOver={e => e.currentTarget.style.background = '#251C35'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >
                {q}
              </li>
            ))}
          </ul>
        )}
        <button 
          onClick={onClose} 
          style={{
            background:'#6844E9',
            color:'#fff',
            border:'none',
            borderRadius:8,
            padding:'10px 24px',
            fontSize:16,
            fontWeight:600,
            cursor:'pointer'
          }}
        >
          Close
        </button>
      </div>
      {showReminderModal && (
        <ReminderModal 
          onClose={() => setShowReminderModal(false)}
          onSave={handleReminderSave}
          initialTime={mode === 'morning' ? '08:00' : '20:00'}
        />
      )}
    </>
  );
};

export default DeepConvoModal; 
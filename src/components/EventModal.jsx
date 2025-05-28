import React, { useState } from 'react';

const EventModal = ({ onClose, onSave, initialEvent = null }) => {
  const [title, setTitle] = useState(initialEvent?.title || '');
  const [date, setDate] = useState(initialEvent?.date || '');
  const [time, setTime] = useState(initialEvent?.time || '');
  const [location, setLocation] = useState(initialEvent?.location || '');
  const [description, setDescription] = useState(initialEvent?.description || '');
  const [reminderTime, setReminderTime] = useState(initialEvent?.reminderTime || '30'); // dakika cinsinden

  const reminderOptions = [
    { value: '5', label: '5 dakika önce' },
    { value: '15', label: '15 dakika önce' },
    { value: '30', label: '30 dakika önce' },
    { value: '60', label: '1 saat önce' },
    { value: '1440', label: '1 gün önce' }
  ];

  return (
    <div className="modal" style={{background:'#181024cc',borderRadius:20,padding:32,maxWidth:400,margin:'0 auto',color:'#fff',boxShadow:'0 4px 32px #0008',position:'fixed',top:'20%',left:'50%',transform:'translateX(-50%)',zIndex:1000}}>
      <h2 style={{fontSize:28,marginBottom:16}}>{initialEvent ? 'Etkinliği Düzenle' : 'Yeni Etkinlik'}</h2>
      
      <div style={{marginBottom:16}}>
        <label style={{display:'block',marginBottom:8,fontSize:16}}>Başlık</label>
        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Etkinlik başlığı"
          style={{
            background:'#251C35',
            border:'2px solid #6844E9',
            borderRadius:8,
            padding:'8px 12px',
            color:'#fff',
            fontSize:16,
            width:'100%'
          }}
        />
      </div>

      <div style={{marginBottom:16}}>
        <label style={{display:'block',marginBottom:8,fontSize:16}}>Tarih</label>
        <input 
          type="date" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            background:'#251C35',
            border:'2px solid #6844E9',
            borderRadius:8,
            padding:'8px 12px',
            color:'#fff',
            fontSize:16,
            width:'100%'
          }}
        />
      </div>

      <div style={{marginBottom:16}}>
        <label style={{display:'block',marginBottom:8,fontSize:16}}>Saat</label>
        <input 
          type="time" 
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{
            background:'#251C35',
            border:'2px solid #6844E9',
            borderRadius:8,
            padding:'8px 12px',
            color:'#fff',
            fontSize:16,
            width:'100%'
          }}
        />
      </div>

      <div style={{marginBottom:16}}>
        <label style={{display:'block',marginBottom:8,fontSize:16}}>Konum</label>
        <input 
          type="text" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Etkinlik konumu"
          style={{
            background:'#251C35',
            border:'2px solid #6844E9',
            borderRadius:8,
            padding:'8px 12px',
            color:'#fff',
            fontSize:16,
            width:'100%'
          }}
        />
      </div>

      <div style={{marginBottom:16}}>
        <label style={{display:'block',marginBottom:8,fontSize:16}}>Açıklama</label>
        <textarea 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Etkinlik detayları"
          style={{
            background:'#251C35',
            border:'2px solid #6844E9',
            borderRadius:8,
            padding:'8px 12px',
            color:'#fff',
            fontSize:16,
            width:'100%',
            minHeight:100,
            resize:'vertical'
          }}
        />
      </div>

      <div style={{marginBottom:24}}>
        <label style={{display:'block',marginBottom:8,fontSize:16}}>Hatırlatma Zamanı</label>
        <select 
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          style={{
            background:'#251C35',
            border:'2px solid #6844E9',
            borderRadius:8,
            padding:'8px 12px',
            color:'#fff',
            fontSize:16,
            width:'100%'
          }}
        >
          {reminderOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div style={{display:'flex',gap:12,justifyContent:'flex-end'}}>
        <button 
          onClick={onClose}
          style={{
            background:'#251C35',
            color:'#fff',
            border:'2px solid #6844E9',
            borderRadius:8,
            padding:'10px 24px',
            fontSize:16,
            fontWeight:600,
            cursor:'pointer'
          }}
        >
          İptal
        </button>
        <button 
          onClick={() => onSave({ title, date, time, location, description, reminderTime })}
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
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default EventModal; 
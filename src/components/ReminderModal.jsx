import React, { useState } from 'react';

const ReminderModal = ({ onClose, onSave, initialTime = '08:00', initialEnabled = true }) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState(initialTime);
  const [enabled, setEnabled] = useState(initialEnabled);
  const [repeatDays, setRepeatDays] = useState(['monday', 'wednesday', 'friday']);

  const days = [
    { id: 'monday', label: 'Pzt' },
    { id: 'tuesday', label: 'Sal' },
    { id: 'wednesday', label: 'Çar' },
    { id: 'thursday', label: 'Per' },
    { id: 'friday', label: 'Cum' },
    { id: 'saturday', label: 'Cmt' },
    { id: 'sunday', label: 'Paz' }
  ];

  const toggleDay = (day) => {
    setRepeatDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  return (
    <div className="modal" style={{background:'#181024cc',borderRadius:20,padding:32,maxWidth:400,margin:'0 auto',color:'#fff',boxShadow:'0 4px 32px #0008',position:'fixed',top:'20%',left:'50%',transform:'translateX(-50%)',zIndex:1000}}>
      <h2 style={{fontSize:28,marginBottom:16}}>Hatırlatıcı Ayarla</h2>
      
      <div style={{marginBottom:24}}>
        <label style={{display:'block',marginBottom:8,fontSize:16}}>Başlık</label>
        <input 
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Hatırlatıcı başlığı (örn: Su iç, Toplantı...)"
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

      <div style={{marginBottom:24}}>
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

      <div style={{marginBottom:24}}>
        <label style={{display:'block',marginBottom:8,fontSize:16}}>Tekrar Günleri</label>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          {days.map(day => (
            <button
              key={day.id}
              onClick={() => toggleDay(day.id)}
              style={{
                background: repeatDays.includes(day.id) ? '#6844E9' : '#251C35',
                border:'2px solid #6844E9',
                borderRadius:8,
                padding:'8px 12px',
                color:'#fff',
                fontSize:14,
                cursor:'pointer'
              }}
            >
              {day.label}
            </button>
          ))}
        </div>
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
          onClick={() => onSave({ title, time, enabled, repeatDays })}
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

export default ReminderModal; 
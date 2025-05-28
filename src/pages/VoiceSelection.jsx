import React, { useState, useEffect } from 'react';

const VoiceSelection = ({ onSelect }) => {
  const [voices, setVoices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    // ElevenLabs backend'den ses listesini çek
    const fetchVoices = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/voices');
        const data = await res.json();
        setVoices(data.voices || []);
      } catch (err) {
        setVoices([]);
      }
      setLoading(false);
    };
    fetchVoices();
  }, []);

  const playSample = async (voice) => {
    setPlayingId(voice.voice_id);
    try {
      const res = await fetch(`/api/voice-sample/${voice.voice_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: voice.preview_text || 'Merhaba! Ben bu şekilde konuşuyorum.' })
      });
      const audioBlob = await res.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.onended = () => setPlayingId(null);
      audio.play();
    } catch (err) {
      setPlayingId(null);
      alert('Ses örneği alınamadı!');
    }
  };

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ color: '#fff', fontSize: 24, marginBottom: 24 }}>Bir ses seçin</h2>
      {loading ? (
        <div style={{ color: '#fff', fontSize: 18 }}>Sesler yükleniyor...</div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 24,
          overflowX: 'auto',
          width: '100%',
          justifyContent: 'center',
          paddingBottom: 16,
          scrollbarWidth: 'thin',
        }}>
          {voices.slice(0, 5).map((voice) => (
            <div
              key={voice.voice_id}
              onClick={() => setSelected(voice)}
              style={{
                background: selected?.voice_id === voice.voice_id ? 'linear-gradient(135deg, #6844E9 60%, #A084E8 100%)' : '#181024',
                color: '#fff',
                borderRadius: 20,
                boxShadow: selected?.voice_id === voice.voice_id ? '0 4px 24px #6844E966' : '0 2px 8px #0004',
                padding: 24,
                minWidth: 160,
                minHeight: 160,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                border: selected?.voice_id === voice.voice_id ? '3px solid #fff' : '2px solid #6844E9',
                transition: 'all 0.2s',
                flex: '0 0 180px',
                marginBottom: 8,
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>{voice.labels?.accent || '🗣️'}</div>
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>{voice.name}</div>
              <button
                style={{
                  background: '#fff',
                  color: '#6844E9',
                  border: 'none',
                  borderRadius: 8,
                  padding: '4px 12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  marginBottom: 8,
                  opacity: playingId === voice.voice_id ? 0.6 : 1
                }}
                disabled={playingId === voice.voice_id}
                onClick={e => { e.stopPropagation(); playSample(voice); }}
              >
                {playingId === voice.voice_id ? 'Çalıyor...' : 'Örnek Dinle'}
              </button>
            </div>
          ))}
        </div>
      )}
      <button
        disabled={!selected}
        onClick={() => onSelect(selected)}
        style={{
          marginTop: 32,
          background: selected ? 'linear-gradient(90deg, #6844E9 60%, #A084E8 100%)' : '#888',
          color: '#fff',
          border: 'none',
          borderRadius: 12,
          padding: '12px 32px',
          fontSize: 18,
          fontWeight: 600,
          cursor: selected ? 'pointer' : 'not-allowed',
          boxShadow: selected ? '0 2px 12px #6844E966' : 'none',
          transition: 'all 0.2s',
        }}
      >
        Seç ve Devam Et
      </button>
    </div>
  );
};

export default VoiceSelection; 
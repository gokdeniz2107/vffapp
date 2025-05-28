import React, { useState, useEffect } from 'react';

const VOICE_OPTIONS = [
  { key: 'young_woman', label: 'Genç Kadın' },
  { key: 'old_man', label: 'Yaşlı Adam' },
  { key: 'young_man', label: 'Genç Erkek' },
  { key: 'child', label: 'Çocuk' },
  { key: 'mature_woman', label: 'Olgun Kadın' },
];

const PROMPTS = [
  'Let\'s make plans!',
  'How does it sound?',
  'What would you like to do next?',
  'Tell me your idea!',
];

function getBrowserVoice(voices, key) {
  if (!voices.length) return null;
  if (key === 'young_woman') return voices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('kadın'));
  if (key === 'old_man') return voices.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('adam'));
  if (key === 'young_man') return voices.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('erkek'));
  if (key === 'child') return voices.find(v => v.name.toLowerCase().includes('child') || v.name.toLowerCase().includes('çocuk'));
  if (key === 'mature_woman') return voices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('kadın'));
  return null;
}

const VoiceRecorder = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoiceKey, setSelectedVoiceKey] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [promptIndex, setPromptIndex] = useState(0);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const populateVoices = () => {
      setVoices(synth.getVoices());
    };
    populateVoices();
    synth.onvoiceschanged = populateVoices;

    // Seçilen sesi localStorage'dan al
    const preferredVoice = localStorage.getItem('preferredVoice');
    setSelectedVoiceKey(preferredVoice);
  }, []);

  useEffect(() => {
    if (voices.length && selectedVoiceKey) {
      setSelectedVoice(getBrowserVoice(voices, selectedVoiceKey));
    }
  }, [voices, selectedVoiceKey]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const rec = new window.webkitSpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'tr-TR';
      rec.onresult = (event) => {
        setTranscript(event.results[0][0].transcript);
      };
      rec.onend = () => setIsListening(false);
      setRecognition(rec);
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      setTranscript('');
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  // Eğer ses seçilmemişse uyarı göster
  if (!selectedVoiceKey) {
    return (
      <div style={{ color: '#fff', textAlign: 'center', marginTop: 80 }}>
        Lütfen önce onboarding sırasında bir ses seçin.
      </div>
    );
  }

  // Modern voice chat ekranı
  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 50% 30%, #22113A 0%, #181024 80%, #0B0612 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      {/* Prompt/AI mesajı */}
      <div style={{
        color: '#fff',
        fontSize: 28,
        fontWeight: 700,
        marginBottom: 48,
        textAlign: 'center',
        textShadow: '0 2px 16px #0008',
      }}>
        {PROMPTS[promptIndex % PROMPTS.length]}
      </div>
      {/* Mikrofon veya durdur butonu */}
      <div style={{
        position: 'relative',
        width: 160,
        height: 160,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
      }}>
        <button
          onMouseDown={startListening}
          onMouseUp={stopListening}
          onTouchStart={startListening}
          onTouchEnd={stopListening}
          style={{
            background: isListening ? 'linear-gradient(135deg, #6844E9 60%, #A084E8 100%)' : 'rgba(255,255,255,0.08)',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: 120,
            height: 120,
            fontSize: 48,
            boxShadow: isListening ? '0 0 32px #6844E966' : '0 2px 12px #0006',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            outline: 'none',
          }}
        >
          {isListening ? <span style={{fontSize: 48}}>⏸️</span> : <span style={{fontSize: 48}}>🎤</span>}
        </button>
        {/* Alt dalga efekti */}
        <div style={{
          position: 'absolute',
          bottom: -24,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 180,
          height: 60,
          background: 'radial-gradient(ellipse at 50% 100%, #6844E9 0%, rgba(104,68,233,0.0) 100%)',
          borderRadius: '50%',
          zIndex: 0,
          filter: 'blur(2px)',
        }} />
      </div>
      {/* Konuşma metni */}
      <div style={{
        marginTop: 48,
        minHeight: 40,
        color: '#fff',
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 500,
        letterSpacing: 0.5,
        textShadow: '0 2px 8px #0008',
      }}>
        {transcript}
      </div>
      {/* Alt bar */}
      <div style={{
        position: 'absolute',
        left: '50%',
        bottom: 24,
        transform: 'translateX(-50%)',
        width: 134,
        height: 5,
        background: 'rgba(255,255,255,0.7)',
        borderRadius: 8,
        opacity: 0.8,
      }} />
    </div>
  );
};

export default VoiceRecorder; 
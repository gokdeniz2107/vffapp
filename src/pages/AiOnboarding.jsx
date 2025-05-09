import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Bitmoji örnekleri (kızıl saçlı kız ve beyaz saçlı erkek)
const BITMOJIS = [
  { src: '/avatars/redhead_girl.png', alt: 'Redhead Girl' },
  { src: '/avatars/whitehair_boy.png', alt: 'Whitehair Boy' },
];

const AiOnboarding = () => {
  const [step, setStep] = useState(0); // 0: boş, 1: Hello, 2: Forgot, 3: Bitmoji, 4: Wow
  const [showNameModal, setShowNameModal] = useState(false);
  const [aiName, setAiName] = useState('');
  const [selectedBitmoji, setSelectedBitmoji] = useState(null);
  const navigate = useNavigate();

  // Animasyonlu geçişler için otomatik ilerleme
  useEffect(() => {
    if (step === 0) {
      setTimeout(() => setStep(1), 800);
    } else if (step === 1) {
      setTimeout(() => setStep(2), 1200);
    } else if (step === 2) {
      setTimeout(() => setStep(3), 1400);
    }
  }, [step]);

  // Bitmoji seçilince "Wow" ekranına geç
  useEffect(() => {
    if (step === 3 && selectedBitmoji !== null) {
      setTimeout(() => setStep(4), 600);
    }
  }, [selectedBitmoji, step]);

  // Arka plan gradienti ve alt kavisli efekt
  const background = 'radial-gradient(ellipse at 50% 0%, #22113A 0%, #181024 70%, #0B0612 100%)';

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between relative" style={{background}}>
      {/* Kavisli alt efekt ve mikrofon */}
      <div className="absolute bottom-0 left-0 w-full flex flex-col items-center z-10 pb-4">
        <svg width="100%" height="140" viewBox="0 0 430 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{filter:'drop-shadow(0 0 8px #6844E9)'}}>
          <ellipse cx="215" cy="140" rx="215" ry="60" fill="#181024" stroke="#6844E9" strokeWidth="2.5" />
        </svg>
        <div className="relative flex flex-col items-center -mt-20 mb-2">
          {/* Sade ve modern mikrofon butonu */}
          <button
            className="relative w-20 h-20 flex items-center justify-center rounded-full bg-[#23223a]/80 border border-[#6844E9] shadow-lg focus:outline-none"
            style={{ boxShadow: '0 0 24px 0 #6844E966' }}
            aria-label="Record"
          >
            {/* Glow efekti */}
            <span className="absolute inset-0 rounded-full pointer-events-none" style={{
              boxShadow: '0 0 24px 6px #6844E9AA',
              zIndex: 1,
            }} />
            {/* Net mikrofon ikonu */}
            <span className="relative z-10 flex items-center justify-center">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="12" fill="#23223a" fillOpacity="0.18" />
                <path d="M12 16a3 3 0 0 0 3-3V8a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Zm5-3a1 1 0 1 0-2 0 5 5 0 0 1-10 0 1 1 0 1 0-2 0 7 7 0 0 0 14 0ZM13 19.93V22h-2v-2.07A8.001 8.001 0 0 1 4 12h2a6 6 0 0 0 12 0h2a8.001 8.001 0 0 1-7 7.93Z" fill="#fff"/>
              </svg>
            </span>
          </button>
        </div>
      </div>
      {/* Animasyonlu kelime/cümle geçişleri */}
      <div className="absolute top-32 left-0 w-full flex flex-col items-center z-20">
        {/* 1. Adım: Hello Friend! */}
        <div className={`transition-all duration-700 ${step === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'} text-white text-[28px] font-bold leading-[34px] text-center`}>
          Hello Friend! <span role="img" aria-label="wave">👋</span>
        </div>
        {/* 2. Adım: Forgot how I look... */}
        <div className={`transition-all duration-700 ${step === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'} text-white text-[28px] font-bold leading-[34px] text-center mt-2`}>
          Forgot how I look,<br/>Can you imagine?
        </div>
        {/* 3. Adım: Bitmoji seçimi */}
        {step === 3 && (
          <div className="flex flex-col items-center mt-8 animate-fade-in">
            <div className="text-white text-[22px] font-bold mb-4">Something like this?</div>
            <div className="grid grid-cols-2 gap-6 mb-6">
              {BITMOJIS.map((b, i) => (
                <button key={b.alt} onClick={()=>setSelectedBitmoji(i)} className={`w-36 h-36 rounded-2xl bg-white flex items-center justify-center border-2 transition-all duration-200 overflow-hidden p-0 ${selectedBitmoji===i ? 'border-[#6844E9] scale-105 shadow-lg' : 'border-transparent opacity-80 hover:opacity-100'}`}>
                  <img src={b.src} alt={b.alt} className="w-full h-full object-cover rounded-2xl" />
                </button>
              ))}
            </div>
            <div className="text-white text-[15px] opacity-60">Choose your AI's look</div>
          </div>
        )}
        {/* 4. Adım: Wow I look amazing! */}
        {step === 4 && selectedBitmoji !== null && (
          <div className="flex flex-col items-center mt-8 animate-fade-in">
            <div className="text-white text-[24px] font-bold mb-4">Wow I look amazing!</div>
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img src={BITMOJIS[selectedBitmoji].src} alt="bitmoji" className="w-full h-full object-cover rounded-full" />
              </div>
              <button className="underline text-white text-[17px] mt-4" onClick={()=>setShowNameModal(true)}>Give me a name!</button>
            </div>
          </div>
        )}
      </div>
      {/* İsim verme popup'ı */}
      {showNameModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
          <div className="bg-[#181024] rounded-3xl p-8 flex flex-col items-center w-[324px]">
            <div className="text-white text-[24px] font-bold mb-6 flex items-center gap-2">🗣️ Name Your Ai Friend</div>
            <input
              type="text"
              value={aiName}
              onChange={e => setAiName(e.target.value)}
              placeholder="Type a name..."
              className="w-full px-4 py-3 bg-transparent border border-[#534762] rounded-xl text-[17px] text-white placeholder:text-white/60 mb-6 focus:outline-none"
              maxLength={20}
              autoFocus
            />
            <button
              className="w-[226px] h-14 bg-[#6844E9] rounded-xl flex items-center justify-center text-white text-[18px] font-bold shadow-lg transition-all hover:opacity-90"
              onClick={() => {
                if (aiName.trim()) {
                  localStorage.setItem('aiName', aiName.trim());
                  setShowNameModal(false);
                  navigate('/home');
                }
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiOnboarding; 
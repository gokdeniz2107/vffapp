import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const icons = {
  chat: (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="6" stroke="#B6B0C2" strokeWidth="1.5"/><path d="M8 10h8M8 14h5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
  todo: (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="6" stroke="#B6B0C2" strokeWidth="1.5"/>
      <circle cx="7.5" cy="7.5" r="2" fill="#B6B0C2" stroke="#fff" strokeWidth="1.2" />
      <circle cx="16.5" cy="16.5" r="2" fill="#B6B0C2" stroke="#fff" strokeWidth="1.2" />
      <path d="M7.5 7.5C10 12 14 10 16.5 16.5" stroke="#fff" strokeWidth="1.5" fill="none"/>
      <path d="M15.2 15.7l1.3 0.8-0.8 1.3" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  mic: (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="6" stroke="#B6B0C2" strokeWidth="1.5"/>
      <rect x="7" y="9" width="2" height="6" rx="1" fill="#B6B0C2" />
      <rect x="10" y="7" width="2" height="10" rx="1" fill="#B6B0C2" />
      <rect x="13" y="9" width="2" height="6" rx="1" fill="#B6B0C2" />
      <rect x="16" y="11" width="2" height="2" rx="1" fill="#B6B0C2" />
    </svg>
  ),
  image: (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="6" stroke="#B6B0C2" strokeWidth="1.5"/><rect x="7" y="13" width="10" height="4" rx="2" fill="#fff" fillOpacity="0.7"/><circle cx="12" cy="10" r="2" fill="#fff" fillOpacity="0.7"/></svg>
  ),
};

const Home = () => {
  const [aiName, setAiName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem('aiName') || 'Friend';
    setAiName(name);
  }, []);

  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-gradient-to-b from-[#1A0820] via-[#12001A] to-[#090013] flex flex-col items-center font-inter pb-24">
      {/* Header */}
      <div className="w-full max-w-md mx-auto flex flex-col gap-6 px-4 pt-6">
        <div className="flex items-center justify-between w-full">
          <div className="w-12 h-12 rounded-2xl border border-[#4C3591] bg-gradient-to-br from-[#352071] to-[#140923] flex items-center justify-center shadow-[0_2px_12px_0_rgba(104,68,233,0.15)]">
            <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain" />
          </div>
          <div className="w-12 h-12 rounded-2xl border border-[#4C3591] bg-gradient-to-br from-[#352071] to-[#140923] flex items-center justify-center shadow-[0_2px_12px_0_rgba(104,68,233,0.15)] cursor-pointer" onClick={() => navigate('/notifications', { state: { from: window.location.pathname } })}>
            {/* Bildirim ikonu */}
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2Zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2Z" fill="#fff" fillOpacity="0.7"/></svg>
          </div>
        </div>
        {/* Welcome */}
        <div className="flex flex-col gap-1 mt-2">
          <div className="text-white text-[20px] font-bold leading-[30px]">👋 Welcome, {aiName}!</div>
          <div className="text-[#D2D6DB] text-[15px] leading-[22px]">Ask me anything, or choose a quick action below!</div>
        </div>
        {/* Deep conversation mode */}
        <div className="w-full bg-[#3B257F] rounded-xl flex items-center gap-5 px-6 py-8 mt-2">
          <div className="w-16 h-16 rounded-full bg-[#F7D5E8]" />
          <div className="flex flex-col gap-2">
            <div className="text-white text-[18px] font-bold leading-[27px]">Deep conversation mode 🚀</div>
            <div className="text-white text-[15px] leading-[22px]">{aiName} know's more about you, Always wants to hangout.</div>
          </div>
        </div>
        {/* Quick actions grid */}
        <div className="w-full grid grid-cols-2 gap-4 mt-4">
          {/* Chat */}
          <div
            className="relative bg-[#181024] rounded-2xl border border-[#2B2433] shadow-[0_2px_12px_0_rgba(104,68,233,0.08)] flex flex-col justify-between p-5 min-h-[112px] overflow-visible cursor-pointer hover:border-[#6844E9] transition-colors"
            onClick={() => navigate('/chat')}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="w-10 h-10 flex items-center justify-center">{icons.chat}</span>
              <span className="text-white text-[18px] font-bold">Chat</span>
            </div>
            <span className="text-white text-[16px] font-medium mt-2">Get started</span>
            {/* Sağ alt köşe çentiği */}
            <div className="absolute right-[-18px] bottom-[-18px] w-9 h-9 bg-[#181024] rounded-br-[32px] z-10"></div>
            {/* Mor ok kutusu */}
            <span className="absolute right-[-18px] bottom-[-18px] w-9 h-9 bg-[#6844E9] rounded-xl flex items-center justify-center shadow-[0_2px_8px_0_rgba(104,68,233,0.18)] z-20">
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M7 13L13 7M13 7H8M13 7V12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </div>
          {/* To do guide */}
          <div className="relative bg-[#181024] rounded-2xl border border-[#2B2433] shadow-[0_2px_12px_0_rgba(104,68,233,0.08)] flex flex-col justify-between p-5 min-h-[112px] overflow-visible">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-10 h-10 flex items-center justify-center">{icons.todo}</span>
              <span className="text-white text-[18px] font-bold">To do guide</span>
            </div>
            <span className="text-white text-[16px]">3 for today</span>
            {/* Sağ alt köşe çentiği */}
            <div className="absolute right-[-18px] bottom-[-18px] w-9 h-9 bg-[#181024] rounded-br-[32px] z-10"></div>
            {/* Siyah ok kutusu */}
            <span className="absolute right-[-18px] bottom-[-18px] w-9 h-9 bg-[#181024] border border-[#2B2433] rounded-xl flex items-center justify-center z-20">
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M7 13L13 7M13 7H8M13 7V12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </div>
          {/* Ai voice recorder */}
          <div className="relative bg-[#181024] rounded-2xl border border-[#2B2433] shadow-[0_2px_12px_0_rgba(104,68,233,0.08)] flex flex-col justify-between p-5 min-h-[112px] overflow-visible">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-10 h-10 flex items-center justify-center">{icons.mic}</span>
              <span className="text-white text-[18px] font-bold">Ai voice recorder</span>
            </div>
            <span className="text-white text-[16px] font-medium mt-2">Get started</span>
            {/* Sağ alt köşe çentiği */}
            <div className="absolute right-[-18px] bottom-[-18px] w-9 h-9 bg-[#181024] rounded-br-[32px] z-10"></div>
            {/* Siyah ok kutusu */}
            <span className="absolute right-[-18px] bottom-[-18px] w-9 h-9 bg-[#181024] border border-[#2B2433] rounded-xl flex items-center justify-center z-20">
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M7 13L13 7M13 7H8M13 7V12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </div>
          {/* Search by image */}
          <div className="relative bg-[#181024] rounded-2xl border border-[#2B2433] shadow-[0_2px_12px_0_rgba(104,68,233,0.08)] flex flex-col justify-between p-5 min-h-[112px] overflow-visible">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-10 h-10 flex items-center justify-center">{icons.image}</span>
              <span className="text-white text-[18px] font-bold">Search by image</span>
            </div>
            <span className="text-white text-[16px] font-medium mt-2">Get started</span>
            {/* Sağ alt köşe çentiği */}
            <div className="absolute right-[-18px] bottom-[-18px] w-9 h-9 bg-[#181024] rounded-br-[32px] z-10"></div>
            {/* Siyah ok kutusu */}
            <span className="absolute right-[-18px] bottom-[-18px] w-9 h-9 bg-[#181024] border border-[#2B2433] rounded-xl flex items-center justify-center z-20">
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M7 13L13 7M13 7H8M13 7V12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </div>
        </div>
      </div>
      {/* Alt barı tamamen Figma-faithful koyu ve mor yap */}
      <div className="fixed left-0 right-0 bottom-0 w-full flex flex-col items-center z-30">
        <div className="relative w-full max-w-md mx-auto flex items-center justify-between px-4 py-3 bg-[#0E0515] border-t border-[#251C35] shadow-lg">
          <button className={`flex flex-col items-center ${window.location.pathname === '/home' ? 'text-white' : 'text-[#736D7D]'}`} onClick={() => navigate('/home')}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M3 12l9-9 9 9v8a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-4H9v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8Z" stroke="currentColor" strokeWidth="1.5"/></svg>
            <span className="text-[15px] mt-1">Home</span>
          </button>
          <button className={`flex flex-col items-center ${window.location.pathname === '/diary' ? 'text-white' : 'text-[#736D7D]'}`} onClick={() => navigate('/diary')}>
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <rect x="5" y="4" width="14" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
              <rect x="8" y="7" width="8" height="2" rx="1" fill="currentColor" fillOpacity="0.3" />
              <rect x="8" y="11" width="8" height="2" rx="1" fill="currentColor" fillOpacity="0.3" />
            </svg>
            <span className="text-[15px] mt-1">Diary</span>
          </button>
          <button className={`flex flex-col items-center ${window.location.pathname === '/calendar' ? 'text-white' : 'text-[#736D7D]'}`} onClick={() => navigate('/calendar')}>
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <rect x="4" y="6" width="16" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
              <rect x="7" y="10" width="2" height="2" rx="1" fill="currentColor" fillOpacity="0.3" />
              <rect x="11" y="10" width="2" height="2" rx="1" fill="currentColor" fillOpacity="0.3" />
              <rect x="15" y="10" width="2" height="2" rx="1" fill="currentColor" fillOpacity="0.3" />
            </svg>
            <span className="text-[15px] mt-1">Calendar</span>
          </button>
          <button className={`flex flex-col items-center ${window.location.pathname === '/profile' ? 'text-white' : 'text-[#736D7D]'}`} onClick={() => navigate('/profile')}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 20v-1a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1" stroke="currentColor" strokeWidth="1.5"/></svg>
            <span className="text-[15px] mt-1">Profile</span>
          </button>
          {/* Mikrofon butonu alt barın tam ortasında ve üstüne taşan şekilde */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-8 z-40">
            <button
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: '#6844E9',
                boxShadow: '0 0 32px 0 #6844E966, 0 2px 16px 0 #6844E933',
              }}
            >
              <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="24" fill="none" />
                <rect x="18" y="12" width="12" height="18" rx="6" stroke="#fff" strokeWidth="2" />
                <path d="M24 30v4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                <path d="M18 24c0 3.3137 2.6863 6 6 6s6-2.6863 6-6" stroke="#B6B0C2" strokeWidth="2" fill="none" />
                <path d="M22 18h4" stroke="#B6B0C2" strokeWidth="2" strokeLinecap="round" />
                <path d="M22 21h4" stroke="#B6B0C2" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
        <div className="w-[134px] h-[5px] bg-white/80 rounded-full mt-2 mb-2" />
      </div>
    </div>
  );
};

export default Home; 
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const fileInputRef = useRef(null);
  const [loadingMsg, setLoadingMsg] = useState(null);

  const handleBack = () => {
    navigate('/home');
  };

  const handleSend = () => {
    if (input.trim() === '' || loadingMsg) return;
    setLoadingMsg({ from: 'user', text: input });
    setInput('');
    setTimeout(() => {
      setMessages([...messages, { from: 'user', text: loadingMsg ? loadingMsg.text : input }]);
      setLoadingMsg(null);
    }, 1000);
  };

  const handleCamera = () => {
    // fileInputRef.current.click();
    alert('Kamera/dosya seçici açılacak (MVP için placeholder)');
  };

  useEffect(() => {
    setLoading(true);
    setLoadingMsg({ from: 'bot', text: '' });
    setTimeout(() => {
      setMessages([{ from: 'bot', text: "Hello, I'm Ari AI!" }]);
      setLoadingMsg({ from: 'bot', text: '' });
      setTimeout(() => {
        setMessages([
          { from: 'bot', text: "Hello, I'm Ari AI!" },
          { from: 'bot', text: 'What can i do for you?' },
        ]);
        setLoadingMsg(null);
        setLoading(false);
      }, 900);
    }, 900);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#12001A] font-inter">
      {/* Header */}
      <div className="w-full max-w-md mx-auto relative" style={{height: 74, background: '#12001A'}}>
        <div className="absolute left-0 top-[24px] w-full flex items-center justify-between px-5">
          {/* Back button */}
          <button onClick={handleBack} className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#251C35] hover:border-[#6844E9] transition-colors">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#6844E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <span className="text-white text-[24px] font-bold text-center flex-1">Chat</span>
          {/* Mic icon button */}
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#251C35]">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="6" stroke="#fff" strokeWidth="1.5"/>
              <rect x="7" y="9" width="2" height="6" rx="1" fill="#B6B0C2" />
              <rect x="10" y="7" width="2" height="10" rx="1" fill="#B6B0C2" />
              <rect x="13" y="9" width="2" height="6" rx="1" fill="#B6B0C2" />
              <rect x="16" y="11" width="2" height="2" rx="1" fill="#B6B0C2" />
            </svg>
          </button>
        </div>
      </div>
      {/* Chat area */}
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col gap-4 px-4 py-4 overflow-y-auto" style={{height: 'calc(100vh - 250px)'}}>
        {messages.map((msg, i) =>
          msg.from === 'bot' ? (
            <div className="flex gap-3 items-start" key={i}>
              <div className="w-8 h-8 rounded-full bg-[#6844E9] flex items-center justify-center mt-1">
                {/* Bot ikonu */}
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <rect x="3" y="6" width="18" height="12" rx="6" fill="#181024" stroke="#6844E9" strokeWidth="2"/>
                  <rect x="8" y="3" width="8" height="6" rx="3" fill="#6844E9" />
                  <circle cx="9.5" cy="12" r="1" fill="#fff"/>
                  <circle cx="14.5" cy="12" r="1" fill="#fff"/>
                  <rect x="11" y="15" width="2" height="1.5" rx="0.75" fill="#fff"/>
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <div className="px-5 py-3 rounded-2xl border border-[#3B257F] bg-[#181024] text-white text-[18px] shadow-sm min-w-[180px]" style={{borderWidth: '2px'}}>{msg.text}</div>
              </div>
            </div>
          ) : (
            <div className="flex justify-end" key={i}>
              <div className="px-5 py-3 rounded-2xl bg-[#6844E9] text-white text-[18px] max-w-[70%] shadow-sm min-w-[120px]" style={{borderWidth: '2px'}}>{msg.text}</div>
            </div>
          )
        )}
        {/* Loading mesajı */}
        {loadingMsg && (
          loadingMsg.from === 'bot' ? (
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-[#6844E9] flex items-center justify-center mt-1">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <rect x="3" y="6" width="18" height="12" rx="6" fill="#181024" stroke="#6844E9" strokeWidth="2"/>
                  <rect x="8" y="3" width="8" height="6" rx="3" fill="#6844E9" />
                  <circle cx="9.5" cy="12" r="1" fill="#fff"/>
                  <circle cx="14.5" cy="12" r="1" fill="#fff"/>
                  <rect x="11" y="15" width="2" height="1.5" rx="0.75" fill="#fff"/>
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <div className="px-5 py-3 rounded-2xl border border-[#3B257F] bg-[#181024] text-white text-[18px] shadow-sm min-w-[180px] flex items-center gap-2" style={{borderWidth: '2px'}}>
                  <svg className="animate-spin" width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#6844E9" strokeWidth="4" opacity="0.2"/><path d="M22 12a10 10 0 0 1-10 10" stroke="#6844E9" strokeWidth="4" strokeLinecap="round"/></svg>
                  <span className="text-[#B6B0C2] text-base">Loading...</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-end">
              <div className="px-5 py-3 rounded-2xl bg-[#6844E9] text-white text-[18px] max-w-[70%] shadow-sm min-w-[120px] flex items-center gap-2" style={{borderWidth: '2px'}}>
                <svg className="animate-spin" width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="4" opacity="0.2"/><path d="M22 12a10 10 0 0 1-10 10" stroke="#fff" strokeWidth="4" strokeLinecap="round"/></svg>
                <span className="text-white text-base">Loading...</span>
              </div>
            </div>
          )
        )}
      </div>
      {/* Create Plan butonu */}
      <div className="w-full max-w-md mx-auto px-4 mb-3">
        <button className="w-full h-14 bg-[#6844E9] rounded-xl flex items-center justify-center text-white text-[18px] font-bold shadow-lg transition-all">Create Plan</button>
      </div>
      {/* Input bar */}
      <div className="w-full max-w-md mx-auto px-4 pb-4">
        <div className="w-full h-12 rounded-xl border border-[#6844E9] flex items-center px-4 gap-2 bg-[#181024]">
          {/* Camera icon */}
          <span className="w-6 h-6 flex items-center justify-center cursor-pointer" onClick={handleCamera}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="12" rx="4" stroke="#6844E9" strokeWidth="1.5"/><circle cx="12" cy="13" r="3" stroke="#6844E9" strokeWidth="1.5"/></svg>
          </span>
          <input
            className="flex-1 bg-transparent outline-none text-white text-[17px] placeholder-white"
            placeholder="Mesajınızı yazın..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          />
          {/* Mic icon */}
          <span className="w-6 h-6 flex items-center justify-center">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="8" y="4" width="8" height="16" rx="4" stroke="#6844E9" strokeWidth="1.5"/><path d="M12 20v2" stroke="#6844E9" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </span>
          {/* Send icon */}
          <span className="w-6 h-6 flex items-center justify-center cursor-pointer" onClick={handleSend}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M4 20l16-8-16-8v6h10v4H4v6z" fill="#6844E9"/></svg>
          </span>
        </div>
        <input type="file" ref={fileInputRef} className="hidden" />
      </div>
      {/* iOS bar */}
      <div className="w-[134px] h-[5px] bg-white/80 rounded-full mx-auto mb-2" />
    </div>
  );
};

export default Chat; 
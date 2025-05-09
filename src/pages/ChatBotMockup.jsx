import React, { useState, useEffect, useRef } from "react";
import { FiX, FiChevronLeft } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const MOCK_DIALOG = [
  { from: "bot", text: "Hello! How can I help you today?" },
  { from: "user", text: "Translate this to English: Merhaba, nasılsın?" },
  { from: "bot", text: "Sure! 'Hello, how are you?'" },
  { from: "user", text: "Can you also say: Bugün hava çok güzel." },
  { from: "bot", text: "Of course! 'The weather is very nice today.'" },
  { from: "user", text: "Thank you!" },
  { from: "bot", text: "You're welcome! If you need more translations, just ask." },
];

const CHARACTER_OPTIONS = [
  { key: "friendly", label: "Friendly" },
  { key: "professional", label: "Professional" },
  { key: "witty", label: "Witty" },
];

const ChatBotMockup = () => {
  const [userName, setUserName] = useState("User");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [character, setCharacter] = useState("friendly");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("userName");
    if (stored) setUserName(stored);
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    setError("");
    const userMsg = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input, character }),
      });
      const data = await res.json();
      if (data.result) {
        setMessages((msgs) => [...msgs, { from: "bot", text: data.result }]);
      } else {
        setMessages((msgs) => [...msgs, { from: "bot", text: "Sorry, I couldn't get a response." }]);
        setError(data.error || "Unknown error");
      }
    } catch (err) {
      setMessages((msgs) => [...msgs, { from: "bot", text: "Network error." }]);
      setError("Network error");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-white font-inter relative">
      {/* Header */}
      <div className="w-full max-w-md mx-auto flex flex-col items-center pt-8 pb-2 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          <button
            className="w-9 h-9 flex items-center justify-center bg-white rounded-md border border-[#295A95] z-20"
            onClick={() => navigate(-1)}
            style={{ boxShadow: '0 1px 4px 0 #EAF6FF' }}
          >
            <FiChevronLeft size={24} className="text-[#295A95]" />
          </button>
        </div>
        <div className="text-[22px] font-bold text-black">Hi {userName}</div>
        <div className="text-[16px] text-black/50 font-medium text-center max-w-xs mt-1 mb-2">Text to Speech ChatBot</div>
        {/* Karakter seçimi */}
        <div className="flex gap-2 mt-2">
          {CHARACTER_OPTIONS.map(opt => (
            <button
              key={opt.key}
              onClick={() => setCharacter(opt.key)}
              className={`px-3 py-1 rounded-full border text-[13px] font-semibold transition-all ${character === opt.key ? 'bg-gradient-to-r from-[#C1E0ED] to-[#295A95] text-white border-[#C1E0ED]' : 'bg-[#F5FCFF] text-[#39699E] border-[#3E6DA1]'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      {/* Chat area */}
      <div className="w-full max-w-md flex-1 flex flex-col items-center">
        <div ref={chatRef} className="w-full max-w-md px-2 py-4 bg-white rounded-3xl shadow-xl mb-2 relative" style={{minHeight: 340, maxHeight: 420, overflowY: 'auto'}}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} mb-2 w-full`}>
              <div className={`px-5 py-3 rounded-2xl text-[16px] max-w-[75%] shadow-md ${msg.from === 'user' ? 'bg-black text-white rounded-br-md' : 'bg-gradient-to-br from-[#EAF6FF] to-[#F7F8FA] text-black rounded-bl-md'}`}>{msg.text}</div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start mb-2 w-full">
              <div className="px-5 py-3 rounded-2xl text-[16px] max-w-[75%] shadow-md bg-gradient-to-br from-[#EAF6FF] to-[#F7F8FA] text-black rounded-bl-md opacity-70">Loading...</div>
            </div>
          )}
        </div>
      </div>
      {/* Input */}
      <div className="w-full max-w-md flex items-center gap-2 px-4 pb-8 mt-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 px-4 py-3 rounded-full border border-[#E2EAF2] text-[16px] focus:outline-none shadow-sm bg-white"
          placeholder="Type your message..."
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading || !input.trim()} className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-[22px] font-bold shadow-lg disabled:opacity-60">→</button>
      </div>
      {/* Hata mesajı */}
      {error && <div className="w-full max-w-md px-4 pb-2 text-red-500 text-[14px] text-center">{error}</div>}
      {/* Task entegrasyonu için örnek buton */}
      <div className="w-full max-w-md flex justify-center pb-4">
        <button onClick={() => navigate('/taskprocess')} className="px-4 py-2 rounded-full bg-[#295A95] text-white font-semibold shadow-md">Go to Task Process</button>
      </div>
      {/* X butonu sağ alt köşe */}
      <button
        className="fixed right-8 bottom-8 w-[69px] h-[69px] rounded-full bg-[#409CFF] flex items-center justify-center shadow-lg z-50"
        style={{outline: '0.04px #C1E0ED solid'}}
        onClick={() => navigate(-1)}
      >
        <FiX size={36} className="text-white" />
      </button>
    </div>
  );
};

export default ChatBotMockup; 
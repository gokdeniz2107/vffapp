import React, { useState, useRef, useEffect } from 'react';
import { FiX, FiMic, FiSend } from 'react-icons/fi';

const gradientBg = 'linear-gradient(135deg, #6844E9 0%, #251C35 100%)';

const aiAvatarSvg = (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28" cy="28" r="28" fill="#6844E9" />
    <ellipse cx="28" cy="32" rx="14" ry="12" fill="#FFD6FF" />
    <ellipse cx="28" cy="24" rx="8" ry="7" fill="#B6B0C2" />
    <circle cx="24" cy="23" r="1.5" fill="#6844E9" />
    <circle cx="32" cy="23" r="1.5" fill="#6844E9" />
  </svg>
);

const suggestionTags = [
  "Let's talk",
  'Motivate me',
  'I feel sad',
  'Dream with me',
  'Tell me a secret',
  'Cheer me up',
];

const promptMap = {
  "Let's talk": "How are you feeling today?",
  "Motivate me": "What motivates you the most in life?",
  "I feel sad": "Is there something making you feel down lately?",
  "Dream with me": "Do you have a dream or goal you'd like to share?",
  "Tell me a secret": "What's something about you that most people don't know?",
  "Cheer me up": "What usually cheers you up when you're feeling low?"
};

const systemPrompt =
  "You are a deep, empathetic, friendly assistant. Always answer in the language the user wrote in. Supported languages: Turkish, English, German, Italian, Spanish, Arabic. Respond with emotional depth and connection.";

// DeepConversation: Kullanıcı deep conversation modunu elle başlattığında açılan modal. Sabah/akşam rutinleri için DeepConvoModal kullanılacak.
const DeepConversation = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { from: 'ai', text: "Welcome to Deep Conversation Mode! 💜\nHere, you can talk about anything, share your feelings, or just dream together. I'm here to listen, deeply." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    setMessages(msgs => [...msgs, { from: 'user', text: input }]);
    setInput('');
    setLoading(true);
    setError('');
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.filter(m => m.from === 'user' || m.from === 'ai').map(m => ({
              role: m.from === 'user' ? 'user' : 'assistant',
              content: m.text
            })),
            { role: "user", content: input }
          ]
        })
      });
      const data = await res.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const aiText = data.choices[0].message.content;
        setMessages(msgs => [...msgs, { from: 'ai', text: aiText }]);
      } else {
        setMessages(msgs => [...msgs, { from: 'ai', text: "Sorry, I couldn't get a response." }]);
        setError(data.error?.message || "Unknown error");
      }
    } catch (err) {
      setMessages(msgs => [...msgs, { from: 'ai', text: 'Network error.' }]);
      setError("Network error");
    }
    setLoading(false);
  };

  const handlePromptClick = (tag) => {
    const prompt = promptMap[tag] || tag;
    setInput(prompt);
    setTimeout(() => handleSend(prompt), 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{background: gradientBg, minHeight: '100vh'}}>
      {/* Panel */}
      <div className="relative w-full max-w-md h-[90vh] bg-[#1A1625]/90 rounded-3xl shadow-2xl flex flex-col overflow-hidden border-2 border-[#6844E9]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#6844E9]/40 bg-gradient-to-r from-[#6844E9]/30 to-[#251C35]/10">
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#251C35] border-2 border-[#FFD6FF] shadow-lg">
              {aiAvatarSvg}
            </div>
            <div>
              <div className="text-white text-xl font-bold tracking-wide flex items-center gap-2 animate-pulse">Deep Conversation Mode <span className="text-2xl">💜</span></div>
              <div className="text-[#FFD6FF] text-[15px] mt-1 animate-fade-in">Let's connect deeply. I'm all ears.</div>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#6844E9]/30 transition-colors text-[#FFD6FF]">
            <FiX size={28} />
          </button>
        </div>
        {/* Chat area */}
        <div ref={chatRef} className="flex-1 px-5 py-6 overflow-y-auto flex flex-col gap-4 bg-gradient-to-b from-[#251C35]/30 to-[#1A1625]/80">
          {messages.map((msg, i) =>
            msg.from === 'ai' ? (
              <div key={i} className="flex gap-3 items-start animate-fade-in">
                <div className="w-10 h-10 rounded-full bg-[#6844E9] flex items-center justify-center shadow-lg">
                  {aiAvatarSvg}
                </div>
                <div className="px-6 py-4 rounded-2xl bg-gradient-to-br from-[#6844E9] to-[#B6B0C2]/30 text-white text-[18px] shadow-md max-w-[75%] font-medium border-2 border-[#FFD6FF]/30 animate-fade-in">
                  {msg.text}
                </div>
              </div>
            ) : (
              <div key={i} className="flex justify-end animate-fade-in">
                <div className="px-6 py-4 rounded-2xl bg-[#FFD6FF] text-[#6844E9] text-[18px] max-w-[75%] font-bold shadow-md border-2 border-[#6844E9]/30 animate-fade-in">
                  {msg.text}
                </div>
              </div>
            )
          )}
          {loading && (
            <div className="flex gap-3 items-start animate-fade-in">
              <div className="w-10 h-10 rounded-full bg-[#6844E9] flex items-center justify-center shadow-lg">
                {aiAvatarSvg}
              </div>
              <div className="px-6 py-4 rounded-2xl bg-gradient-to-br from-[#6844E9] to-[#B6B0C2]/30 text-white text-[18px] shadow-md max-w-[75%] font-medium border-2 border-[#FFD6FF]/30 flex items-center gap-2 animate-fade-in">
                <svg className="animate-spin" width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#FFD6FF" strokeWidth="4" opacity="0.2"/><path d="M22 12a10 10 0 0 1-10 10" stroke="#FFD6FF" strokeWidth="4" strokeLinecap="round"/></svg>
                <span className="text-[#FFD6FF] text-base">Thinking...</span>
              </div>
            </div>
          )}
          {error && <div className="text-center text-red-400 text-[15px]">{error}</div>}
        </div>
        {/* Suggestion tags */}
        <div className="flex flex-wrap gap-2 px-6 pb-2 pt-1 animate-fade-in">
          {suggestionTags.map((tag, i) => (
            <button key={i} onClick={() => handlePromptClick(tag)} className="px-4 py-2 rounded-xl bg-[#6844E9]/30 text-[#FFD6FF] font-bold text-[15px] border border-[#6844E9]/40 hover:bg-[#6844E9]/60 transition-all animate-fade-in">
              {tag}
            </button>
          ))}
        </div>
        {/* Input bar */}
        <div className="w-full px-6 pb-6 pt-2 animate-fade-in">
          <div className="w-full h-14 rounded-2xl border-2 border-[#6844E9] flex items-center px-4 gap-3 bg-[#251C35]/80 shadow-lg">
            <span className="w-7 h-7 flex items-center justify-center cursor-pointer text-[#FFD6FF]">
              <FiMic size={24} />
            </span>
            <input
              className="flex-1 bg-transparent outline-none text-white text-[18px] placeholder-[#B6B0C2]"
              placeholder="Type your feelings..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
            />
            <span className="w-7 h-7 flex items-center justify-center cursor-pointer text-[#6844E9]" onClick={handleSend}>
              <FiSend size={24} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeepConversation; 
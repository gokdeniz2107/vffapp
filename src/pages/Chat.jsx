import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

// Akıllı başlık çıkarma fonksiyonu
function extractTaskTitle(text) {
  // First find line starting with 'Title:'
  const titleMatch = text.match(/Title: ?(.+)/i);
  if (titleMatch) return titleMatch[1].trim();

  // Get user's first sentence or quoted expression
  const quoteMatch = text.match(/"([^"]+)"/);
  if (quoteMatch) return quoteMatch[1].trim();

  // First sentence (until period, exclamation, question mark or line end)
  const firstSentence = text.split(/[.!?\n]/)[0];
  if (firstSentence.length > 2 && firstSentence.length < 40) return firstSentence.trim();

  // Keywords fallback
  const keywords = ['sport', 'fitness', 'food', 'meeting', 'shopping', 'appointment', 'study', 'work', 'date'];
  for (const word of keywords) {
    if (text.toLowerCase().includes(word)) return word.charAt(0).toUpperCase() + word.slice(1);
  }

  // If none, return 'Task'
  return 'Task';
}

function extractTaskFromText(text) {
  // Basit örnek: Tarih ve saat geçen bir task var mı kontrol et
  // Daha gelişmiş extraction için NLP veya regex kullanılabilir
  const dateRegex = /([0-9]{1,2} [A-Za-zçğıöşüÇĞİÖŞÜ]+|[0-9]{1,2}\/[0-9]{1,2}|[0-9]{4}-[0-9]{2}-[0-9]{2})/i;
  const timeRegex = /([0-9]{1,2}:[0-9]{2}|[0-9]{1,2} ?(am|pm|AM|PM))/;
  const foundDate = text.match(dateRegex);
  const foundTime = text.match(timeRegex);
  if (foundDate || foundTime) {
    return {
      title: extractTaskTitle(text),
      date: foundDate ? foundDate[0] : '',
      time: foundTime ? foundTime[0] : '',
      raw: text
    };
  }
  return null;
}

// Türkçe tarihleri YYYY-MM-DD formatına çeviren fonksiyon
function parseTurkishDate(str) {
  const months = {
    'ocak': '01', 'şubat': '02', 'mart': '03', 'nisan': '04', 'mayıs': '05', 'haziran': '06',
    'temmuz': '07', 'ağustos': '08', 'eylül': '09', 'ekim': '10', 'kasım': '11', 'aralık': '12'
  };
  const regex = /([0-9]{1,2})\s*([A-Za-zçğıöşüÇĞİÖŞÜ]+)/i;
  const match = str.match(regex);
  if (match) {
    const day = match[1].padStart(2, '0');
    const month = months[match[2].toLowerCase()];
    const year = new Date().getFullYear();
    if (month) return `${year}-${month}-${day}`;
  }
  return null;
}

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const fileInputRef = useRef(null);
  const [loadingMsg, setLoadingMsg] = useState(null);
  const [error, setError] = useState("");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [pendingTask, setPendingTask] = useState(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [tempLocation, setTempLocation] = useState(null);
  // Voice recognition state
  const [recognizing, setRecognizing] = useState(false);
  const recognitionRef = useRef(null);
  const [showCameraModal, setShowCameraModal] = useState(false);

  const handleBack = () => {
    navigate('/home');
  };

  const handleSend = async () => {
    if (input.trim() === '' || loadingMsg) return;
    setError("");
    const userMsg = { from: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setLoadingMsg({ from: 'bot', text: '' });
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      const systemPrompt =
        "You are a helpful, friendly assistant. Always answer in the language the user wrote in. Supported languages: Turkish, English, German, Italian, Spanish, Arabic. If the user requests a task, include the task details (title, date, time, location) clearly in your response.";
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
            ...messages.filter(m => m.from === 'user' || m.from === 'bot').map(m => ({
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
        setMessages((msgs) => [...msgs, { from: 'bot', text: aiText }]);
        // Task extraction
        const extracted = extractTaskFromText(aiText);
        if (extracted) {
          setPendingTask(extracted);
          setShowTaskModal(true);
        }
      } else {
        setMessages((msgs) => [...msgs, { from: 'bot', text: "Sorry, I couldn't get a response." }]);
        setError(data.error?.message || "Unknown error");
      }
    } catch (err) {
      setMessages((msgs) => [...msgs, { from: 'bot', text: 'Network error.' }]);
      setError("Network error");
    }
      setLoadingMsg(null);
  };

  const handleConfirmTask = async () => {
    // Tarihi normalize et (YYYY-MM-DD)
    let normalizedDate = '';
    if (pendingTask.date) {
      // Önce Türkçe tarih parse etmeyi dene
      normalizedDate = parseTurkishDate(pendingTask.date);
      if (!normalizedDate) {
        // Olmazsa Date ile dene
        const d = new Date(pendingTask.date);
        if (!isNaN(d.getTime())) {
          normalizedDate = d.toISOString().slice(0, 10);
        }
      }
    }
    if (!normalizedDate) {
      // Hala yoksa bugünün tarihini ata
      const today = new Date();
      normalizedDate = today.toISOString().slice(0, 10);
    }
    // Yeni görev objesi oluştur
    const newTask = {
      title: pendingTask.title || 'Task',
      date: normalizedDate,
      time: pendingTask.time || '',
      status: '',
      completed: false,
      current: false,
      color: '#6844E9',
      avatars: [],
      raw: pendingTask.raw || '',
      location: pendingTask.location || null,
    };
    // Görevi backend'e ekle
    try {
      await fetch('http://localhost:4000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newTask)
      });
    } catch (err) {}
    setShowTaskModal(false);
    setPendingTask(null);
  };

  const handleCancelTask = () => {
    setShowTaskModal(false);
    setPendingTask(null);
  };

  const handleCamera = () => {
    setShowCameraModal(true);
  };

  const handleOpenCamera = () => {
    setShowCameraModal(false);
    fileInputRef.current.click();
  };

  const handleOpenGallery = () => {
    setShowCameraModal(false);
    const galleryInput = document.createElement('input');
    galleryInput.type = 'file';
    galleryInput.accept = 'image/*';
    galleryInput.onchange = handleFileChange;
    galleryInput.click();
  };

  // Konum seçme modalı açılır
  const handleOpenMapModal = () => {
    setShowMapModal(true);
    setTempLocation(null);
  };
  // Konum seçme modalı kapatılır
  const handleCloseMapModal = () => {
    setShowMapModal(false);
  };
  // Haritada pin bırakınca
  const handleMapClick = (e) => {
    setTempLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };
  // Konum onaylanınca
  const handleConfirmLocation = () => {
    setPendingTask({ ...pendingTask, location: tempLocation });
    setShowMapModal(false);
  };

  // Voice recognition handler
  const handleMic = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Your browser does not support speech recognition.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setRecognizing(false);
      };
      recognitionRef.current.onerror = () => setRecognizing(false);
      recognitionRef.current.onend = () => setRecognizing(false);
    }
    setRecognizing(true);
    recognitionRef.current.start();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target.result;
      setMessages((msgs) => [
        ...msgs,
        { from: 'user', text: '', image: imageUrl }
      ]);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (location.state?.initialPrompt) {
      setMessages([{ from: 'bot', text: location.state.initialPrompt }]);
      setLoading(false);
      setLoadingMsg(null);
    } else {
      setLoading(true);
      setLoadingMsg({ from: 'bot', text: '' });
      setTimeout(() => {
        setMessages([
          { from: 'bot', text: "Hello, I'm Ari AI!" },
          { from: 'bot', text: 'What can i do for you?' },
        ]);
        setLoadingMsg(null);
        setLoading(false);
      }, 900);
    }
  }, [location.state]);

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
                {msg.image && (
                  <img src={msg.image} alt="user upload" className="max-w-[180px] rounded-xl mt-2" />
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-end" key={i}>
              <div className="px-5 py-3 rounded-2xl bg-[#6844E9] text-white text-[18px] max-w-[70%] shadow-sm min-w-[120px]" style={{borderWidth: '2px'}}>
                {msg.text}
                {msg.image && (
                  <img src={msg.image} alt="user upload" className="max-w-[180px] rounded-xl mt-2" />
                )}
              </div>
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
        {/* Hata mesajı */}
        {error && <div className="w-full max-w-md px-4 pb-2 text-red-500 text-[14px] text-center">{error}</div>}
        {/* Task confirmation modal */}
        {showTaskModal && pendingTask && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
            <div className="bg-[#181024] rounded-3xl p-8 flex flex-col items-center w-[324px]">
              <div className="text-white text-[24px] font-bold mb-6 flex items-center gap-2">Add New Task?</div>
              <div className="text-white text-[16px] mb-4 text-center whitespace-pre-line">
                <b>{pendingTask.title}</b>
                <br />
                {pendingTask.date && <span>Date: {pendingTask.date}<br /></span>}
                {pendingTask.time && <span>Time: {pendingTask.time}<br /></span>}
                {pendingTask.location && <span>Location: {pendingTask.location.lat.toFixed(4)}, {pendingTask.location.lng.toFixed(4)}<br /></span>}
              </div>
              {!pendingTask.location && (
                <div className="text-[#FFD600] text-[15px] mb-2 font-bold">Please select a location!</div>
              )}
              <div className="flex gap-2 mt-2">
                <button onClick={handleConfirmTask} disabled={!pendingTask.location} className="px-6 py-2 rounded-xl bg-[#6844E9] text-white font-bold disabled:opacity-50">Yes</button>
                <button onClick={handleCancelTask} className="px-6 py-2 rounded-xl bg-[#251C35] text-white font-bold border border-[#6844E9]">No</button>
                <button onClick={handleOpenMapModal} className="px-6 py-2 rounded-xl bg-[#FFD600] text-black font-bold border border-[#6844E9]">Select Location</button>
              </div>
            </div>
          </div>
        )}
        {/* Location selection modal */}
        {showMapModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
            <div className="bg-[#181024] rounded-3xl p-6 flex flex-col items-center w-[340px]">
              <div className="text-white text-[20px] font-bold mb-3">Select Location</div>
              <div className="w-[300px] h-[300px] mb-4 rounded-xl overflow-hidden">
                <LoadScript googleMapsApiKey="AIzaSyBCE4VaasW2r-ZXfUXx0f6Hk5MnSfg1AS0">
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={tempLocation || { lat: 36.8969, lng: 30.7133 }}
                    zoom={13}
                    onClick={handleMapClick}
                  >
                    {tempLocation && <Marker position={tempLocation} />}
                  </GoogleMap>
                </LoadScript>
              </div>
              <div className="flex gap-3">
                <button onClick={handleConfirmLocation} disabled={!tempLocation} className="px-6 py-2 rounded-xl bg-[#6844E9] text-white font-bold disabled:opacity-50">Confirm</button>
                <button onClick={handleCloseMapModal} className="px-6 py-2 rounded-xl bg-[#251C35] text-white font-bold border border-[#6844E9]">Cancel</button>
              </div>
            </div>
          </div>
        )}
        {/* Camera/Gallery selection modal */}
        {showCameraModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
            <div className="bg-[#181024] rounded-3xl p-6 flex flex-col items-center w-[300px]">
              <div className="text-white text-[20px] font-bold mb-6">Add Photo</div>
              <div className="flex flex-col gap-3 w-full">
                <button 
                  onClick={handleOpenCamera}
                  className="w-full px-6 py-3 rounded-xl bg-[#6844E9] text-white font-bold flex items-center justify-center gap-2"
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <rect x="3" y="7" width="18" height="12" rx="4" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  Camera
                </button>
                <button 
                  onClick={handleOpenGallery}
                  className="w-full px-6 py-3 rounded-xl bg-[#251C35] text-white font-bold border border-[#6844E9] flex items-center justify-center gap-2"
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M3 15l4-4 3 3 7-7 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Choose from Gallery
                </button>
              </div>
            </div>
          </div>
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
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <rect x="3" y="7" width="18" height="12" rx="4" stroke="#6844E9" strokeWidth="1.5"/>
              <circle cx="12" cy="13" r="3" stroke="#6844E9" strokeWidth="1.5"/>
            </svg>
          </span>
          <input
            className="flex-1 bg-transparent outline-none text-white text-[17px] placeholder-white"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          />
          {/* Mic icon */}
          <span className={`w-6 h-6 flex items-center justify-center cursor-pointer ${recognizing ? 'animate-pulse' : ''}`} onClick={handleMic}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="8" y="4" width="8" height="16" rx="4" stroke="#6844E9" strokeWidth="1.5"/><path d="M12 20v2" stroke="#6844E9" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </span>
          {/* Send icon */}
          <span className="w-6 h-6 flex items-center justify-center cursor-pointer" onClick={handleSend}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M4 20l16-8-16-8v6h10v4H4v6z" fill="#6844E9"/></svg>
          </span>
        </div>
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" capture="environment" onChange={handleFileChange} />
      </div>
      {/* iOS bar */}
      <div className="w-[134px] h-[5px] bg-white/80 rounded-full mx-auto mb-2" />
    </div>
  );
};

export default Chat; 
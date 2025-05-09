import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const months = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];
const weekDays = ["Mon", "Tue", "Today", "Thu", "Fri", "Sat", "Sun"];

// Figma'ya uygun örnek task verisi
const TASKS = [
  {
    id: 1,
    title: "Meeting with a client",
    description: "Meeting with client to discuss project updates and finalize the contract details.",
    type: "Work/Business",
    person: "Colton Mitchel",
    date: "2024-07-21",
    time: "16:00",
  },
  {
    id: 2,
    title: "Blood Test",
    description: "Blood test with Dr. Alice Lesli.",
    type: "Health",
    person: "Dr. Alice Lesli",
    date: "2024-07-10",
    time: "08:30",
  },
  {
    id: 3,
    title: "Grocery shopping",
    description: "Shopping list · Walmart",
    type: "Personal",
    person: "Shopping list",
    date: "2024-07-18",
    time: "",
  },
  {
    id: 4,
    title: "Hotel reservation",
    description: "Marriott Bonvoy · Paris",
    type: "Travel",
    person: "Marriott Bonvoy",
    date: "2024-07-18",
    time: "",
  },
  // Mayıs ayı için örnek task
  {
    id: 5,
    title: "Dentist Appointment",
    description: "Routine dental check-up.",
    type: "Health",
    person: "Dr. John Doe",
    date: "2024-05-05",
    time: "15:00",
  },
];

function getDaysInMonth(year, month) {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

const Calendar = () => {
  const navigate = useNavigate();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today);

  // Aylar arası geçiş
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Takvim günleri
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfWeek = daysInMonth[0].getDay(); // 0: Pazar, 1: Pazartesi...
  const offset = (firstDayOfWeek + 6) % 7; // Pazartesi ile başlatmak için

  // Seçili günün task'leri
  const selectedDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
  const selectedTasks = TASKS.filter(t => t.date === selectedDateStr);

  // O ayda task olan günler ve task sayısı
  const taskCountByDay = TASKS.reduce((acc, t) => {
    const d = new Date(t.date);
    if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
      const day = d.getDate();
      acc[day] = (acc[day] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-gradient-to-b from-[#1A0820] via-[#12001A] to-[#090013] flex flex-col items-center font-inter pb-24">
      {/* Üst başlık ve bilgi */}
      <div className="w-full max-w-md mx-auto flex flex-col items-center pt-6 pb-2">
        {/* Üst bar: logo, bildirim */}
        <div className="w-full flex items-center justify-between px-2 mb-2">
          <div className="w-11 h-11 rounded-xl border border-[#4C3591] bg-gradient-to-br from-[#352071] to-[#140923] flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain" />
          </div>
          <div className="w-11 h-11 rounded-xl border border-[#4C3591] bg-gradient-to-br from-[#352071] to-[#140923] flex items-center justify-center cursor-pointer" onClick={() => navigate('/notifications', { state: { from: window.location.pathname } })}>
            {/* Bildirim (çan) ikonu */}
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2Zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2Z" stroke="#fff" strokeWidth="1.5"/></svg>
          </div>
        </div>
        {/* Ay ve ileri/geri butonları */}
        <div className="w-full flex items-center justify-between px-2 mb-2">
          <span className="text-white text-[22px] font-medium">{months[currentMonth]}, {currentYear}</span>
          <div className="flex gap-2">
            <button onClick={prevMonth} className="w-9 h-9 bg-[#6844E9] rounded-lg flex items-center justify-center">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button onClick={nextMonth} className="w-9 h-9 bg-[#6844E9] rounded-lg flex items-center justify-center">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
        {/* Takvim grid */}
        <div className="w-full mb-4">
          <div className="flex justify-between mb-2 px-2">
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d, i) => (
              <div key={i} className="text-center text-white/70 text-[16px] font-inter font-light w-10">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-2 px-2">
            {Array(offset).fill(null).map((_, i) => (
              <div key={i} className="w-10 h-10" />
            ))}
            {daysInMonth.map((d, i) => {
              const isToday = d.toDateString() === today.toDateString();
              const isSelected = d.toDateString() === selectedDate.toDateString();
              return (
                <div key={i} className="relative flex items-center justify-center">
                  <button
                    className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-150
                      ${isSelected ? 'bg-[#6844E9] text-white font-bold shadow-lg' :
                        isToday ? 'border-2 border-[#6844E9] text-white' :
                        'bg-transparent text-white/80'}
                    `}
                    onClick={() => setSelectedDate(d)}
                  >
                    {d.getDate()}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        {/* Tasks başlığı ve boş alan */}
        <div className="w-full flex items-center justify-between px-2 mt-2 mb-2">
          <span className="text-white text-[20px] font-medium opacity-75">Tasks</span>
          <span className="text-white text-[14px] font-bold opacity-50 cursor-pointer">See all</span>
        </div>
        <div className="w-full min-h-[120px] flex items-center justify-center">
          {/* Tasklar burada dinamik olarak eklenecek, şimdilik boş */}
        </div>
      </div>
      {/* Alt Navigation Bar */}
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

export default Calendar; 
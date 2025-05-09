import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const months = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

const TASKS = [
  {
    id: 1,
    title: "Pintap Client Meeting",
    subtitle: "12 Tasks available",
    start: "08:00",
    end: "09:00",
    color: "#A4ABFF",
    avatars: ["/avatar1.png", "/avatar2.png"],
    date: new Date().toDateString(),
  },
  {
    id: 2,
    title: "Indeep Wireframe discussion",
    subtitle: "12 Tasks available",
    start: "11:00",
    end: "12:00",
    color: "#7BCC8C",
    avatars: ["/avatar1.png", "/avatar2.png"],
    date: new Date().toDateString(),
  },
];

const Diary = () => {
  const navigate = useNavigate();
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [tab, setTab] = useState("schedule");

  // Haftanın günleri ve bugünün indexi
  const weekStart = today.getDate() - today.getDay() + 1; // Pazartesi başlangıcı
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(selectedYear, selectedMonth, weekStart + i);
    return {
      date: d.getDate(),
      day: weekDays[d.getDay() === 0 ? 6 : d.getDay() - 1],
      isToday: d.toDateString() === today.toDateString(),
      isSelected: d.getDate() === selectedDay && d.getMonth() === selectedMonth && d.getFullYear() === selectedYear,
      fullDate: d,
    };
  });

  // Seçili günün task'leri
  const selectedDateObj = new Date(selectedYear, selectedMonth, selectedDay);
  const selectedTasks = TASKS.filter(t => new Date(t.date).toDateString() === selectedDateObj.toDateString());

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#1A0820] via-[#12001A] to-[#090013] flex flex-col items-center font-inter pb-24">
      {/* Üst bar: logo, bildirim */}
      <div className="w-full max-w-md mx-auto flex flex-col items-center pt-6 pb-2">
        <div className="w-full flex items-center justify-between px-2 mb-2">
          <div className="w-11 h-11 rounded-xl border border-[#4C3591] bg-gradient-to-br from-[#352071] to-[#140923] flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain" />
          </div>
          <div className="w-11 h-11 rounded-xl border border-[#4C3591] bg-gradient-to-br from-[#352071] to-[#140923] flex items-center justify-center cursor-pointer" onClick={() => navigate('/notifications', { state: { from: window.location.pathname } })}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2Zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2Z" stroke="#fff" strokeWidth="1.5"/></svg>
          </div>
        </div>
        {/* Ay, yıl ve toplam task */}
        <div className="w-full flex flex-col items-start px-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-white text-[22px] font-medium">{months[selectedMonth]}, {selectedYear}</span>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span className="text-white/70 text-[15px] mt-1">You have total {selectedTasks.length} tasks today</span>
        </div>
        {/* Haftalık günler */}
        <div className="w-full flex flex-row gap-1 justify-between px-2 mb-4">
          {week.map((d, i) => (
            <button
              key={i}
              className={`flex flex-col items-center justify-center rounded-lg transition-all duration-150 px-0 py-0 w-[48px] h-[65px] ${d.isSelected ? 'bg-[#6844E9]' : ''}`}
              onClick={() => {
                setSelectedDay(d.date);
                setSelectedMonth(d.fullDate.getMonth());
                setSelectedYear(d.fullDate.getFullYear());
              }}
            >
              <span className={`text-[16px] font-medium ${d.isSelected ? 'text-white' : 'text-white'}`}>{d.date}</span>
              <span className={`text-[14px] font-light ${d.isSelected ? 'text-white' : 'text-[#ACAFB5]'}`}>{d.day}</span>
            </button>
          ))}
        </div>
        {/* Sekmeler */}
        <div className="w-full flex flex-row gap-0 mb-4 px-2">
          <button className={`h-[46px] px-8 rounded-lg text-[16px] font-medium transition-all ${tab === 'schedule' ? 'bg-[#6844E9] text-white' : 'bg-[#0E0515] text-[#565E73]'}`} onClick={() => setTab('schedule')}>Schedule</button>
          <button className={`h-[46px] px-8 rounded-lg text-[16px] font-medium transition-all ${tab === 'myhealth' ? 'bg-[#6844E9] text-white' : 'bg-[#0E0515] text-[#565E73]'}`} onClick={() => setTab('myhealth')}>My Health</button>
        </div>
        {/* Timeline */}
        <div className="w-full flex flex-col gap-2 px-2">
          <span className="text-white text-[14px] font-light mb-2">Timeline</span>
          {/* Saatler ve tasklar */}
          {Array.from({ length: 6 }, (_, i) => 8 + i).map(hour => {
            const hourStr = hour.toString().padStart(2, '0') + ':00 AM';
            const task = selectedTasks.find(t => parseInt(t.start) === hour);
            return (
              <div key={hour} className="relative flex items-center h-[60px]">
                <span className="text-white text-[14px] font-light w-[70px]">{hourStr}</span>
                <div className="flex-1 h-[1px] bg-white/10 ml-2" />
                {task && (
                  <div className="absolute left-[80px] top-0 h-[60px] w-[290px] rounded-lg flex flex-col justify-between px-4 py-3" style={{background: task.color}}>
                    <div className="text-white text-[14px] font-normal">{task.title}</div>
                    <div className="text-white text-[14px] font-normal">{task.subtitle}</div>
                    <div className="flex items-center gap-2 mt-2">
                      {/* Avatarlar */}
                      {task.avatars.map((a, idx) => (
                        <img key={idx} src={a} alt="avatar" className="w-6 h-6 rounded-full border-2 border-white -ml-2 first:ml-0" />
                      ))}
                      <span className="ml-auto text-white text-[14px]">{task.start} - {task.end}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Alt Navigation Bar - Calendar ile aynı */}
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

export default Diary; 
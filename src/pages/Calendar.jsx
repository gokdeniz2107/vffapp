import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import EventModal from '../components/EventModal';
import { getEventsForDate, saveEvent, deleteEvent, updateEvent } from '../utils/eventUtils';

const months = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];
const weekDays = ["Mon", "Tue", "Today", "Thu", "Fri", "Sat", "Sun"];

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
  const [selectedDate, setSelectedDate] = useState(today.toISOString().split('T')[0]);
  const [tasks, setTasks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Görevleri backend'den çek
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const res = await fetch("http://localhost:4000/tasks", {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setTasks(Array.isArray(data) ? data : []);
      } catch (err) {
        setTasks([]);
      }
    };
    fetchTasks();
  }, [navigate]);

  useEffect(() => {
    loadEvents();
  }, [selectedDate]);

  const loadEvents = () => {
    const dateEvents = getEventsForDate(selectedDate);
    setEvents(dateEvents);
  };

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
  const selectedDateObj = new Date(selectedDate);
  const selectedDateStr = `${selectedDateObj.getFullYear()}-${String(selectedDateObj.getMonth() + 1).padStart(2, "0")}-${String(selectedDateObj.getDate()).padStart(2, "0")}`;
  const selectedTasks = tasks.filter(t => {
    if (!t.date) return false;
    let taskDateStr = t.date;
    if (taskDateStr.length <= 10) {
      return taskDateStr === selectedDateStr;
    } else {
      const d = new Date(taskDateStr);
      return d.getFullYear() === selectedDateObj.getFullYear() &&
             d.getMonth() === selectedDateObj.getMonth() &&
             d.getDate() === selectedDateObj.getDate();
    }
  });

  // O ayda task olan günler ve task sayısı
  const taskCountByDay = tasks.reduce((acc, t) => {
    const d = new Date(t.date);
    if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
      const day = d.getDate();
      acc[day] = (acc[day] || 0) + 1;
    }
    return acc;
  }, {});

  // Görev silme fonksiyonu
  const handleDeleteTask = async (id) => {
    await fetch(`http://localhost:4000/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(t => t._id !== id));
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  const handleEventSave = (event) => {
    if (selectedEvent) {
      updateEvent(selectedEvent.id, event);
    } else {
      saveEvent(event);
    }
    setShowEventModal(false);
    setSelectedEvent(null);
    loadEvents();
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleDeleteEvent = (eventId) => {
    deleteEvent(eventId);
    loadEvents();
  };

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
              const isSelected = d.toDateString() === new Date(selectedDate).toDateString();
              return (
                <div key={i} className="relative flex items-center justify-center">
                  <button
                    className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-150
                      ${isSelected ? 'bg-[#6844E9] text-white font-bold shadow-lg' :
                        isToday ? 'border-2 border-[#6844E9] text-white' :
                        'bg-transparent text-white/80'}
                    `}
                    onClick={() => setSelectedDate(d.toISOString().split('T')[0])}
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
        <div className="w-full min-h-[120px] flex flex-col items-center justify-start gap-2">
          {selectedTasks.length === 0 ? (
            <span className="text-white/40 text-[16px] mt-6">No tasks for this day</span>
          ) : (
            selectedTasks.map(task => (
              <div key={task._id} className="w-full bg-[#251C35] rounded-xl px-4 py-3 flex items-center gap-4">
                <span className="text-white text-[16px] font-bold">{task.title}</span>
                <span className="ml-auto text-[#6844E9] text-[15px]">{task.time}</span>
                <button onClick={() => { setTaskToDelete(task); setShowDeleteModal(true); }} className="ml-2 p-2 rounded-full hover:bg-[#6844E9]/20 transition-colors">
                  <FiTrash2 size={20} color="#6844E9" />
                </button>
              </div>
            ))
          )}
        </div>
        {/* Delete confirmation modal */}
        {showDeleteModal && taskToDelete && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
            <div className="bg-[#181024] rounded-3xl p-8 flex flex-col items-center w-[324px]">
              <div className="text-white text-[22px] font-bold mb-6 flex items-center gap-2">Are you sure you want to delete this task?</div>
              <div className="flex gap-4 mt-2">
                <button onClick={() => handleDeleteTask(taskToDelete._id)} className="px-6 py-2 rounded-xl bg-[#6844E9] text-white font-bold">Yes</button>
                <button onClick={() => { setShowDeleteModal(false); setTaskToDelete(null); }} className="px-6 py-2 rounded-xl bg-[#251C35] text-white font-bold border border-[#6844E9]">No</button>
              </div>
            </div>
          </div>
        )}
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
      {/* Event Modal */}
      {showEventModal && (
        <EventModal 
          onClose={() => {
            setShowEventModal(false);
            setSelectedEvent(null);
          }}
          onSave={handleEventSave}
          initialEvent={selectedEvent}
        />
      )}
    </div>
  );
};

export default Calendar; 
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const months = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

const moodEmojis = [
  { label: 'Very Sad', icon: '😔' },
  { label: 'Sad', icon: '😕' },
  { label: 'Neutral', icon: '😐' },
  { label: 'Happy', icon: '😊' },
  { label: 'Cool', icon: '😎' },
];

const Diary = () => {
  const navigate = useNavigate();
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [tab, setTab] = useState("schedule");
  const [tasks, setTasks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [selectedMood, setSelectedMood] = useState(3); // default: Happy
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("");
  const [addError, setAddError] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  // Refactor: fetchTasks fonksiyonunu dışarı al
  const fetchTasks = async (setTasks, navigate) => {
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
      console.log('Fetched tasks:', data); // DEBUG
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      setTasks([]);
    }
  };

  // Görevleri backend'den çek
  useEffect(() => {
    fetchTasks(setTasks, navigate);
  }, [navigate]);

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
  const selectedDateStr = selectedDateObj.toISOString().slice(0, 10);
  const selectedTasks = tasks.filter(t => {
    if (!t.date) return false;
    // t.date formatı "2024-07-21" veya benzeri olmalı
    // Hem string hem Date objesi ile karşılaştır
    if (typeof t.date === 'string') {
      return t.date.slice(0, 10) === selectedDateStr;
    } else {
      const taskDate = new Date(t.date);
      return taskDate.toISOString().slice(0, 10) === selectedDateStr;
    }
  });

  // Görev silme fonksiyonu
  const handleDeleteTask = async (id) => {
    await fetch(`http://localhost:4000/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(t => t._id !== id));
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

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
          <button className={`h-[46px] px-8 rounded-lg text-[16px] font-medium transition-all ${tab === 'myhealth' ? 'bg-[#6844E9] text-white' : 'bg-[#0E0515] text-[#565E73]'}`} onClick={() => setTab('myhealth')}>My Journal</button>
        </div>
        {/* Timeline veya Journal */}
        {tab === 'schedule' ? (
          <div className="w-full flex flex-col gap-2 px-2" style={{maxHeight: 480, overflowY: 'auto'}}>
          <span className="text-white text-[14px] font-light mb-2">Timeline</span>
          {/* Saatler ve tasklar */}
            {Array.from({ length: 16 }, (_, i) => 8 + i).map(hour => {
              const hourStr = hour.toString().padStart(2, '0') + ':00';
              const task = selectedTasks.find(t => {
                if (!t.time) return false;
                const taskHour = parseInt(t.time.split(':')[0]);
                return taskHour === hour;
              });
            return (
              <div key={hour} className="relative flex items-center h-[60px]">
                <span className="text-white text-[14px] font-light w-[70px]">{hourStr}</span>
                <div className="flex-1 h-[1px] bg-white/10 ml-2" />
                {task && (
                  <div className="absolute left-[80px] top-0 h-[60px] w-[290px] rounded-lg flex flex-col justify-between px-4 py-3" style={{background: task.color}}>
                      <div className="flex items-center gap-2">
                        <span className="text-white text-[14px] font-normal">{task.title}</span>
                        <button onClick={() => { setTaskToDelete(task); setShowDeleteModal(true); }} className="ml-2 p-2 rounded-full hover:bg-[#6844E9]/20 transition-colors">
                          <FiTrash2 size={18} color="#6844E9" />
                        </button>
                      </div>
                    <div className="flex items-center gap-2 mt-2">
                        {task.avatars && task.avatars.map((a, idx) => (
                        <img key={idx} src={a} alt="avatar" className="w-6 h-6 rounded-full border-2 border-white -ml-2 first:ml-0" />
                      ))}
                        <span className="ml-auto text-white text-[14px]">{task.time}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        ) : (
          <div className="w-full flex flex-col gap-4 px-2" style={{maxHeight: 480, overflowY: 'auto'}}>
            {/* My Journal Section */}
            {selectedTasks.length === 0 ? (
              <span className="text-white/40 text-[16px] mt-6">No journal entries for this day</span>
            ) : (
              selectedTasks.map((task, idx) => (
                <div key={task._id || idx} className="w-full bg-[#251C35] rounded-xl px-4 py-3 flex flex-col gap-2 shadow-md">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-[16px] font-bold">{task.title}</span>
                    <span className="ml-2 text-[#FFD6FF] text-xs bg-[#6844E9]/30 rounded px-2 py-1">Task</span>
                    {/* Delete button */}
                    <button onClick={async () => {
                      await fetch(`http://localhost:4000/tasks/${task._id}`, {
                        method: 'DELETE',
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                      });
                      await fetchTasks(setTasks, navigate);
                    }} className="ml-auto p-2 rounded-full hover:bg-[#6844E9]/20 transition-colors" title="Delete">
                      <FiTrash2 size={18} color="#6844E9" />
                    </button>
                  </div>
                  {/* Mood Tracker sadece ilk task için örnek olarak gösteriliyor */}
                  {idx === 0 && (
                    <div className="flex flex-col gap-1 mt-2">
                      <span className="text-[#FFD6FF] text-[15px] font-semibold mb-1">❤️ Mood Tracker</span>
                      <div className="flex gap-2 mt-1">
                        {moodEmojis.map((mood, i) => (
                          <button key={mood.label} onClick={() => setSelectedMood(i)} className={`text-2xl px-1 py-1 rounded-full border-2 ${selectedMood === i ? 'border-[#6844E9] bg-[#6844E9]/20' : 'border-transparent'}`}>{mood.icon}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
            {/* Add to Journal Button */}
            <button className="w-full mt-4 h-14 border-2 border-dashed border-[#6844E9] rounded-xl flex items-center justify-center text-[#6844E9] text-[18px] font-bold bg-[#181024]/60 hover:bg-[#6844E9]/10 transition-all" onClick={() => setShowAddModal(true)}>
              + Add to Journal
            </button>
          </div>
        )}
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
      {/* Add Journal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
          <div className="bg-[#181024] rounded-3xl p-8 flex flex-col items-center w-[340px] relative">
            <button className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl" onClick={() => setShowAddModal(false)}>&times;</button>
            <div className="text-white text-[24px] font-bold mb-6">Add Journal Entry</div>
            <form className="w-full flex flex-col gap-4" onSubmit={async (e) => {
              e.preventDefault();
              setAddError("");
              setAddLoading(true);
              try {
                const token = localStorage.getItem('token');
                const today = new Date(selectedYear, selectedMonth, selectedDay);
                const dateStr = today.toISOString().slice(0, 10);
                const res = await fetch('http://localhost:4000/tasks', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify({
                    title: newTitle,
                    date: dateStr,
                    time: newTime,
                    color: '#6844E9',
                    completed: false,
                    status: '',
                    avatars: [],
                    raw: newTitle,
                  })
                });
                const data = await res.json();
                if (res.ok) {
                  await fetchTasks(setTasks, navigate);
                  setShowAddModal(false);
                  setNewTitle("");
                  setNewTime("");
                } else {
                  setAddError(data.error || 'Failed to add entry');
                }
              } catch (err) {
                setAddError('Network error');
              }
              setAddLoading(false);
            }}>
              <input
                type="text"
                placeholder="Title"
                className="w-full px-4 py-3 bg-transparent border border-[#6844E9] rounded-xl text-[17px] placeholder:text-[#B6B0C2] text-white focus:outline-none font-lato"
                required
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
              />
              <input
                type="time"
                placeholder="Time (optional)"
                className="w-full px-4 py-3 bg-transparent border border-[#6844E9] rounded-xl text-[17px] placeholder:text-[#B6B0C2] text-white focus:outline-none font-lato"
                value={newTime}
                onChange={e => setNewTime(e.target.value)}
              />
              {addError && <div className="text-red-400 text-center text-[15px]">{addError}</div>}
              <button type="submit" disabled={addLoading} className="w-full h-12 bg-[#6844E9] rounded-xl flex items-center justify-center text-white text-[18px] font-bold shadow-lg transition-all hover:opacity-90 mt-2 disabled:opacity-60">
                {addLoading ? 'Adding...' : 'Add'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Diary; 
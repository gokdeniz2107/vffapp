import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const notificationsData = [
  { id: 1, text: "Your AI image is ready!", time: "1h ago" },
  { id: 2, text: "Your AI image is ready!", time: "4h ago" },
  { id: 3, text: "Limited-Time Offer: Get 20% Off Pro!", time: "Yesterday" },
  { id: 4, text: "New Feature Alert: Collaborate in Real-Time!", time: "Yesterday" },
  { id: 5, text: "Upgrade Now and Unlock Exclusive Templates!", time: "Yesterday" },
  { id: 6, type: "task", text: "Canceling a table in a restaurant", taskType: "Task", completed: "12 Dec, 2024" },
];

const isMobile = () => window.innerWidth <= 600;

const Notifications = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [notifications, setNotifications] = useState(notificationsData);
  const from = location.state?.from || "/home";

  // Animasyon için silinecek id
  const [pendingDelete, setPendingDelete] = useState(null);

  // Silme fonksiyonu (animasyonlu)
  const handleDelete = (id) => {
    setPendingDelete(id);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      setPendingDelete(null);
    }, 300); // 300ms animasyon süresi
  };

  // Swipe-to-delete için (mobilde)
  const [swipeId, setSwipeId] = useState(null);
  const [startX, setStartX] = useState(0);
  const [deltaX, setDeltaX] = useState(0);

  const handleTouchStart = (id, e) => {
    setSwipeId(id);
    setStartX(e.touches[0].clientX);
    setDeltaX(0);
  };
  const handleTouchMove = (e) => {
    if (swipeId) {
      setDeltaX(e.touches[0].clientX - startX);
    }
  };
  const handleTouchEnd = () => {
    if (swipeId && deltaX < -60) {
      handleDelete(swipeId);
    }
    setSwipeId(null);
    setDeltaX(0);
  };

  // Responsive utility: iPhone 11-16 için max-w-sm (430px) ve padding ayarı
  const containerClass = "min-h-screen w-full max-w-sm mx-auto bg-gradient-to-b from-[#1A0820] via-[#12001A] to-[#090013] flex flex-col items-center font-inter pb-6";
  const cardBase = "w-full bg-[#251C35] rounded-xl flex flex-col transition-all duration-300";
  const cardPadding = "px-3 py-3 sm:px-4 sm:py-4";
  const cardGap = "gap-2 sm:gap-3";
  const iconSize = "w-5 h-5 sm:w-6 sm:h-6";
  const textBase = "text-white font-normal";
  const timeText = "text-[11px] sm:text-[12px] opacity-70 w-[44px] sm:w-[52px] text-right";
  const mainText = "text-[14px] sm:text-[15px]";
  const taskTitle = "text-[15px] sm:text-[17px]";
  const typeText = "text-[13px] sm:text-[15px] font-bold";
  const completedText = "text-[13px] sm:text-[15px] font-bold";
  const deleteBtn = "text-[#B6B0C2] hover:text-red-400 text-[12px] sm:text-[13px] font-bold";

  return (
    <div className={containerClass}>
      {/* Header */}
      <div className="w-full max-w-sm mx-auto flex items-center pt-6 pb-3 px-3 sm:px-4">
        <button
          className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border border-[#251C35] hover:border-[#6844E9] transition-colors mr-2"
          onClick={() => navigate(from)}
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#6844E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <h1 className="text-white text-[20px] sm:text-[22px] font-bold flex-1 text-center">Notifications</h1>
        <div className="w-9 sm:w-10" /> {/* boşluk için */}
      </div>
      {/* Bildirimler listesi */}
      <div className="w-full flex flex-col gap-3 sm:gap-4 px-3 sm:px-4 pb-6 sm:pb-8">
        {notifications.map((n) => (
          n.type === "task" ? (
            <div
              key={n.id}
              className={`${cardBase} ${cardPadding} ${cardGap} ${pendingDelete === n.id ? 'opacity-0 translate-x-20 pointer-events-none' : 'opacity-100 translate-x-0'}`}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <span className={iconSize + " flex items-center justify-center"}>
                  {/* Çan ikonu */}
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2Zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2Z" stroke="#fff" strokeWidth="1.5"/></svg>
                </span>
                <span className={taskTitle + " " + textBase}>{n.text}</span>
                {isMobile() ? null : (
                  <button onClick={() => handleDelete(n.id)} className={"ml-auto " + deleteBtn}>Delete</button>
                )}
              </div>
              <div className="flex flex-col gap-1 mt-1 sm:mt-2">
                <span className={typeText + " " + textBase}>Type: <span className="font-normal">{n.taskType}</span></span>
                <span className={completedText + " " + textBase}>Completed: <span className="font-normal">{n.completed}</span></span>
              </div>
            </div>
          ) : (
            <div
              key={n.id}
              className={`${cardBase} ${cardPadding} flex-row items-center gap-2 sm:gap-3 relative overflow-hidden transition-all duration-300 ${pendingDelete === n.id ? 'opacity-0 translate-x-20 pointer-events-none' : 'opacity-100 translate-x-0'}`}
              style={isMobile() && swipeId === n.id ? { transform: `translateX(${deltaX}px)`, transition: swipeId ? 'none' : 'transform 0.2s' } : {}}
              onTouchStart={isMobile() ? (e) => handleTouchStart(n.id, e) : undefined}
              onTouchMove={isMobile() ? handleTouchMove : undefined}
              onTouchEnd={isMobile() ? handleTouchEnd : undefined}
            >
              <span className={iconSize + " flex items-center justify-center"}>
                {/* Çan ikonu */}
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2Zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2Z" stroke="#fff" strokeWidth="1.5"/></svg>
              </span>
              <span className={mainText + " " + textBase + " flex-1"}>{n.text}</span>
              <span className={timeText + " " + textBase}>{n.time}</span>
              {/* Webde sil butonu */}
              {isMobile() ? (
                swipeId === n.id && deltaX < -40 && (
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-500 text-white px-2 py-1 rounded-lg text-[12px] sm:text-[13px] font-bold shadow-lg"
                    onClick={() => handleDelete(n.id)}
                  >Delete</button>
                )
              ) : (
                <button onClick={() => handleDelete(n.id)} className={"ml-2 " + deleteBtn}>Delete</button>
              )}
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default Notifications; 
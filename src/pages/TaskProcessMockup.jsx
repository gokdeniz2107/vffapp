import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiMic, FiChevronDown, FiPlusCircle, FiCalendar } from "react-icons/fi";
import "../styles/hide-date-icon.css";
import { useNavigate } from "react-router-dom";

const AVATAR_OPTIONS = [
  "/avatars/11475205.jpg",
  "/avatars/11475214.jpg",
  "/avatars/11475215.jpg",
];

const TaskProcessMockup = () => {
  const [userName, setUserName] = useState("User");
  const [userAvatar, setUserAvatar] = useState(0);
  const [taskType, setTaskType] = useState("Checklist");
  const [start, setStart] = useState("2024-07-05");
  const [end, setEnd] = useState("2024-07-07");
  const [clarifications, setClarifications] = useState({
    time: "15:00",
    gift: "Scarf",
    pickup: "Pick up at 13:00 on Evan Gvirol Tel Aviv",
    cake: "Pre-order and self-collection",
  });
  const [file, setFile] = useState(null);
  const [mission, setMission] = useState("My grandmother's birthday is in two days, and I need to go to the party with my sister. It's time to start preparing for the birthday");
  const navigate = useNavigate();

  // Ref'ler takvim inputları için
  const startRef = React.useRef();
  const endRef = React.useRef();

  useEffect(() => {
    const stored = localStorage.getItem("userName");
    if (stored) setUserName(stored);
    const avatarIdx = localStorage.getItem("userAvatar");
    if (avatarIdx !== null) setUserAvatar(Number(avatarIdx));
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#F7F8FA] font-inter">
      {/* Header */}
      <div className="w-full max-w-md mx-auto flex flex-col items-center pt-4 pb-2">
        <div className="w-full flex items-center justify-between mb-1">
          <button className="w-9 h-9 flex items-center justify-center bg-[#F7F8FA] rounded-md border border-[#E2EAF2]" onClick={() => navigate(-1)}>
            <FiChevronLeft size={24} className="text-black" />
          </button>
          <div className="flex-1 flex flex-col items-center">
            <div className="text-[20px] font-bold text-black">Hi, {userName}</div>
            <div className="text-[14px] text-black/50 font-medium mt-1">Processing your task...</div>
          </div>
          <div className="w-9 h-9" />
        </div>
      </div>
      {/* Mission description & Task type */}
      <div className="w-full max-w-md flex flex-col gap-4 px-4 mt-2">
        <div className="flex flex-col gap-2">
          <div className="text-[14px] text-black font-normal">Mission description</div>
          <div className="flex items-start gap-3 p-4 bg-[#DAE2EB55] border border-[#DBE3EC] rounded-tl-xl rounded-bl-xl rounded-br-xl">
            <FiMic size={22} className="text-[#9493AE] mt-1" />
            <textarea
              value={mission}
              onChange={e => setMission(e.target.value)}
              rows={3}
              className="flex-1 resize-none bg-transparent border-none outline-none text-[14px] text-black font-medium leading-5 p-0 m-0 min-h-[48px]"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-[14px] text-black font-normal">Task type</div>
          <div className="relative">
            <select value={taskType} onChange={e => setTaskType(e.target.value)} className="w-full h-12 px-4 pr-10 bg-white border border-[#719ABE] rounded-lg text-[16px] text-black appearance-none focus:outline-none focus:border-[#295A95] hover:border-[#295A95] transition-all cursor-pointer shadow-sm">
              <option>Checklist</option>
              <option>Reminder</option>
              <option>Calendar Event</option>
            </select>
            <FiChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2B2B2E] pointer-events-none" />
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex-1 flex flex-col gap-1">
            <div className="text-[14px] text-black font-normal">Start</div>
            <div className="relative group">
              <input
                ref={startRef}
                type="date"
                value={start}
                onChange={e => setStart(e.target.value)}
                className="w-full h-12 px-4 pr-10 bg-white border border-[#D8DADC] rounded-lg text-[15px] text-black focus:outline-none shadow-sm transition-all focus:border-[#295A95] group-hover:border-[#295A95] cursor-pointer"
              />
              <button type="button" onClick={() => startRef.current && startRef.current.showPicker && startRef.current.showPicker()} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 cursor-pointer text-[#ABCEF5] hover:text-[#295A95] focus:outline-none">
                <FiCalendar size={20} />
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <div className="text-[14px] text-black font-normal">End</div>
            <div className="relative group">
              <input
                ref={endRef}
                type="date"
                value={end}
                onChange={e => setEnd(e.target.value)}
                className="w-full h-12 px-4 pr-10 bg-white border border-[#D8DADC] rounded-lg text-[15px] text-black focus:outline-none shadow-sm transition-all focus:border-[#295A95] group-hover:border-[#295A95] cursor-pointer"
              />
              <button type="button" onClick={() => endRef.current && endRef.current.showPicker && endRef.current.showPicker()} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 cursor-pointer text-[#ABCEF5] hover:text-[#295A95] focus:outline-none">
                <FiCalendar size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Clarification questions */}
      <div className="w-full max-w-md flex flex-col gap-2 px-4 mt-6">
        <div className="flex items-center gap-3 mb-2">
          <img src={AVATAR_OPTIONS[userAvatar]} alt="avatar" className="w-12 h-12 rounded-full border border-[#BCBCCC]" />
          <div className="text-[20px] font-medium text-black">Clarification questions from the avatar</div>
        </div>
        {/* Questions */}
        <div className="flex flex-col gap-4">
          {/* Q1 */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#C1E0ED] to-[#295A95] flex flex-col gap-4">
            <div className="text-white text-[14px] font-semibold">What time the celebration is scheduled to start?</div>
            <div className="flex items-center gap-2">
              <input type="time" value={clarifications.time} onChange={e => setClarifications(c => ({...c, time: e.target.value}))} className="flex-1 h-12 px-4 bg-white border border-[#719ABE] rounded-lg text-[16px] text-black focus:outline-none" />
            </div>
          </div>
          {/* Q2 */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#C1E0ED] to-[#295A95] flex flex-col gap-4">
            <div className="text-white text-[14px] font-semibold">What gift would you like to buy?</div>
            <input type="text" value={clarifications.gift} onChange={e => setClarifications(c => ({...c, gift: e.target.value}))} className="h-12 px-4 bg-white border border-[#719ABE] rounded-lg text-[16px] text-black focus:outline-none" />
          </div>
          {/* Q3 */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#C1E0ED] to-[#295A95] flex flex-col gap-4">
            <div className="text-white text-[14px] font-semibold">Where and what time would you like to pick up your sister?</div>
            <input type="text" value={clarifications.pickup} onChange={e => { setClarifications(c => ({...c, pickup: e.target.value})); localStorage.setItem('startAddress', e.target.value); }} className="h-12 px-4 bg-white border border-[#719ABE] rounded-lg text-[16px] text-black focus:outline-none" />
          </div>
          {/* Q4 */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#C1E0ED] to-[#295A95] flex flex-col gap-4">
            <div className="text-white text-[14px] font-semibold">Would you like to buy the cake at the store or to order it in advance?</div>
            <input type="text" value={clarifications.cake} onChange={e => setClarifications(c => ({...c, cake: e.target.value}))} className="h-12 px-4 bg-white border border-[#719ABE] rounded-lg text-[16px] text-black focus:outline-none" />
          </div>
          {/* Attach files */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#C1E0ED] to-[#295A95] flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between">
              <div className="text-white text-[14px] font-semibold">Attach files</div>
              <div className="text-[#B3C3D5] text-[12px] font-medium">Optional</div>
            </div>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-white rounded-lg p-6 mt-2 cursor-pointer bg-white/10">
              <FiPlusCircle size={28} className="text-white mb-2" />
              <span className="text-white text-[14px] text-center">Accepted file formats from PGN, JPG, PDF files up to 3 MB each</span>
              <input type="file" className="hidden" onChange={e => setFile(e.target.files[0])} />
              {file && <span className="text-white text-[13px] mt-2">{file.name}</span>}
            </label>
          </div>
        </div>
      </div>
      {/* Save button & iOS bar */}
      <div className="w-full max-w-md flex flex-col items-center gap-2 pt-6 pb-4 mt-6">
        <button className="w-[327px] h-14 bg-black text-white rounded-lg text-[15px] font-medium shadow-lg transition-all hover:bg-[#222] active:scale-95" onClick={() => navigate('/route')}>Save</button>
        <div className="w-[134px] h-[5px] bg-[#060606] rounded-full mt-2" />
      </div>
    </div>
  );
};

export default TaskProcessMockup; 
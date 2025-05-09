import React, { useState, useEffect, useRef } from "react";
import { FiPause, FiPlay, FiX } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const AVATAR_OPTIONS = [
  "/avatars/11475205.jpg",
  "/avatars/11475214.jpg",
  "/avatars/11475215.jpg",
];

const VoiceMockup = () => {
  const [userName, setUserName] = useState("User");
  const [userAvatar, setUserAvatar] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [wavePhase, setWavePhase] = useState(0);
  const requestRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("userName");
    if (stored) setUserName(stored);
    const avatarIdx = localStorage.getItem("userAvatar");
    if (avatarIdx !== null) setUserAvatar(Number(avatarIdx));
  }, []);

  // Waveform animasyonu
  useEffect(() => {
    if (!isPlaying) return;
    const animate = () => {
      setWavePhase((prev) => prev + 0.08);
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying]);

  // Waveform SVG path
  const getWavePath = (offset = 0) => {
    let path = "M0 24 ";
    for (let i = 0; i <= 300; i += 4) {
      const y = 24 + Math.sin(i / 18 + wavePhase + offset) * 10 * Math.sin(i / 60 + wavePhase / 2 + offset);
      path += `L${i} ${y} `;
    }
    return path;
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between bg-white font-inter" style={{minHeight: '100dvh'}}>
      {/* Header */}
      <div className="w-full flex flex-col items-center mt-8 mb-2">
        <div className="text-[22px] font-bold text-black">Hi {userName}</div>
        <div className="text-[15px] text-black/50 font-medium text-center max-w-xs mt-2">Describe your mission and i<br/>will help you make it happen</div>
      </div>
      {/* Avatar + Play/Pause */}
      <div className="flex flex-col items-center justify-center flex-1 w-full">
        <div className="relative flex flex-col items-center justify-center" style={{height: 244}}>
          <div className="w-[198px] h-[198px] rounded-full border border-[#BCBCCC] flex items-center justify-center">
            <img src={AVATAR_OPTIONS[userAvatar]} alt="avatar" className="w-[180px] h-[180px] rounded-full object-cover" />
          </div>
          <button
            className="absolute left-1/2 -translate-x-1/2 top-[152px] w-[92px] h-[92px] rounded-full bg-white shadow-lg flex items-center justify-center"
            style={{boxShadow: '0px 5px 58px 0px rgba(176,195,210,0.18)'}}
            onClick={() => setIsPlaying((v) => !v)}
          >
            {isPlaying ? <FiPause size={48} className="text-[#354052]" /> : <FiPlay size={48} className="text-[#354052]" />}
          </button>
        </div>
      </div>
      {/* Waveform + X + Translate Button */}
      <div className="w-full flex flex-col items-center mb-8 relative">
        <svg width="312" height="48" viewBox="0 0 312 48" fill="none" className="absolute left-1/2 -translate-x-1/2 top-0" style={{opacity: 0.7}}>
          <path d={getWavePath()} stroke="#295A95" strokeWidth="2.5" fill="none" opacity="0.8" strokeLinecap="round" />
          <path d={getWavePath(0.5)} stroke="#C1E0ED" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
        </svg>
        <button
          className="absolute right-6 top-6 w-[69px] h-[69px] rounded-full bg-[#007AFF] flex items-center justify-center shadow-lg"
          style={{outline: '0.04px #C1E0ED solid'}}
          onClick={() => setIsPlaying(false)}
        >
          <FiX size={36} className="text-white" />
        </button>
        <button
          className="mt-20 w-[220px] h-12 bg-black text-white rounded-full text-[16px] font-semibold shadow-lg"
          onClick={() => navigate('/chatbot')}
        >
          Text to Speech
        </button>
      </div>
    </div>
  );
};

export default VoiceMockup; 
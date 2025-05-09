import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { FiPlusCircle } from "react-icons/fi";

const GENDER_OPTIONS = ["Female", "Male", "Other"];
const AVATAR_OPTIONS = [
  "/avatars/11475205.jpg",
  "/avatars/11475214.jpg",
  "/avatars/11475215.jpg",
];
const COLOR_OPTIONS = [
  "bg-gradient-to-br from-[#FFF1BE] to-[#E69E12]",
  "bg-gradient-to-br from-[#FAFFE4] to-[#939529]",
  "bg-gradient-to-br from-[#ECEDC1] to-[#299540]",
  "bg-gradient-to-br from-[#C1E0ED] to-[#295A95]",
  "bg-gradient-to-br from-[#DAC1ED] to-[#5F2995]",
];
const VOICE_OPTIONS = [
  "Female",
  "Female (British Accent)",
  "Female (Indian Accent)",
  "Female (Tone 1)",
  "Female (Tone 2)",
  "Male",
  "Male (British Accent)",
  "Male (Indian Accent)",
  "Male (Tone 1)",
  "Male (Tone 2)",
];

// Realistic, professional audio waveform SVG (Figma style)
const REALISTIC_WAVEFORM = (
  <svg width="220" height="40" viewBox="0 0 220 40" fill="none">
    <path
      d="M2,20 Q8,10 16,20 T32,20 T48,30 64,20 T80,10 96,20 T112,30 128,20 T144,10 160,20 T176,30 192,20 T208,10 218,20"
      stroke="#295A95"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M2,22 Q8,32 16,22 T32,22 T48,12 64,22 T80,32 96,22 T112,12 128,22 T144,32 160,22 T176,12 192,22 T208,32 218,22"
      stroke="#C1E0ED"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

// Unique, professional audio waveform SVGs for each option
const VOICE_WAVEFORMS = {
  Female: (
    <svg width="220" height="40" viewBox="0 0 220 40" fill="none">
      <path
        d="M10,20 Q30,5 50,20 T90,20 T130,35 170,20 T210,20"
        stroke="#295A95"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M10,25 Q30,40 50,25 T90,25 T130,10 170,25 T210,25"
        stroke="#C1E0ED"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  ),
  "Female (British Accent)": (
    <svg width="220" height="40" viewBox="0 0 220 40" fill="none">
      <path
        d="M10,20 Q40,35 70,20 T130,20 T190,35 210,20"
        stroke="#A1B8E6"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M10,20 Q40,5 70,20 T130,20 T190,5 210,20"
        stroke="#C1E0ED"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  ),
  "Female (Indian Accent)": (
    <svg width="220" height="40" viewBox="0 0 220 40" fill="none">
      <path
        d="M10,20 Q40,10 70,20 T130,20 T190,10 210,20"
        stroke="#E6A1B8"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M10,20 Q40,30 70,20 T130,20 T190,30 210,20"
        stroke="#C1E0ED"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  ),
  "Female (Tone 1)": (
    <svg width="220" height="40" viewBox="0 0 220 40" fill="none">
      <path
        d="M10,20 Q40,35 70,20 T130,20 T190,35 210,20"
        stroke="#B8E6A1"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M10,20 Q40,5 70,20 T130,20 T190,5 210,20"
        stroke="#C1E0ED"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  ),
  "Female (Tone 2)": (
    <svg width="220" height="40" viewBox="0 0 220 40" fill="none">
      <path
        d="M10,20 Q40,20 70,20 T130,20 T190,20 210,20"
        stroke="#E6D3A1"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M10,25 Q40,25 70,25 T130,25 T190,25 210,25"
        stroke="#C1E0ED"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  ),
  Male: (
    <svg width="220" height="40" viewBox="0 0 220 40" fill="none">
      <path
        d="M10,20 Q30,35 50,20 T90,20 T130,5 170,20 T210,20"
        stroke="#295A95"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M10,15 Q30,0 50,15 T90,15 T130,30 170,15 T210,15"
        stroke="#C1E0ED"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  ),
  "Male (British Accent)": (
    <svg width="220" height="40" viewBox="0 0 220 40" fill="none">
      <path
        d="M10,30 Q40,10 70,30 T130,30 T190,10 210,30"
        stroke="#A1E6E6"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M10,35 Q40,15 70,35 T130,35 T190,15 210,35"
        stroke="#C1E0ED"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  ),
  "Male (Indian Accent)": (
    <svg width="220" height="40" viewBox="0 0 220 40" fill="none">
      <path
        d="M10,30 Q40,35 70,30 T130,30 T190,35 210,30"
        stroke="#E6A1E6"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M10,35 Q40,40 70,35 T130,35 T190,40 210,35"
        stroke="#C1E0ED"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  ),
  "Male (Tone 1)": (
    <svg width="220" height="40" viewBox="0 0 220 40" fill="none">
      <path
        d="M10,10 Q40,35 70,10 T130,10 T190,35 210,10"
        stroke="#A1E6B8"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M10,15 Q40,40 70,15 T130,15 T190,40 210,15"
        stroke="#C1E0ED"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  ),
  "Male (Tone 2)": (
    <svg width="220" height="40" viewBox="0 0 220 40" fill="none">
      <path
        d="M10,20 Q40,20 70,20 T130,20 T190,20 210,20"
        stroke="#E6B8A1"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M10,25 Q40,25 70,25 T130,25 T190,25 210,25"
        stroke="#C1E0ED"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  ),
};

const Questionnaire2 = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState("Male");
  const [avatar, setAvatar] = useState(0);
  const [color, setColor] = useState(3);
  const [voice, setVoice] = useState("Male");

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center font-libre-franklin">
      {/* Header */}
      <div
        className="w-full max-w-md mx-auto flex flex-row items-center justify-between px-4 pt-2 pb-2"
        style={{ height: 44 }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-8 h-8 bg-[#F7F8FA] rounded-md"
        >
          <IoChevronBack size={24} className="text-black" />
        </button>
        <span className="text-[18px] font-bold text-black font-inter">
          Questionnaire
        </span>
        <button
          onClick={() => {
            /* skip fonksiyonu */
          }}
          className="text-[#C1E0ED] text-[17px] font-semibold font-inter"
        >
          skip
        </button>
      </div>
      {/* Description */}
      <div className="w-full max-w-md px-4 mb-2">
        <div className="text-[14px] text-black/50 font-heebo font-medium leading-5">
          Please answer a few questions so we can customize your avatar and
          improve your experience.
        </div>
      </div>
      {/* Main Card */}
      <div className="w-full max-w-md flex flex-col items-center gap-6 px-4">
        <div className="w-full text-[20px] font-medium text-black font-inter mb-2">
          Customize your avatar
        </div>
        {/* Gender Selection */}
        <div className="w-full bg-[#DAE2EB55] border border-[#DBE3EC] rounded-xl p-4 flex flex-col gap-4">
          <div className="text-[14px] font-semibold text-black font-inter">
            Select gender
          </div>
          <div className="flex flex-col gap-3">
            {GENDER_OPTIONS.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-3 cursor-pointer"
              >
                <span
                  className={`w-5 h-5 flex items-center justify-center rounded-full border ${gender === opt ? "bg-[#F9F5FF] border-[#C1E0ED]" : "bg-white border-[#D0D5DD]"}`}
                >
                  {gender === opt && (
                    <span className="w-2 h-2 rounded-full bg-gradient-to-br from-[#C1E0ED] to-[#295A95]" />
                  )}
                </span>
                <input
                  type="radio"
                  className="hidden"
                  checked={gender === opt}
                  onChange={() => setGender(opt)}
                />
                <span className="text-[13px] font-medium text-black font-inter">
                  {opt}
                </span>
              </label>
            ))}
          </div>
        </div>
        {/* Avatar Selection */}
        <div className="w-full bg-[#DAE2EB55] border border-[#DBE3EC] rounded-xl p-4 flex flex-col gap-4">
          <div className="text-[14px] font-semibold text-black font-inter mb-2">
            Choose your avatar
          </div>
          <div className="flex flex-row flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 w-full justify-start">
            {AVATAR_OPTIONS.map((src, idx) => (
              <div key={src} className="relative flex flex-col items-center">
                <button
                  onClick={() => { setAvatar(idx); localStorage.setItem('userAvatar', idx); }}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white shadow-md flex items-center justify-center border-2 transition-all duration-150 ${avatar === idx ? 'border-[#295A95]' : 'border-[#E0E0E0]'}`}
                  style={{ position: 'relative' }}
                >
                  <img
                    src={src}
                    alt={`avatar${idx + 1}`}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                  />
                  {/* Radio overlay */}
                  <span
                    className={`absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center bg-white ${avatar === idx ? "border-[#295A95]" : "border-[#D0D5DD]"}`}
                  >
                    {avatar === idx && (
                      <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#295A95] border-2 border-white" />
                    )}
                  </span>
                </button>
              </div>
            ))}
            {/* Plus icon for add avatar */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#C1E0ED] flex items-center justify-center bg-white">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <circle
                    cx="16"
                    cy="16"
                    r="15"
                    stroke="#C1E0ED"
                    strokeWidth="2"
                    fill="#fff"
                  />
                  <path
                    d="M16 10v12M10 16h12"
                    stroke="#C1E0ED"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* Theme Color Selection */}
        <div className="w-full bg-[#DAE2EB55] border border-[#DBE3EC] rounded-xl p-4 flex flex-col gap-4">
          <div className="text-[14px] font-semibold text-black font-inter">
            Choose a theme color
          </div>
          <div className="flex flex-row items-center gap-4">
            {COLOR_OPTIONS.map((cls, idx) => (
              <button
                key={idx}
                onClick={() => { setColor(idx); localStorage.setItem('themeColor', idx); }}
                className={`w-11 h-11 rounded-full border flex items-center justify-center ${color === idx ? 'border-[#C1E0ED] border-2' : 'border-[#D0D5DD] border'} transition-all`}
              >
                <span className={`w-10 h-10 rounded-full block ${cls}`} />
                {color === idx && (
                  <span className="absolute w-3 h-3 rounded-full border-2 border-[#C1E0ED]" />
                )}
              </button>
            ))}
          </div>
        </div>
        {/* Voice Selection */}
        <div className="w-full bg-[#DAE2EB55] border border-[#DBE3EC] rounded-xl p-4 flex flex-col gap-4">
          <div className="text-[14px] font-semibold text-black font-inter">
            Select a voice
          </div>
          <div className="flex flex-col gap-3">
            {VOICE_OPTIONS.map((opt, idx) => (
              <React.Fragment key={opt}>
                <label className="flex items-center gap-3 cursor-pointer">
                  <span
                    className={`w-5 h-5 flex items-center justify-center rounded-full border ${voice === opt ? "bg-[#F9F5FF] border-[#C1E0ED]" : "bg-white border-[#D0D5DD]"}`}
                  >
                    {voice === opt && (
                      <span className="w-2 h-2 rounded-full bg-gradient-to-br from-[#C1E0ED] to-[#295A95]" />
                    )}
                  </span>
                  <input
                    type="radio"
                    className="hidden"
                    checked={voice === opt}
                    onChange={() => setVoice(opt)}
                  />
                  <span className="text-[13px] font-medium text-black font-inter">
                    {opt}
                  </span>
                </label>
                {/* Show unique waveform only for selected option */}
                {voice === opt && (
                  <div className="mt-2 mb-1">{VOICE_WAVEFORMS[opt]}</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6 pt-6 pb-4 mt-6">
        {/* Progress */}
        <div className="w-full flex flex-col gap-2 items-center">
          <div className="w-full flex items-center justify-between px-4">
            <span className="text-[14px] text-[#A69E9E] font-semibold font-inter">
              Progress
            </span>
            <span className="text-[13px] text-[#A69E9E] font-semibold font-inter">
              2 of 2
            </span>
          </div>
          <div className="w-full px-4 flex flex-col gap-1">
            <div className="w-full h-2 bg-[#E2EAF2] rounded-full relative overflow-hidden">
              <div
                className="absolute left-0 top-0 h-2 rounded-full bg-gradient-to-r from-[#C1E0ED] to-[#295A95] border border-[#2070C8]"
                style={{ width: "50%" }}
              />
              <div
                className="absolute left-1/2 top-0 h-2 rounded-full bg-gradient-to-r from-[#C1E0ED] to-[#295A95] border border-[#2070C8]"
                style={{ width: "50%" }}
              />
            </div>
          </div>
        </div>
        {/* Finish Button */}
        <button
          className="w-[327px] h-14 bg-black text-white rounded-lg text-[15px] font-medium font-inter"
          onClick={() => navigate("/main")}
        >
          Finish
        </button>
        {/* iOS Bar */}
        <div className="w-[134px] h-[5px] bg-[#060606] rounded-full mt-2" />
      </div>
    </div>
  );
};

export default Questionnaire2;

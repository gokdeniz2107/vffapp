import React from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-end"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #22113A 0%, #181024 80%, #0B0612 100%)',
      }}
    >
      {/* Telefon mockup - Figma'ya yakın, altı fade-out bitişli */}
      <div className="flex flex-col items-center justify-end flex-1 w-full" style={{ minHeight: 600 }}>
        <div style={{
          width: 285,
          height: 581,
          borderRadius: 56,
          background: 'linear-gradient(180deg, #181024 80%, rgba(24,16,36,0.0) 100%)',
          boxShadow: '0 8px 32px 0 #0008',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: 32,
        }}>
          {/* İç ekran koyu mor */}
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: 56,
            background: 'linear-gradient(180deg, #181024 70%, #0B0612 100%)',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 1,
          }} />
          {/* Alt fade-out efekti */}
          <div style={{
            position: 'absolute',
            left: 0,
            bottom: -40,
            width: '100%',
            height: 80,
            background: 'radial-gradient(ellipse at 50% 100%, rgba(24,16,36,0.7) 0%, rgba(24,16,36,0.0) 100%)',
            zIndex: 2,
          }} />
        </div>
        {/* Slider dotları */}
        <div className="flex gap-1 mt-6 mb-8">
          <div className="w-2 h-2 bg-[#6844E9] rounded-full" />
          <div className="w-2 h-2 bg-[#D2D6DB] rounded-full" />
          <div className="w-2 h-2 bg-[#D2D6DB] rounded-full" />
        </div>
      </div>
      {/* Alt metinler ve buton */}
      <div className="w-full flex flex-col items-center gap-8 pb-8">
        <div className="flex flex-col items-center gap-3">
          <div className="text-white text-[28px] font-lato font-normal leading-[42px] text-center">Welcome to VFF</div>
          <div className="text-white text-[17px] font-lato font-normal leading-[24px] text-center max-w-xs sm:max-w-md">
            We're excited to have you on board.<br />Here are a few steps to help you get started
          </div>
        </div>
        <button
          className="w-[90vw] max-w-md h-14 bg-[#6844E9] rounded-xl flex items-center justify-center text-white text-[18px] font-inter font-bold shadow-lg transition-all hover:opacity-90"
          style={{ minWidth: 200 }}
          onClick={() => navigate('/login')}
        >
          Next
        </button>
      </div>
      {/* Alt bar */}
      <div className="w-[134px] h-[5px] bg-white/80 rounded-full mb-4" />
    </div>
  );
};

export default Onboarding; 
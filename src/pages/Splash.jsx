import React from 'react';
import { useNavigate } from 'react-router-dom';

const Splash = () => {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #181024 0%, #120B1C 70%, #0B0612 100%)'
      }}
      onClick={() => navigate('/onboarding')}
      role="button"
      tabIndex={0}
    >
      <img
        src="/logo.png"
        alt="Logo"
        style={{
          width: 64,
          height: 59,
          objectFit: 'contain',
          display: 'block',
          background: 'transparent',
        }}
      />
    </div>
  );
};

export default Splash;

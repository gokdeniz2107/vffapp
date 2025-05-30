import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebookF } from 'react-icons/fa';
import api from '../utils/api';

// X (Twitter) SVG ikonu
type XIconProps = {};
const XIcon: React.FC<XIconProps> = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect width="22" height="22" rx="6" fill="none" />
    <path d="M16.5 6.1L12.3 11.1L16.9 17H14.7L11.5 12.9L8.1 17H5.1L9.9 11.7L5.5 6.1H7.7L10.7 9.9L13.9 6.1H16.5ZM15.9 16.1L11.5 10.7L7.1 16.1H8.5L11.5 12.3L14.5 16.1H15.9ZM6.1 7.1L10.5 12.5L14.9 7.1H13.5L10.5 10.9L7.5 7.1H6.1Z" fill="#fff"/>
  </svg>
);

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [registerError, setRegisterError] = useState<string>("");
  const [registerLoading, setRegisterLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/ai-onboarding');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setRegisterError("");
    setRegisterLoading(true);
    try {
      const { data } = await api.post('/auth/register', { 
        email: registerEmail, 
        password: registerPassword 
      });
      localStorage.setItem('token', data.token);
      setShowRegister(false);
      navigate('/ai-onboarding');
    } catch (err: any) {
      setRegisterError(err.response?.data?.error || 'Registration failed');
    }
    setRegisterLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between font-inter" style={{background:'radial-gradient(ellipse at 50% 0%, #22113A 0%, #181024 70%, #0B0612 100%)'}}>
      {/* Üst boşluk ve başlık */}
      <div className="w-full max-w-md mx-auto flex flex-col items-center px-4 pt-12 pb-2">
        <div className="flex flex-col items-center gap-3 mb-8 mt-4">
          <div className="text-white text-[20px] font-bold leading-[30px] text-center">Welcome Back! <span role='img' aria-label='robot'>🤖</span></div>
          <div className="text-white text-[17px] font-normal leading-[24px] text-center max-w-xs">Log in to continue chatting with your AI assistant.</div>
        </div>
        {/* Form alanı */}
        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="flex flex-col gap-1">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-4 bg-transparent border border-[#2B2433] rounded-xl text-[17px] placeholder:text-[#D2D6DB] text-white focus:outline-none font-lato"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          {/* Password */}
          <div className="relative flex flex-col gap-1">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full px-4 py-4 bg-transparent border border-[#2B2433] rounded-xl text-[17px] placeholder:text-[#D2D6DB] text-white focus:outline-none font-lato"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D2D6DB]"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              {/* Eye icon */}
              {showPassword ? (
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" stroke="#D2D6DB" strokeWidth="1.5"/><circle cx="12" cy="12" r="3.5" stroke="#D2D6DB" strokeWidth="1.5"/></svg>
              ) : (
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" stroke="#D2D6DB" strokeWidth="1.5"/><circle cx="12" cy="12" r="3.5" stroke="#D2D6DB" strokeWidth="1.5"/><path d="M4 4L20 20" stroke="#D2D6DB" strokeWidth="1.5"/></svg>
              )}
            </button>
          </div>
          {/* Hata mesajı */}
          {error && <div className="text-red-400 text-center text-[15px]">{error}</div>}
          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(v => !v)}
                className="w-5 h-5 rounded-md border border-[#DCDCDC] bg-transparent accent-[#6844E9]"
              />
              <span className="text-white text-[15px] font-normal leading-[22px] font-inter">Remember Me</span>
            </label>
            <button type="button" className="text-white text-[15px] font-normal leading-[22px] underline underline-offset-2 font-inter opacity-80 hover:opacity-100">Forgot Password?</button>
          </div>
          {/* Log in butonu */}
          <button type="submit" className="w-full h-14 bg-[#6844E9] rounded-xl flex items-center justify-center text-white text-[18px] font-bold shadow-lg transition-all hover:opacity-90 mt-2">Log in</button>
        </form>
        {/* Or separator */}
        <div className="flex items-center w-full my-8">
          <div className="flex-1 h-px bg-[#22262F]" />
          <span className="mx-4 text-[13px] text-white font-bold font-lato">OR</span>
          <div className="flex-1 h-px bg-[#22262F]" />
        </div>
        {/* Social login */}
        <div className="w-full flex justify-between gap-4 mb-8">
          <button className="w-[70px] h-[56px] flex items-center justify-center bg-[#1A1E24] border border-[#4C4D56] rounded-2xl transition hover:shadow-md">
            <FcGoogle size={28} />
          </button>
          <button className="w-[70px] h-[56px] flex items-center justify-center bg-[#1A1E24] border border-[#4C4D56] rounded-2xl transition hover:shadow-md">
            <FaApple size={28} color="#fff" />
          </button>
          <button className="w-[70px] h-[56px] flex items-center justify-center bg-[#1A1E24] border border-[#4C4D56] rounded-2xl transition hover:shadow-md">
            <FaFacebookF size={28} color="#1877F2" />
          </button>
          <button className="w-[70px] h-[56px] flex items-center justify-center bg-[#1A1E24] border border-[#4C4D56] rounded-2xl transition hover:shadow-md">
            <XIcon />
          </button>
        </div>
        {/* Alt metin */}
        <div className="w-full text-center text-white text-[17px] font-normal leading-[24px] font-inter mb-4">
          Don't have an account?{' '}
          <button className="underline underline-offset-2 font-semibold" onClick={() => setShowRegister(true)}>Sign Up</button>
        </div>
      </div>
      {/* iOS bar */}
      <div className="w-[134px] h-[5px] bg-white/80 rounded-full mb-4" />
      {showRegister && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#181024] rounded-3xl p-8 flex flex-col items-center w-[340px] relative">
            <button className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl" onClick={() => setShowRegister(false)}>&times;</button>
            <div className="text-white text-[24px] font-bold mb-6">Create Account</div>
            <form className="w-full flex flex-col gap-5" onSubmit={handleRegister}>
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-4 bg-transparent border border-[#6844E9] rounded-xl text-[17px] placeholder:text-[#B6B0C2] text-white focus:outline-none font-lato"
                required
                value={registerEmail}
                onChange={e => setRegisterEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-4 bg-transparent border border-[#6844E9] rounded-xl text-[17px] placeholder:text-[#B6B0C2] text-white focus:outline-none font-lato"
                required
                value={registerPassword}
                onChange={e => setRegisterPassword(e.target.value)}
              />
              {registerError && <div className="text-red-400 text-center text-[15px]">{registerError}</div>}
              <button type="submit" disabled={registerLoading} className="w-full h-14 bg-[#6844E9] rounded-xl flex items-center justify-center text-white text-[18px] font-bold shadow-lg transition-all hover:opacity-90 mt-2 disabled:opacity-60">
                {registerLoading ? 'Creating...' : 'Sign Up'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login; 
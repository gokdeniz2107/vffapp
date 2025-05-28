import React from 'react';

const user = {
  name: 'Deniz',
  surname: 'Karadeniz',
  email: 'deniz@example.com',
  avatar: '/logo.png', // Varsa kullanıcı avatarı, yoksa default
};

const Profile = () => {
  return (
    <div className="min-h-screen w-full max-w-md mx-auto flex flex-col items-center justify-start pt-12 pb-24 bg-gradient-to-b from-[#1A0820] via-[#12001A] to-[#090013] font-inter">
      <div className="w-full flex flex-col items-center gap-6 px-4">
        <div className="w-full flex flex-col items-center gap-2 mb-6">
          <div className="text-white text-[24px] font-bold tracking-wide">Profilim</div>
        </div>
        <div className="w-full flex flex-col items-center gap-4 bg-gradient-to-br from-[#6844E9] via-[#352071] to-[#140923] rounded-2xl shadow-lg p-8 border border-[#4C3591]">
          <div className="w-24 h-24 rounded-full bg-[#251C35] border-4 border-[#FFD600] flex items-center justify-center mb-2">
            <img src={user.avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover" />
          </div>
          <div className="flex flex-col items-start gap-3 w-full max-w-xs">
            <div>
              <span className="text-[#FFD600] text-[14px] font-medium">Name:</span>
              <span className="text-white text-[17px] font-semibold ml-2">{user.name}</span>
            </div>
            <div>
              <span className="text-[#FFD600] text-[14px] font-medium">Surname:</span>
              <span className="text-white text-[17px] font-semibold ml-2">{user.surname}</span>
            </div>
            <div>
              <span className="text-[#FFD600] text-[14px] font-medium">E-mail:</span>
              <span className="text-white text-[17px] font-semibold ml-2">{user.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 
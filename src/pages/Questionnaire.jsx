import React, { useState } from 'react';

const LIFESTYLE_OPTIONS = [
  'Active',
  'Passive',
  'Domestic',
  'Traveling',
  'Other',
];
const INTEREST_OPTIONS = [
  'Trips',
  'Sport',
  'Music',
  'Books',
  'Technology',
  'Business',
  'Cooking',
  'Events',
  'Craftsmanship',
  'Other',
];
const TASK_OPTIONS = [
  'Daily tasks',
  'Appointment reminders',
  'Travel itinerary planning',
  'Diary management',
  'Shopping',
  'Other',
];

const Questionnaire = () => {
  const [lifestyle, setLifestyle] = useState(['Active', 'Traveling']);
  const [interests, setInterests] = useState(['Trips', 'Technology']);
  const [tasks, setTasks] = useState([
    'Daily tasks',
    'Appointment reminders',
    'Travel itinerary planning',
    'Shopping',
  ]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [comments, setComments] = useState('');

  const handleMultiSelect = (arr, setArr, value) => {
    setArr(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center font-libre-franklin">
      <div className="w-full max-w-md mx-auto flex flex-col items-center px-4 pt-2 pb-2 overflow-y-auto" style={{height: '100dvh'}}>
        {/* Header */}
        <div className="w-full flex items-center justify-between mt-4 mb-2">
          {/* <span className="text-[15px] font-semibold text-black/90 font-sans">9:41</span> */}
          <span className="text-[18px] font-bold text-black font-libre-franklin">Questionnaire</span>
          <button className="text-[#C1E0ED] text-[17px] font-semibold font-libre-franklin">skip</button>
        </div>
        {/* Açıklama */}
        <div className="w-full text-[14px] text-black/50 font-heebo font-medium leading-5 mb-4">Please answer a few questions so we can customize your avatar and improve your experience.</div>
        {/* Soru kutuları */}
        <div className="w-full flex flex-col gap-4 mb-6">
          {/* Soru 1 */}
          <div className="bg-[#DAE2EB55] border border-[#DBE3EC] rounded-xl p-4 flex flex-col gap-2">
            <span className="text-[12px] text-[#98ABC1] font-heebo font-bold">Question 1</span>
            <span className="text-[14px] font-semibold text-black font-libre-franklin">What is your name?</span>
            <input
              type="text"
              value={name}
              onChange={e => { setName(e.target.value); localStorage.setItem('userName', e.target.value); }}
              placeholder="Enter your full name"
              className="mt-2 w-full px-4 py-3 bg-white border border-[#D8DADC] rounded-lg text-[16px] placeholder:text-black/50 focus:outline-none font-libre-franklin"
            />
          </div>
          {/* Soru 2 */}
          <div className="bg-[#DAE2EB55] border border-[#DBE3EC] rounded-xl p-4 flex flex-col gap-2">
            <span className="text-[12px] text-[#98ABC1] font-heebo font-bold">Question 2</span>
            <span className="text-[14px] font-semibold text-black font-libre-franklin">What is your age?</span>
            <select
              value={age}
              onChange={e => setAge(e.target.value)}
              className="mt-2 w-full px-4 py-3 bg-white border border-[#D8DADC] rounded-lg text-[16px] text-black/50 font-libre-franklin focus:outline-none"
            >
              <option value="">Select an age</option>
              {[...Array(83)].map((_, i) => (
                <option key={i+18} value={i+18}>{i+18}</option>
              ))}
            </select>
          </div>
          {/* Soru 3 */}
          <div className="bg-[#DAE2EB55] border border-[#DBE3EC] rounded-xl p-4 flex flex-col gap-2">
            <span className="text-[12px] text-[#98ABC1] font-heebo font-bold">Question 3</span>
            <span className="text-[14px] font-semibold text-black font-libre-franklin">Choose your lifestyle</span>
            <span className="text-[12px] text-black/35 font-heebo font-medium">Multiple choice</span>
            <div className="flex flex-col gap-2 mt-2">
              {LIFESTYLE_OPTIONS.map(opt => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={lifestyle.includes(opt)}
                    onChange={() => handleMultiSelect(lifestyle, setLifestyle, opt)}
                    className="accent-[#C1E0ED] w-5 h-5 rounded-md border border-[#C1E0ED] bg-[#F5FCFF]"
                  />
                  <span className="text-[13px] font-medium text-black font-libre-franklin">{opt}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Soru 4 */}
          <div className="bg-[#DAE2EB55] border border-[#DBE3EC] rounded-xl p-4 flex flex-col gap-2">
            <span className="text-[12px] text-[#98ABC1] font-heebo font-bold">Question 4</span>
            <span className="text-[14px] font-semibold text-black font-libre-franklin">Choose your interests</span>
            <span className="text-[12px] text-black/35 font-heebo font-medium">Multiple choice</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {INTEREST_OPTIONS.map(opt => {
                const selected = interests.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleMultiSelect(interests, setInterests, opt)}
                    className={`px-4 py-2 rounded-lg border text-[12px] font-semibold font-libre-franklin transition-all ${selected ? 'bg-gradient-to-r from-[#C1E0ED] to-[#295A95] text-white border-[#C1E0ED]' : 'bg-[#F5FCFF] text-[#39699E] border-[#3E6DA1]'}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Soru 5 */}
          <div className="bg-[#DAE2EB55] border border-[#DBE3EC] rounded-xl p-4 flex flex-col gap-2">
            <span className="text-[12px] text-[#98ABC1] font-heebo font-bold">Question 5</span>
            <span className="text-[14px] font-semibold text-black font-libre-franklin">What tasks would you like to assign to your avatar?</span>
            <span className="text-[12px] text-black/35 font-heebo font-medium">Multiple choice</span>
            <div className="flex flex-col gap-2 mt-2">
              {TASK_OPTIONS.map(opt => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={tasks.includes(opt)}
                    onChange={() => handleMultiSelect(tasks, setTasks, opt)}
                    className="accent-[#C1E0ED] w-5 h-5 rounded-md border border-[#C1E0ED] bg-[#F5FCFF]"
                  />
                  <span className="text-[13px] font-medium text-black font-libre-franklin">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        {/* Yorum alanı */}
        <div className="w-full flex flex-col gap-2 mb-6">
          <span className="text-[20px] font-medium text-black font-libre-franklin">Add comments</span>
          <textarea
            value={comments}
            onChange={e => setComments(e.target.value)}
            placeholder="Additional comments"
            className="w-full min-h-[100px] px-4 py-3 bg-white border border-[#D8DADC] rounded-lg text-[14px] placeholder:text-black/35 font-libre-franklin focus:outline-none"
          />
        </div>
        {/* Progress ve Next */}
        <div className="w-full flex flex-col items-center gap-4 mb-4">
          <div className="w-full flex items-center justify-between">
            <span className="text-[14px] text-[#A69E9E] font-semibold font-libre-franklin">Progress</span>
            <span className="text-[13px] text-[#A69E9E] font-semibold font-libre-franklin">1 of 2</span>
          </div>
          <div className="w-full h-2 bg-[#E2EAF2] rounded-full relative overflow-hidden">
            <div className="absolute left-0 top-0 h-2 rounded-full bg-gradient-to-r from-[#C1E0ED] to-[#295A95] border border-[#2070C8]" style={{width: '50%'}} />
          </div>
          <button className="w-full h-14 bg-black text-white rounded-lg text-[15px] font-medium font-libre-franklin mt-2" onClick={() => window.location.href = '/questionnaire2'}>Next</button>
          <div className="w-[134px] h-[5px] bg-[#060606] rounded-full mt-4" />
        </div>
      </div>
    </div>
  );
};

export default Questionnaire; 
import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';

const steps = [
  {
    title: "Pick up clothes from dry cleaning",
    time: "Today, 2:15 PM",
    distance: "2,320m",
    icon: "P",
  },
  {
    title: "Buy a cake",
    time: "Today, 2:08 PM",
    distance: "1,43km",
    icon: "O",
  },
  {
    title: "Sign up for a dentist",
    time: "Today, 2:00 PM",
    distance: "540m",
    icon: "O",
  },
];

const DEFAULT_TASKS = [
  {
    title: "Pick up clothes from dry cleaning",
    position: [40.75, -73.8],
  },
  {
    title: "Buy a cake",
    position: [40.76, -73.82],
  },
  {
    title: "Sign up for a dentist",
    position: [40.77, -73.85],
  },
];

const RouteMockup = () => {
  const [started, setStarted] = useState(false);
  const navigate = useNavigate();
  const [taskLocations, setTaskLocations] = useState(DEFAULT_TASKS);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState([36.8969, 30.7133]); // Antalya default
  const [startAddress, setStartAddress] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  // Adres -> koordinat
  async function getCoordinates(query) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data && data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
    return null;
  }

  // İlk açılışta localStorage'dan startAddress oku ve koordinata çevir
  useEffect(() => {
    const addr = localStorage.getItem('startAddress');
    if (addr && addr.length > 0) {
      setStartAddress(addr);
      getCoordinates(addr).then(coords => {
        if (coords) {
          setUserLocation(coords);
        } else {
          // Adres koordinata çevrilemedi, tarayıcıdan konum al
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                setUserLocation([pos.coords.latitude, pos.coords.longitude]);
              },
              (err) => {
                console.warn('Konum alınamadı:', err);
                setUserLocation([36.8969, 30.7133]); // Antalya fallback
              },
              { enableHighAccuracy: true }
            );
          } else {
            setUserLocation([36.8969, 30.7133]); // Antalya fallback
          }
        }
      });
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.warn('Konum alınamadı:', err);
          setUserLocation([36.8969, 30.7133]); // Antalya fallback
        },
        { enableHighAccuracy: true }
      );
    } else {
      setUserLocation([36.8969, 30.7133]); // Antalya fallback
    }
  }, []);

  // Rota: kullanıcı konumu + task'lar
  const routeLine = [userLocation, ...taskLocations.map(t => t.position)];

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    setLoading(true);
    const coords = await getCoordinates(newTask);
    setLoading(false);
    if (coords) {
      setTaskLocations([...taskLocations, { title: newTask, position: coords }]);
      setNewTask("");
    } else {
      alert("Konum bulunamadı. Lütfen daha açık bir adres girin.");
    }
  };

  // AI öneri fonksiyonu
  const handleAIPrompt = async () => {
    if (!aiPrompt.trim() || aiLoading) return;
    setAiError("");
    setAiLoading(true);
    setAiResponse("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt, character: "professional" }),
      });
      const data = await res.json();
      if (data.result) {
        setAiResponse(data.result);
      } else {
        setAiError(data.error || "Unknown error");
      }
    } catch (err) {
      setAiError("Network error");
    }
    setAiLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#F7F8FA] font-inter">
      {/* Header */}
      <div className="w-full max-w-md mx-auto flex flex-col items-center pt-4 pb-2">
        <div className="w-full flex items-center justify-between mb-1 relative">
          <button className="w-9 h-9 flex items-center justify-center bg-[#F7F8FA] rounded-md border border-[#E2EAF2]" onClick={() => started ? setStarted(false) : navigate(-1)}>
            <FiChevronLeft size={24} className="text-black" />
          </button>
          <div className="flex-1 flex flex-col items-center">
            <div className="text-[20px] font-bold text-black">My route</div>
            <div className="text-[14px] text-black/50 font-medium mt-1">Perfect route taking into account traffic jams</div>
          </div>
          <div className="w-9 h-9" />
        </div>
      </div>
      {/* State: Plan başlatılmadı */}
      {!started ? (
        <>
          {/* Gerçek harita - react-leaflet ile */}
          <div className="w-[335px] h-[420px] rounded-3xl bg-white shadow-xl relative mt-2 mb-4 overflow-hidden flex items-center justify-center">
            <MapContainer center={userLocation} zoom={13} style={{ height: 400, width: 320, borderRadius: 24 }}>
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution="&copy; OpenStreetMap contributors & CartoDB"
              />
              {/* Kullanıcı konumu marker */}
              <Marker position={userLocation}>
                <Popup>Senin konumun</Popup>
              </Marker>
              {taskLocations.map((task, idx) => (
                <Marker key={idx} position={task.position}>
                  <Popup>{task.title}</Popup>
                </Marker>
              ))}
              <Polyline positions={routeLine} color="#295A95" weight={4} dashArray="8" />
            </MapContainer>
            {/* Harita üstü buton */}
            <button className="absolute left-4 bottom-4 w-12 h-12 rounded-full bg-[#292662] flex items-center justify-center shadow-lg">
              <span className="w-5 h-5 bg-white rounded-full block" />
            </button>
          </div>
          {/* AI Öneri kutusu */}
          <div className="w-full max-w-md flex flex-col items-center gap-2 mt-2 mb-2 px-4">
            <div className="w-full flex gap-2">
              <input
                type="text"
                value={aiPrompt}
                onChange={e => setAiPrompt(e.target.value)}
                placeholder="AI'dan rota/görev önerisi al..."
                className="flex-1 px-4 py-3 rounded-lg border border-[#E2EAF2] text-[15px] focus:outline-none shadow-sm bg-white"
                disabled={aiLoading}
              />
              <button
                onClick={handleAIPrompt}
                className="px-4 py-3 rounded-lg bg-[#295A95] text-white font-semibold disabled:opacity-60"
                disabled={aiLoading || !aiPrompt.trim()}
              >AI'ya Sor</button>
            </div>
            {aiLoading && <div className="w-full text-center text-[#295A95] text-[15px]">Yükleniyor...</div>}
            {aiError && <div className="w-full text-center text-red-500 text-[14px]">{aiError}</div>}
            {aiResponse && <div className="w-full text-center text-black text-[15px] bg-[#EAF6FF] rounded-lg p-3 mt-1">{aiResponse}</div>}
          </div>
          {/* Steps & buttons */}
          <div className="w-full max-w-md flex flex-col items-center bg-white rounded-t-3xl pt-4 pb-6 px-4 shadow-lg">
            <div className="w-full flex flex-col gap-4 mb-4">
              {taskLocations.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#295A95] bg-[#C1E0ED]`}>
                    ✓
                  </div>
                  <div className="flex-1">
                    <div className="text-[15px] font-semibold text-[#39699E] font-poppins">{step.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-[#999] font-poppins">Task</span>
                    </div>
                  </div>
                  {editMode && (
                    <button onClick={() => setTaskLocations(taskLocations.filter((_, i) => i !== idx))} className="p-2 text-red-500 hover:text-red-700"><FiTrash2 size={18} /></button>
                  )}
                </div>
              ))}
            </div>
            <div className="w-full flex gap-4 mt-2">
              <button className="flex-1 h-14 bg-[#292662] text-white rounded-lg text-[15px] font-medium shadow-lg transition-all hover:bg-[#222] active:scale-95" onClick={() => setStarted(true)}>Start</button>
              <button className="flex-1 h-14 bg-black text-white rounded-lg text-[15px] font-medium shadow-lg transition-all hover:bg-[#222] active:scale-95 flex items-center justify-center gap-2" onClick={() => setEditMode(e => !e)}><FiEdit2 size={18} />Edit</button>
            </div>
            <div className="w-[134px] h-[5px] bg-[#060606] rounded-full mt-6" />
          </div>
          <div className="w-full max-w-md flex flex-col items-center gap-2 mt-2 mb-2">
            <div className="flex w-full gap-2 px-4">
              <input
                type="text"
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
                placeholder="Yeni task veya adres girin..."
                className="flex-1 px-4 py-3 rounded-lg border border-[#E2EAF2] text-[15px] focus:outline-none shadow-sm bg-white"
                disabled={loading}
              />
              <button
                onClick={handleAddTask}
                className="px-4 py-3 rounded-lg bg-[#295A95] text-white font-semibold disabled:opacity-60"
                disabled={loading}
              >Ekle</button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Gerçek harita - react-leaflet ile (Finish state) */}
          <div className="w-[335px] h-[420px] rounded-3xl bg-white shadow-xl relative mt-2 mb-4 overflow-hidden flex items-center justify-center">
            <MapContainer center={userLocation} zoom={13} style={{ height: 400, width: 320, borderRadius: 24 }}>
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution="&copy; OpenStreetMap contributors & CartoDB"
              />
              {/* Kullanıcı konumu marker */}
              <Marker position={userLocation}>
                <Popup>Senin konumun</Popup>
              </Marker>
              {taskLocations.map((task, idx) => (
                <Marker key={idx} position={task.position}>
                  <Popup>{task.title}</Popup>
                </Marker>
              ))}
              <Polyline positions={routeLine} color="#295A95" weight={4} dashArray="8" />
            </MapContainer>
            {/* Harita üstü buton */}
            <button className="absolute left-4 bottom-4 w-12 h-12 rounded-full bg-[#292662] flex items-center justify-center shadow-lg">
              <span className="w-5 h-5 bg-white rounded-full block" />
            </button>
          </div>
          {/* AI Öneri kutusu */}
          <div className="w-full max-w-md flex flex-col items-center gap-2 mt-2 mb-2 px-4">
            <div className="w-full flex gap-2">
              <input
                type="text"
                value={aiPrompt}
                onChange={e => setAiPrompt(e.target.value)}
                placeholder="AI'dan rota/görev önerisi al..."
                className="flex-1 px-4 py-3 rounded-lg border border-[#E2EAF2] text-[15px] focus:outline-none shadow-sm bg-white"
                disabled={aiLoading}
              />
              <button
                onClick={handleAIPrompt}
                className="px-4 py-3 rounded-lg bg-[#295A95] text-white font-semibold disabled:opacity-60"
                disabled={aiLoading || !aiPrompt.trim()}
              >AI'ya Sor</button>
            </div>
            {aiLoading && <div className="w-full text-center text-[#295A95] text-[15px]">Yükleniyor...</div>}
            {aiError && <div className="w-full text-center text-red-500 text-[14px]">{aiError}</div>}
            {aiResponse && <div className="w-full text-center text-black text-[15px] bg-[#EAF6FF] rounded-lg p-3 mt-1">{aiResponse}</div>}
          </div>
          {/* Steps (tamamlandı) & Finish butonu */}
          <div className="w-full max-w-md flex flex-col items-center bg-white rounded-t-3xl pt-4 pb-6 px-4 shadow-lg">
            <div className="w-full flex flex-col gap-4 mb-4">
              {taskLocations.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#295A95] bg-[#C1E0ED]">
                    ✓
                  </div>
                  <div className="flex-1">
                    <div className="text-[15px] font-semibold text-[#39699E] font-poppins line-through">{step.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-[#999] font-poppins">Completed</span>
                    </div>
                  </div>
                  {editMode && (
                    <button onClick={() => setTaskLocations(taskLocations.filter((_, i) => i !== idx))} className="p-2 text-red-500 hover:text-red-700"><FiTrash2 size={18} /></button>
                  )}
                </div>
              ))}
            </div>
            <div className="w-full flex gap-4 mt-2">
              <button className="flex-1 h-14 bg-black text-white rounded-lg text-[15px] font-medium shadow-lg transition-all hover:bg-[#222] active:scale-95" >Finish</button>
              <button className="flex-1 h-14 bg-black text-white rounded-lg text-[15px] font-medium shadow-lg transition-all hover:bg-[#222] active:scale-95 flex items-center justify-center gap-2" onClick={() => setEditMode(e => !e)}><FiEdit2 size={18} />Edit</button>
            </div>
            <div className="w-[134px] h-[5px] bg-[#060606] rounded-full mt-6" />
          </div>
        </>
      )}
    </div>
  );
};

export default RouteMockup; 
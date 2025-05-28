import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '45vh'
};

const center = {
  lat: 36.8969,
  lng: 30.7133
};

const PANEL_POSITIONS = {
  closed: window.innerHeight - 100,
  half: window.innerHeight / 2,
  open: 120
};

const purpleMapStyle = [
  { "elementType": "geometry", "stylers": [{ "color": "#1A1625" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#251C35" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#6844E9" }] },
  { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#251C35" }] },
  { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#6844E9" }, { "weight": 1 }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#1A1625" }] },
  { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#251C35" }] },
  { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#251C35" }] },
  { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#251C35" }] },
  { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#1A1625" }] }
];

const RouteMockup = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [directions, setDirections] = useState(null);
  const [panelPosition, setPanelPosition] = useState(PANEL_POSITIONS.half);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startPanelY, setStartPanelY] = useState(PANEL_POSITIONS.half);
  const [map, setMap] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [showLocationError, setShowLocationError] = useState(false);
  const [routeInfo, setRouteInfo] = useState(null);
  const [showAiAdvice, setShowAiAdvice] = useState(false);
  const [aiAdvice, setAiAdvice] = useState("");
  const [mapCenter, setMapCenter] = useState(center);
  const [hasCentered, setHasCentered] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [aiAdviceBubble, setAiAdviceBubble] = useState(null);
  const [aiAdviceRoute, setAiAdviceRoute] = useState(null);

  // Görevleri backend'den çek
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const res = await fetch("http://localhost:4000/tasks", {
          headers: { 'Authorization': `Bearer ${token}` }
        });
    const data = await res.json();
        setTasks(Array.isArray(data) ? data : []);
      } catch (err) {
        setTasks([]);
      }
    };
    fetchTasks();
  }, [navigate]);

  // Görevlerin nasıl geldiğini logla
  useEffect(() => {
    console.log("Gelen görevler:", tasks);
  }, [tasks]);

  // Görev silme fonksiyonu
  const handleDeleteTask = async (id) => {
    await fetch(`http://localhost:4000/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(t => t._id !== id));
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  // Calculate directions when map loads
  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance);
    if (tasks.length >= 2 && window.google) {
      const waypoints = tasks.slice(1, -1).map(task => ({
        location: task.location,
        stopover: true
      }));

      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: tasks[0].location,
          destination: tasks[tasks.length - 1].location,
          waypoints: waypoints,
          travelMode: window.google.maps.TravelMode.DRIVING,
          optimizeWaypoints: true
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
  }
        }
      );
    }
  };

  // Panel drag handlers (mouse + touch)
  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartY(e.touches ? e.touches[0].clientY : e.clientY);
    setStartPanelY(panelPosition);
    document.body.style.userSelect = 'none';
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = clientY - startY;
    let newPos = startPanelY + deltaY;
    newPos = Math.max(PANEL_POSITIONS.open, Math.min(PANEL_POSITIONS.closed, newPos));
    setPanelPosition(newPos);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    document.body.style.userSelect = '';
    // Snap to nearest position
    const distances = Object.values(PANEL_POSITIONS).map(pos => Math.abs(panelPosition - pos));
    const minIdx = distances.indexOf(Math.min(...distances));
    setPanelPosition(Object.values(PANEL_POSITIONS)[minIdx]);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('touchend', handleDragEnd);
        } else {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging]);

  // Update task with AI
  const updateTaskWithAI = async (taskId) => {
    try {
      const response = await fetch('/api/ai/update-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskId,
          currentTasks: tasks
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setTasks(prevTasks => prevTasks.map(task => 
          task._id === taskId ? { ...task, ...data.updatedTask } : task
        ));
      }
    } catch (error) {
      console.error('AI update failed:', error);
    }
  };

  // Update directions when tasks change
  useEffect(() => {
    if (map && tasks.length >= 2 && window.google) {
      const waypoints = tasks.slice(1, -1).map(task => ({
        location: task.location,
        stopover: true
      }));
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: tasks[0].location,
          destination: tasks[tasks.length - 1].location,
          waypoints: waypoints,
          travelMode: window.google.maps.TravelMode.DRIVING,
          optimizeWaypoints: true
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
          } else {
            setDirections(null);
          }
        }
      );
    } else {
      setDirections(null);
    }
  }, [tasks, map]);

  // Calculate dynamic map height based on panel position
  const mapHeight = `${Math.max(120, panelPosition)}px`;

  // Yardımcı: location'ı her zaman obje olarak döndür
  function ensureLatLng(obj) {
    if (!obj) return null;
    if (typeof obj === 'string') {
      try {
        const parsed = JSON.parse(obj);
        if (parsed && typeof parsed.lat === 'number' && typeof parsed.lng === 'number') return parsed;
        return null;
      } catch {
        return null;
        }
    }
    if (typeof obj.lat === 'number' && typeof obj.lng === 'number') return obj;
    return null;
  }

  // Start butonuna tıklanınca
  const handleStartTask = (task) => {
    const safeUserLoc = ensureLatLng(userLocation);
    const safeTaskLoc = ensureLatLng(task.location);
    if (!safeUserLoc || !safeTaskLoc) {
      setShowLocationError(true);
      return;
    }
    setActiveTask(task);
    // Directions API ile rota ve alternatifleri hesapla
    if (window.google) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: safeUserLoc,
          destination: safeTaskLoc,
          travelMode: window.google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true
        },
        (result, status) => {
          if (status === "OK" && result.routes.length > 1) {
            setDirections(result); // Varsayılanı göster
            const leg = result.routes[0].legs[0];
            setRouteInfo({
              duration: leg.duration.text,
              distance: leg.distance.text
            });
            setTimeout(() => {
              setAiAdviceBubble({
                message: "AI Suggestion: Trafiği atlamak için alternatif bir rota buldum! Uygulamak ister misin?",
                hasShortcut: true
              });
              setAiAdviceRoute({
                origin: safeUserLoc,
                destination: safeTaskLoc,
                travelMode: window.google.maps.TravelMode.DRIVING,
                routeIndex: 1 // Alternatif rota
              });
            }, 1500);
          } else if (status === "OK") {
            setDirections(result);
            const leg = result.routes[0].legs[0];
            setRouteInfo({
              duration: leg.duration.text,
              distance: leg.distance.text
            });
            setAiAdviceBubble(null);
          }
        }
      );
    }
  };

  // Canlı konum takibi: Sayfa açıldığında ve açıkken konumu sürekli al
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLocationError(false);
        },
        (err) => {
          setLocationError(true);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  // userLocation ilk geldiğinde harita merkezini bir kez ayarla
  useEffect(() => {
    if (userLocation && !hasCentered) {
      setMapCenter(userLocation);
      setHasCentered(true);
    }
  }, [userLocation, hasCentered]);

  // userLocation değiştikçe konsola yaz
  useEffect(() => {
    console.log("userLocation:", userLocation);
  }, [userLocation]);

  return (
    <div className="min-h-screen bg-[#1A1625] flex flex-col">
      {/* Header */}
      <div className="px-4 py-4">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="text-white p-2"
          >
            <FiChevronLeft size={24} />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-white text-xl font-bold">My route</h1>
            <p className="text-gray-400 text-sm">Perfect route taking into account traffic jams</p>
          </div>
          <div className="w-8" />
        </div>
      </div>

      {/* Map */}
      <LoadScript googleMapsApiKey="AIzaSyBCE4VaasW2r-ZXfUXx0f6Hk5MnSfg1AS0">
        <div style={{ width: '100%', height: mapHeight, transition: 'height 0.3s cubic-bezier(.4,1.5,.5,1)' }}>
          {/* Konumuma Git butonu */}
          <button
            onClick={() => userLocation && setMapCenter(userLocation)}
            className="absolute z-50 right-6 top-6 bg-[#6844E9] text-white px-4 py-2 rounded-xl shadow-lg font-bold hover:bg-[#7c5be6] transition-all"
            style={{boxShadow: '0 2px 8px #6844E980'}}
          >
            Konumuma Git
          </button>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={mapCenter}
            zoom={14}
            onLoad={handleMapLoad}
            options={{
              styles: purpleMapStyle
            }}
          >
            {/* Konum yükleniyor spinnerı ve placeholder marker */}
            {!ensureLatLng(userLocation) && !locationError && (
              <>
                <div style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)',zIndex:1000}}>
                  <div className="flex flex-col items-center gap-2">
                    <svg className="animate-spin" width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" stroke="#6844E9" strokeWidth="6" opacity="0.2"/><path d="M44 24a20 20 0 0 1-20 20" stroke="#6844E9" strokeWidth="6" strokeLinecap="round"/></svg>
                    <span className="text-[#6844E9] text-lg font-bold mt-2">Loading location...</span>
                  </div>
          </div>
                {/* Placeholder marker (gri) */}
                <Marker position={mapCenter} icon={{
                  url: "data:image/svg+xml;utf8,<svg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='24' cy='24' r='20' fill='%23B6B0C2' stroke='white' stroke-width='4'/><circle cx='24' cy='24' r='8' fill='white'/></svg>",
                  scaledSize: { width: 48, height: 48 }
                }} />
              </>
            )}
            {ensureLatLng(userLocation) && (
              <Marker position={ensureLatLng(userLocation)} icon={{
                url: "data:image/svg+xml;utf8,<svg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='24' cy='24' r='20' fill='%23FF3B30' stroke='white' stroke-width='4'/><circle cx='24' cy='24' r='8' fill='white'/></svg>",
                scaledSize: { width: 48, height: 48 }
              }} />
            )}
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  polylineOptions: {
                    strokeColor: "#FFD600",
                    strokeWeight: 4
                  }
                }}
              />
            )}
          </GoogleMap>
            </div>
      </LoadScript>

      {/* Sliding Task Panel */}
      <div 
        className="fixed left-0 right-0 bg-[#251C35] rounded-t-[20px] shadow-lg z-50"
        style={{
          top: `${panelPosition}px`,
          height: `calc(100vh - ${panelPosition}px)`,
          transition: isDragging ? 'none' : 'top 0.3s cubic-bezier(.4,1.5,.5,1)',
          touchAction: 'none',
        }}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <div className="w-full p-5 flex flex-col items-center gap-8">
          <div className="w-[45px] h-[5px] bg-[#D9D9D9] rounded-[10px] cursor-pointer" />
          
          {/* Tasks List */}
          <div className="w-full flex flex-col gap-5">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-[#0E0515] rounded-xl border border-[#6844E9] p-6 flex flex-col gap-6 relative"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full border border-[#6844E9] flex items-center justify-center">
                    {task.completed && (
                      <div className="w-3.5 h-3.5 bg-[#6844E9] rounded-full" />
                    )}
          </div>
                  <span className={`text-white text-[17px] ${task.completed ? 'font-normal' : 'font-bold'}`}>{task.title}</span>
                  <div className="flex items-center gap-3 ml-auto">
                    <button
                      className="px-4 py-2 rounded-xl bg-[#6844E9] text-white font-bold text-[15px] hover:opacity-90 transition-all"
                      onClick={() => handleStartTask(task)}
                    >
                      Start
                    </button>
                    <button
                      className="text-[#6844E9] hover:text-red-500 transition-colors"
                      onClick={e => { e.stopPropagation(); setTaskToDelete(task); setShowDeleteModal(true); }}
                      title="Delete task"
                      style={{marginLeft: 8}}
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white text-[17px]">{task.status}</span>
                  <span className="text-[#6844E9] text-[15px]">{task.time}</span>
                    </div>
                {task.current && (
                  <>
                    <div className="w-[42px] h-[58px] bg-[#6844E9]" />
                    <div className="text-white text-[10px] text-center">NOW</div>
                  </>
                )}
                {activeTask && activeTask._id === task._id && routeInfo && (
                  <div className="mt-3 text-[#FFD600] text-[15px] font-bold">ETA: {routeInfo.duration} ({routeInfo.distance})</div>
                )}
                {activeTask && activeTask._id === task._id && showAiAdvice && (
                  <div className="absolute right-0 bottom-[-60px] animate-bounce">
                    <button onClick={() => alert(aiAdvice)} className="bg-[#6844E9] text-white px-4 py-2 rounded-2xl shadow-lg font-bold">AI Advice</button>
                  </div>
                  )}
                </div>
              ))}
            </div>

          {/* Finish Button */}
              <button
            className="w-full h-[56px] bg-[#6844E9] rounded-xl text-white text-[18px] font-bold"
            onClick={() => setPanelPosition(PANEL_POSITIONS.closed)}
          >
            finish
          </button>
            </div>
          </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && taskToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
          <div className="bg-[#181024] rounded-3xl p-8 flex flex-col items-center w-[324px]">
            <div className="text-white text-[22px] font-bold mb-6 flex items-center gap-2">Are you sure you want to delete this task?</div>
            <div className="flex gap-4 mt-2">
              <button onClick={() => handleDeleteTask(taskToDelete._id)} className="px-6 py-2 rounded-xl bg-[#6844E9] text-white font-bold">Yes</button>
              <button onClick={() => { setShowDeleteModal(false); setTaskToDelete(null); }} className="px-6 py-2 rounded-xl bg-[#251C35] text-white font-bold border border-[#6844E9]">No</button>
            </div>
                    </div>
                  </div>
      )}

      {/* Konum alınamazsa uyarı modalı */}
      {locationError && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
          <div className="bg-[#181024] rounded-3xl p-8 flex flex-col items-center w-[324px]">
            <div className="text-white text-[22px] font-bold mb-6 flex items-center gap-2">Location not found!</div>
            <div className="text-[#FFD600] text-[16px] mb-4 text-center">Please allow location access in your browser and refresh the page.</div>
            <button onClick={()=>window.location.reload()} className="px-6 py-2 rounded-xl bg-[#6844E9] text-white font-bold">Refresh</button>
          </div>
        </div>
      )}

      {/* AI Advice baloncuğu */}
      {aiAdviceBubble && (
        <div style={{
          position: 'fixed',
          top: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          background: 'linear-gradient(135deg, #6844E9 60%, #A084E8 100%)',
          color: '#fff',
          borderRadius: 20,
          boxShadow: '0 4px 24px #6844E966',
          padding: 32,
          minWidth: 320,
          maxWidth: 420,
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 500,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16
        }}>
          <span>{aiAdviceBubble.message}</span>
          {aiAdviceBubble.hasShortcut && (
            <button
              style={{
                marginTop: 12,
                background: '#fff',
                color: '#6844E9',
                border: 'none',
                borderRadius: 8,
                padding: '8px 24px',
                fontWeight: 600,
                fontSize: 17,
                cursor: 'pointer',
                boxShadow: '0 2px 8px #6844E966'
              }}
              onClick={() => {
                if (window.google && aiAdviceRoute) {
                  const directionsService = new window.google.maps.DirectionsService();
                  directionsService.route(
                    {
                      origin: aiAdviceRoute.origin,
                      destination: aiAdviceRoute.destination,
                      travelMode: aiAdviceRoute.travelMode,
                      provideRouteAlternatives: true
                    },
                    (result, status) => {
                      if (status === "OK" && result.routes[aiAdviceRoute.routeIndex]) {
                        setDirections({
                          ...result,
                          routes: [result.routes[aiAdviceRoute.routeIndex]]
                        });
                        // ETA bilgisini de güncelle
                        const leg = result.routes[aiAdviceRoute.routeIndex].legs[0];
                        setRouteInfo({
                          duration: leg.duration.text,
                          distance: leg.distance.text
                        });
                        setAiAdviceBubble(null);
                      }
                    }
                  );
                }
              }}
            >
              Uygula
            </button>
          )}
          <button
            style={{
              marginTop: 8,
              background: 'transparent',
              color: '#fff',
              border: '1px solid #fff',
              borderRadius: 8,
              padding: '6px 18px',
              fontWeight: 500,
              fontSize: 15,
              cursor: 'pointer',
              opacity: 0.7
            }}
            onClick={() => setAiAdviceBubble(null)}
          >
            Kapat
          </button>
        </div>
      )}
    </div>
  );
};

export default RouteMockup; 
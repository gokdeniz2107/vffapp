import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Questionnaire from "./pages/Questionnaire";
import VoiceMockup from "./pages/VoiceMockup";
import RouteMockup from "./pages/RouteMockup";
import Diary from "./pages/Diary";
import Calendar from "./pages/Calendar";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import AiOnboarding from "./pages/AiOnboarding";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Notifications from "./pages/Notifications";
import VoiceRecorder from "./pages/VoiceRecorder";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ai-onboarding" element={<AiOnboarding />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/voice" element={<VoiceMockup />} />
        <Route path="/route" element={<RouteMockup />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/voice-recorder" element={<VoiceRecorder />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;

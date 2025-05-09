import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Questionnaire from "./pages/Questionnaire";
import Questionnaire2 from "./pages/Questionnaire2";
import VoiceMockup from "./pages/VoiceMockup";
import ChatBotMockup from "./pages/ChatBotMockup";
import TaskProcessMockup from "./pages/TaskProcessMockup";
import RouteMockup from "./pages/RouteMockup";
import Diary from "./pages/Diary";
import Calendar from "./pages/Calendar";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import AiOnboarding from "./pages/AiOnboarding";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ai-onboarding" element={<AiOnboarding />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/questionnaire2" element={<Questionnaire2 />} />
        <Route path="/voice" element={<VoiceMockup />} />
        <Route path="/chatbot" element={<ChatBotMockup />} />
        <Route path="/taskprocess" element={<TaskProcessMockup />} />
        <Route path="/route" element={<RouteMockup />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';

const ChatInterface = () => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'tr-TR';
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleUserInput(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    }

    // Load selected voice from user profile
    const loadSelectedVoice = async () => {
      try {
        const response = await fetch('/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (data.preferredVoice) {
          const voices = window.speechSynthesis.getVoices();
          const voice = voices.find(v => v.name === data.preferredVoice);
          if (voice) setSelectedVoice(voice);
        }
      } catch (error) {
        console.error('Error loading voice preference:', error);
      }
    };

    loadSelectedVoice();
  }, []);

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const speakResponse = (text) => {
    if (selectedVoice) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleUserInput = async (input) => {
    // ... existing handleUserInput code ...
    
    // After getting AI response, speak it
    if (response) {
      speakResponse(response);
    }
  };

  return (
    <div className="chat-interface">
      {/* ... existing chat UI code ... */}
      
      <div className="chat-input-container">
        <button 
          className={`microphone-button ${isListening ? 'listening' : ''}`}
          onMouseDown={startListening}
          onMouseUp={stopListening}
          onTouchStart={startListening}
          onTouchEnd={stopListening}
        >
          <i className="fas fa-microphone"></i>
        </button>
        {/* ... existing input field and send button ... */}
      </div>
    </div>
  );
};

export default ChatInterface; 
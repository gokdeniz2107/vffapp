import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();
//const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_API_KEY = 'sk_9fb7190a8046a68e00ddbbcb4ab26c2a08cc0f48afe6026f';

// ElevenLabs'ten ses listesini çek
router.get('/voices', async (req, res) => {
  try {
    const response = await fetch('https://api.elevenlabs.io/v1/voices', {
      headers: { 'xi-api-key': ELEVENLABS_API_KEY }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'ElevenLabs voices fetch error', details: err.message });
  }
});

// ElevenLabs'ten örnek sesi çek
router.post('/voice-sample/:voiceId', async (req, res) => {
  const { voiceId } = req.params;
  const { text } = req.body;
  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text || 'Merhaba! Ben bu şekilde konuşuyorum.',
        voice_settings: { stability: 0.5, similarity_boost: 0.5 }
      })
    });
    res.set('Content-Type', 'audio/mpeg');
    response.body.pipe(res);
  } catch (err) {
    res.status(500).json({ error: 'ElevenLabs sample fetch error', details: err.message });
  }
});

export default router; 
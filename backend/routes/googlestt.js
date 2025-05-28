const express = require('express');
const router = express.Router();
const speech = require('@google-cloud/speech');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Initialize Google Speech client
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
const client = new speech.SpeechClient({ credentials });

// Route to handle speech-to-text conversion
router.post('/stt', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    const audioBytes = req.file.buffer.toString('base64');
    const audio = {
      content: audioBytes,
    };

    const config = {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'tr-TR',
    };

    const request = {
      audio: audio,
      config: config,
    };

    const [response] = await client.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');

    res.json({ text: transcription });
  } catch (error) {
    console.error('STT Error:', error);
    res.status(500).json({ error: 'Speech to text conversion failed' });
  }
});

module.exports = router; 
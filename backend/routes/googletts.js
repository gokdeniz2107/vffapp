import express from 'express';
import textToSpeech from '@google-cloud/text-to-speech';

const router = express.Router();
const client = new textToSpeech.TextToSpeechClient({
  keyFilename: './vffapp-voice.json' // JSON dosyanın adı
});

router.post('/tts', async (req, res) => {
  const { text, lang = 'tr-TR' } = req.body;
  const request = {
    input: { text },
    voice: { languageCode: lang, ssmlGender: 'FEMALE' },
    audioConfig: { audioEncoding: 'MP3' },
  };
  try {
    const [response] = await client.synthesizeSpeech(request);
    res.set('Content-Type', 'audio/mpeg');
    res.send(response.audioContent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router; 
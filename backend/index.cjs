import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama3-70b-8192";

// MongoDB Atlas bağlantı adresin:
mongoose.connect('mongodb+srv://karadenizgokdeniz152:21282177Gda@cluster0.wwanp0w.mongodb.net/vffapp?retryWrites=true&w=majority&appName=Cluster0');

const TaskSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  status: String,
  completed: Boolean,
  color: String,
  avatars: Array,
  raw: String,
  location: {
    lat: Number,
    lng: Number
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});
const Task = mongoose.model('Task', TaskSchema);

// User schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', UserSchema);

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Register endpoint
app.post('/auth/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed });
    await user.save();
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login endpoint
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/chat", async (req, res) => {
  const { prompt, character } = req.body;
  let systemPrompt = "You are a helpful assistant.";
  if (character === "friendly") {
    systemPrompt = "You are a friendly, warm, supportive, and empathetic assistant. Always answer in a positive and approachable tone.";
  }
  if (character === "professional") {
    systemPrompt = "You are a professional, formal, and highly motivated assistant. Always answer in a clear, concise, and businesslike manner.";
  }
  if (character === "witty") {
    systemPrompt = "You are a smart, witty, and quick-thinking assistant. Always answer with clever, insightful, and sometimes humorous responses.";
  }
  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        max_tokens: 200
      })
    });
    const data = await response.json();
    if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
      res.json({ result: data.choices[0].message.content });
    } else {
      res.status(500).json({ error: data.error?.message || "No response from Groq API" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// JWT auth middleware
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'No token' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Tüm görevleri getir (sadece kendi görevleri)
app.get('/tasks', auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

// Görev ekle (sadece kendi adına)
app.post('/tasks', auth, async (req, res) => {
  const task = new Task({ ...req.body, userId: req.userId });
  await task.save();
  res.json(task);
});

// Görev sil (sadece kendi görevini silebilir)
app.delete('/tasks/:id', auth, async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json({ success: true });
});

const elevenlabsRoutes = require('./routes/elevenlabs');
app.use('/api/elevenlabs', elevenlabsRoutes);

app.listen(4000, () => console.log('API ready on http://localhost:4000')); 
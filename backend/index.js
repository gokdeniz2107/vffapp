import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama3-70b-8192";

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

app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001 (Groq Llama 3)");
}); 
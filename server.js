const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Manlung AI Express Server is running! 🚀',
    status: 'active'
  });
});

// POST chat endpoint
app.post('/chat', (req, res) => {
  const userMessage = req.body.message;
  
  let response = "Hello! I'm Manlung AI. I'm working perfectly now! 😊";
  
  if (userMessage.includes('song') || userMessage.includes('music')) {
    response = "I can help you find music soon! 🎵";
  }
  
  res.json({
    user_message: userMessage,
    ai_response: response,
    status: 'success'
  });
});

// GET chat endpoint for testing
app.get('/chat', (req, res) => {
  res.json({
    user_message: "test",
    ai_response: "Hello! I'm Manlung AI. Chat is working! 🚀",
    status: 'success'
  });
});

// VOICE ENDPOINT - Add this new section
app.post('/speak', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'No text provided' });
    }

    // Call ttsmp3.com API
    const ttsResponse = await axios.post('https://ttsmp3.com/makemp3_new.php', 
      `msg=${encodeURIComponent(text)}&lang=Kimberly&source=ttsmp3`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const result = ttsResponse.data;
    
    if (result.Error === 0) {
      res.json({
        text: text,
        audio_url: result.URL,
        speaker: result.Speaker,
        status: 'success',
        message: 'Voice generated successfully! 🎤'
      });
    } else {
      res.status(500).json({ error: 'TTS generation failed' });
    }
    
  } catch (error) {
    console.error('Voice error:', error);
    res.status(500).json({ error: 'Voice processing failed' });
  }
});

// GET voice endpoint for testing
app.get('/speak', (req, res) => {
  res.json({
    message: 'Send POST request with {"text": "your message"} to generate voice!',
    example: 'Use Postman or curl to test the voice feature'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Manlung AI server running on port ${PORT}`);
});

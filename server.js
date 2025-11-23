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
// SMARTER CHAT ENDPOINT
app.post('/chat', (req, res) => {
  const userMessage = req.body.message.toLowerCase();
  
  let response = "";
  
  // Smart responses based on user input
  if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
    response = "Hello there! I'm Manlung AI, your friendly assistant. How can I help you today? 😊";
  }
  else if (userMessage.includes('how are you')) {
    response = "I'm functioning perfectly! Ready to have wonderful conversations and help you with anything you need! 🌟";
  }
  else if (userMessage.includes('name')) {
    response = "I'm Manlung AI! I'm designed to be your helpful, positive companion. What's your name?";
  }
  else if (userMessage.includes('song') || userMessage.includes('music')) {
    response = "I love music! When we connect to music APIs, I'll help you discover amazing songs. What genre do you like? 🎵";
  }
  else if (userMessage.includes('weather')) {
    response = "I don't have weather data yet, but I can tell you it's a great day for positive conversations! ☀️";
  }
  else if (userMessage.includes('joke') || userMessage.includes('funny')) {
    response = "Why don't scientists trust atoms? Because they make up everything! 😄";
  }
  else if (userMessage.includes('thank')) {
    response = "You're very welcome! I'm happy to help. What else would you like to talk about? 💫";
  }
  else if (userMessage.includes('bye') || userMessage.includes('goodbye')) {
    response = "Goodbye! Remember to stay positive and enjoy your day! Come back anytime! 👋";
  }
  else if (userMessage.includes('love') || userMessage.includes('like')) {
    response = "That's wonderful! I'm designed to spread positivity and help people. I appreciate you talking with me! ❤️";
  }
  else if (userMessage.includes('help')) {
    response = "I can chat with you, share positive thoughts, tell jokes, and soon I'll help with music and more! What would you like to do?";
  }
  else {
    // For unknown questions, give varied responses
    const randomResponses = [
      "That's interesting! Tell me more about that.",
      "I'd love to learn more about what you're saying!",
      "What a great thing to discuss! Could you elaborate?",
      "I'm still learning, but I find that fascinating!",
      "Let's explore that topic together! What are your thoughts?"
    ];
    response = randomResponses[Math.floor(Math.random() * randomResponses.length)];
  }
  
  res.json({
    user_message: req.body.message,
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

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
    status: 'active',
    version: '2.0.0'
  });
});

// ENHANCED CHAT API
app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message.toLowerCase();
    
    let response = await generateSmartResponse(userMessage);
    
    res.json({
      user_message: req.body.message,
      ai_response: response,
      status: 'success',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    res.status(500).json({ 
      error: 'AI processing failed',
      status: 'error'
    });
  }
});

// SMART RESPONSE GENERATOR
async function generateSmartResponse(userMessage) {
  // Tech & AI Questions
  if (userMessage.includes('ai') || userMessage.includes('artificial intelligence')) {
    return "Artificial Intelligence is revolutionizing how we interact with technology! I'm built using Node.js and modern AI APIs. I can help you understand AI concepts, build projects, or explore machine learning! 🤖";
  }
  
  if (userMessage.includes('code') || userMessage.includes('programming') || userMessage.includes('javascript')) {
    return "I love coding! I can help you with programming concepts, debug code, or explain technologies. What specific language or problem are you working on? 💻";
  }
  
  if (userMessage.includes('api') || userMessage.includes('endpoint')) {
    return "APIs are my specialty! I can help you design RESTful APIs, handle authentication, or integrate with services like music APIs, weather data, or AI models! 🔌";
  }
  
  // Music Search Ready
  if (userMessage.includes('play') || userMessage.includes('song') || userMessage.includes('music')) {
    return "I can search for music! While I set up the music API, tell me what genre or artist you like, and I'll help you discover great songs! 🎵";
  }
  
  // Tech Support
  if (userMessage.includes('error') || userMessage.includes('problem') || userMessage.includes('help')) {
    return "I can help troubleshoot tech issues! Describe the problem you're facing, and I'll guide you through solutions step by step. 🔧";
  }
  
  // Learning & Education
  if (userMessage.includes('learn') || userMessage.includes('teach') || userMessage.includes('how to')) {
    return "I'm here to help you learn! Whether it's technology, programming, AI, or any other topic, I can explain concepts and provide learning resources! 📚";
  }
  
  // Default Smart Responses
  const smartResponses = [
    "That's fascinating! I'd love to explore that topic with you. Could you tell me more about what you're thinking?",
    "I understand what you're saying! From a technical perspective, this relates to several interesting concepts.",
    "Great question! This touches on some advanced topics I can help explain.",
    "I appreciate you sharing that! Let me provide some insights based on current technology trends.",
    "Interesting perspective! Technology is evolving rapidly in that area."
  ];
  
  return smartResponses[Math.floor(Math.random() * smartResponses.length)];
}

// GET chat endpoint for testing
app.get('/chat', (req, res) => {
  res.json({
    user_message: "test",
    ai_response: "Hello! I'm Manlung AI Enhanced. Chat is working! 🚀",
    status: 'success'
  });
});

// VOICE ENDPOINT
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

// MUSIC SEARCH API
app.get('/search/music', async (req, res) => {
  try {
    const { query, type = 'track' } = req.query;
    
    if (!query) {
      return res.status(400).json({ 
        error: 'Search query required',
        example: '/search/music?query=edm&type=track'
      });
    }
    
    // For now, return mock data - we'll integrate real API later
    const mockResults = {
      query: query,
      type: type,
      results: [
        {
          title: `Top ${query} Track`,
          artist: "Popular Artist",
          genre: query,
          preview: "https://example.com/preview.mp3",
          description: `This is a popular ${query} track that people love!`
        },
        {
          title: `${query} Hits 2024`,
          artist: "Various Artists", 
          genre: query,
          preview: "https://example.com/preview2.mp3",
          description: `Latest ${query} music collection`
        }
      ],
      message: "Music API integration ready - add Spotify/YouTube API keys for real search!"
    };
    
    res.json(mockResults);
    
  } catch (error) {
    res.status(500).json({ error: 'Music search failed' });
  }
});

// TECH INFO API
app.get('/tech/info', async (req, res) => {
  try {
    const { topic } = req.query;
    
    const techInfo = {
      "ai": {
        title: "Artificial Intelligence",
        info: "AI is transforming industries with machine learning, neural networks, and deep learning algorithms.",
        applications: ["Chatbots", "Image Recognition", "Predictive Analytics"],
        trending: "GPT models, Computer Vision, AI Ethics"
      },
      "blockchain": {
        title: "Blockchain Technology", 
        info: "Decentralized ledger technology enabling secure, transparent transactions.",
        applications: ["Cryptocurrency", "Smart Contracts", "Supply Chain"],
        trending: "Web3, NFTs, DeFi"
      },
      "cloud": {
        title: "Cloud Computing",
        info: "On-demand computing services over the internet with scalable resources.",
        applications: ["AWS", "Azure", "Google Cloud", "Serverless"],
        trending: "Edge Computing, Hybrid Cloud, Kubernetes"
      }
    };
    
    const result = techInfo[topic] || {
      title: "Technology Overview",
      info: "I can provide information on AI, Blockchain, Cloud Computing, and more tech topics!",
      available_topics: Object.keys(techInfo)
    };
    
    res.json(result);
    
  } catch (error) {
    res.status(500).json({ error: 'Tech info service failed' });
  }
});

// API STATUS & INFO
app.get('/api/status', (req, res) => {
  res.json({
    service: "Manlung AI API",
    version: "2.0.0",
    status: "operational",
    endpoints: {
      chat: "POST /chat - Intelligent conversation",
      voice: "POST /speak - Text-to-speech generation", 
      music_search: "GET /search/music - Music discovery",
      tech_info: "GET /tech/info - Technology insights"
    },
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Manlung AI server running on port ${PORT}`);
});

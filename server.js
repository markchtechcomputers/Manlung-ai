const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    message: 'Manlung AI Express Server is running! 🚀',
    status: 'active'
  });
});

app.post('/chat', (req, res) => {
  // Add this for simple GET testing
app.get('/chat', (req, res) => {
  res.json({
    user_message: "test",
    ai_response: "Hello! I'm Manlung AI. Chat is working! 🚀",
    status: 'success'
  });
});
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Manlung AI server running on port ${PORT}`);
});

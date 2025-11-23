// Add this for simple GET testing
app.get('/chat', (req, res) => {
  res.json({
    user_message: "test",
    ai_response: "Hello! I'm Manlung AI. Chat is working! 🚀",
    status: 'success'
  });
});

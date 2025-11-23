from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="Manlung AI Backend")

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Manlung AI is running! 🚀", "status": "active"}

@app.websocket("/ws/voice")
async def websocket_voice(websocket: WebSocket):
    await websocket.accept()
    await websocket.send_text("Connected to Manlung AI Voice Service! 🎤")
    
    try:
        while True:
            data = await websocket.receive_text()
            response = f"Manlung AI: I received your message: '{data}'. When we add voice processing, I'll speak this back to you!"
            await websocket.send_text(response)
    except:
        print("Client disconnected")

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Manlung AI Backend"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

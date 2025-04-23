from fastapi import FastAPI
import os
from .middleware import setup_middlewares
from .routers import evaluations

app = FastAPI()

# Setup middleware
setup_middlewares(app)

# Include routers
app.include_router(evaluations.router)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
from fastapi import FastAPI
import os
from app.middleware import setup_middlewares
from app.routers import evaluations
from app.database import engine
from app.models import Base

app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)

# Setup middleware
setup_middlewares(app)

# Include routers
app.include_router(evaluations.router)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
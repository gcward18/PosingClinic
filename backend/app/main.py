# Enable debugging if running in debug mode
import os
import uvicorn
from fastapi import FastAPI
from app.middleware import setup_middlewares
from app.routers import evaluations, auth, competitions, competitors, divisions, users, judges
from app.database import engine
from app.models.models import Base


app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)

# Setup middleware
setup_middlewares(app)

# Include routers
app.include_router(auth.router)
app.include_router(competitions.router)
app.include_router(competitors.router)
app.include_router(divisions.router)
app.include_router(evaluations.router)
app.include_router(judges.router)
app.include_router(users.router)


UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

if __name__ == '__main__':
    uvicorn.run(app, host="localhost", port=8000, reload=True)

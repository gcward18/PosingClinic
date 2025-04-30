import debugpy
debugpy.listen(('0.0.0.0', 5678))
# debugpy.wait_for_client()  # Uncomment this line if you want the application to wait for a debugger to attach

from fastapi import FastAPI
import os
from app.middleware import setup_middlewares
from app.routers import evaluations, auth
from app.database import engine
from app.models.models import Base

app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)

# Setup middleware
setup_middlewares(app)

# Include routers
app.include_router(evaluations.router)
app.include_router(auth.router)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
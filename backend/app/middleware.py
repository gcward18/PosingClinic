from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

def setup_middlewares(app: FastAPI) -> None:
    """Configure all middleware for the application."""
    
    # CORS middleware configuration
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Add other middleware configurations here as needed
    # For example: Authentication middleware, Compression middleware, etc.
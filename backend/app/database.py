from fastapi import HTTPException
from fastapi.params import Depends
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.models import User
from minio import Minio
from app.config import settings
from fastapi.security import HTTPBasic, HTTPBasicCredentials

# Database configuration
engine = create_engine(settings.database_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
security = HTTPBasic()

# MinIO client configuration
minio_client = Minio(
    settings.MINIO_ENDPOINT,
    access_key=settings.MINIO_ROOT_USER,
    secret_key=settings.MINIO_ROOT_PASSWORD,
    secure=False  # Set to True in production with HTTPS
)

# Create MinIO bucket if it doesn't exist
BUCKET_NAME = "pose-evaluations"
try:
    if not minio_client.bucket_exists(BUCKET_NAME):
        minio_client.make_bucket(BUCKET_NAME)
except Exception as e:
    print(f"Error creating MinIO bucket: {e}")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def authenticate_user(credentials: HTTPBasicCredentials, db = Depends(get_db)):
    """
    Function to authenticate user using HTTP Basic Authentication.
    """
    user = db.query(User).filter(User.username == credentials.username).first()
    if user is None or not user.verify_password(credentials.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return user

def get_current_user(user: User = Depends(authenticate_user)):
    """
    Function to get the current authenticated user.
    """
    return user

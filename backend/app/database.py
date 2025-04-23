from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from minio import Minio
from app.config import settings

# Database configuration
engine = create_engine(settings.database_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

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
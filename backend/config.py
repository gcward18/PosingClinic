from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os

load_dotenv()

basedir = os.path.abspath(os.path.dirname(__file__))

class Settings(BaseSettings):
    app_name: str = "Posing Clinic Server"
    POSTGRES_USER: str = os.environ.get('POSTGRES_USER', 'admin')
    POSTGRES_PASSWORD: str = os.environ.get('POSTGRES_PASSWORD', 'secret')
    POSTGRES_DB: str = os.environ.get('POSTGRES_DB', 'mydb')
    database_url: str = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@postgres-dev:5432/{POSTGRES_DB}"
    MINIO_ROOT_USER: str = os.environ.get('MINIO_ROOT_USER', 'minioadmin')
    MINIO_ROOT_PASSWORD: str = os.environ.get('MINIO_ROOT_PASSWORD', 'minioadmin')
    MINIO_ENDPOINT: str = os.environ.get('MINIO_ENDPOINT', 'minio:9000')
    
    class Config:
        env_file = os.path.join(basedir, '.env')

settings = Settings()
from typing import Optional

from fastapi.security import OAuth2PasswordBearer

import jwt
from fastapi import Depends, HTTPException, status
from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os
from datetime import datetime
from app.schemas.token_schema import TokenData

load_dotenv()

basedir = os.path.abspath(os.path.dirname(__file__))
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"}
)


class Settings(BaseSettings):
    app_name: str = "Posing Clinic Server"
    POSTGRES_USER: str = os.environ.get('POSTGRES_USER', 'admin')
    POSTGRES_PASSWORD: str = os.environ.get('POSTGRES_PASSWORD', 'secret')
    POSTGRES_DB: str = os.environ.get('POSTGRES_DB', 'mydb')
    database_url: str = f"postgresql+psycopg2://{POSTGRES_USER}:{POSTGRES_PASSWORD}@localhost:5432/{POSTGRES_DB}"
    MINIO_ROOT_USER: str = os.environ.get('MINIO_ROOT_USER', 'minioadmin')
    MINIO_ROOT_PASSWORD: str = os.environ.get('MINIO_ROOT_PASSWORD', 'minioadmin')
    MINIO_ENDPOINT: str = os.environ.get('MINIO_ENDPOINT', 'minio:9000')
    GROQ_API_KEY: str = os.environ.get('GROQ_API_KEY', 'your_groq_api_key')
    ACCESS_TOKEN_EXPIRE_MINUTES: int = os.environ.get('ACCESS_TOKEN_EXPIRE_MINUTES', 30)
    SECRET_KEY: str = os.environ.get('SECRET_KEY', 'super_secret_key')
    class Config:
        env_file = os.path.join(basedir, '.env')


settings = Settings()


def create_access_token(data: dict, expires_delta) -> str:
    to_encode = data.copy()
    # set the expiry time for token
    to_encode.update({'exp': datetime.utcnow() + expires_delta})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm='HS256')
    return encoded_jwt


def verify_token(token: str = Depends(oauth2_scheme)) -> Optional[TokenData]:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        username: str = payload.get('sub')
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except jwt.PyJWTError:
        raise credentials_exception

    return token_data

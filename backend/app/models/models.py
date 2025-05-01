from sqlalchemy import Column, Integer, String, DateTime, Text, create_engine
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from passlib.hash import bcrypt
from app.config import settings

Base = declarative_base()
engine = create_engine(settings.database_url)

class Evaluation(Base):
    __tablename__ = "evaluations"

    id = Column(Integer, primary_key=True, index=True)
    image_path = Column(String, nullable=False)
    feedback = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    def verify_password(self, password: str):
        return bcrypt.verify(password, self.password_hash)
    
    @staticmethod
    def hash_password(password: str) -> str:
        return bcrypt.hash(password)


Base.metadata.create_all(bind=engine)

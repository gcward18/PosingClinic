from sqlalchemy import Column, Integer, String, DateTime, Text, create_engine, ForeignKey, Table
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
    firstname = Column(String)
    lastname = Column(String)

    def __repr__(self):
        return f"<User(username={self.username})>"

    def verify_password(self, password: str):
        return bcrypt.verify(password, self.password_hash)
    
    @staticmethod
    def hash_password(password: str) -> str:
        return bcrypt.hash(password)


class Judge(Base):
    __tablename__ = "judges"

    id = Column(Integer, primary_key=True, index=True)
    firstname = Column(String, nullable=False)
    lastname = Column(String, nullable=False)

    def __repr__(self):
        return f"<Judge(firstname={self.firstname}, lastname={self.lastname})>"


class Competitor(Base):
    __tablename__ = "competitors"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    height = Column(Integer, nullable=False)
    weight = Column(Integer, nullable=False)
    sex = Column(String, nullable=False)

    def __repr__(self):
        return f"<Competitor(user_id:{self.user_id} height={self.height}, weight={self.weight})>"


class Division(Base):
    __tablename__ = "divisions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    sex_allowed = Column(String, nullable=False)


competition_judges = Table(
    "competition_judges",
    Base.metadata,
    Column("judge_id", Integer, ForeignKey("judges.id"), primary_key=True),
    Column("competition_id", Integer, ForeignKey("competitions.id"), primary_key=True),
)


competition_divisions = Table(
    "competition_divisions",
    Base.metadata,
    Column("division_id", Integer, ForeignKey("divisions.id"), primary_key=True),
    Column("competition_id", Integer, ForeignKey("competitions.id"), primary_key=True),
)


competition_competitors = Table(
    "competition_competitors",
    Base.metadata,
    Column("competitor_id", Integer, ForeignKey("competitors.id"), primary_key=True),
    Column("competition_id", Integer, ForeignKey("competitions.id"), primary_key=True),
)


class Competition(Base):
    __tablename__ = "competitions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    date = Column(DateTime, nullable=False)

Base.metadata.create_all(bind=engine)

import json

from sqlalchemy.orm import Session
from app.models.models import User, Competitor, Division, Judge, Competition  # adjust if paths differ
from passlib.hash import bcrypt
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.config import settings

# Database configuration
engine = create_engine(settings.database_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

competitions_fp = './app/data/competitions.json'
divisions_fp = './app/data/divisions.json'
judges_fp = './app/data/judges.json'
users_fp = './app/data/users.json'
competitors_fp = './app/data/competitors.json'

paths = [[users_fp, User], [competitions_fp, Competition], [divisions_fp, Division], [judges_fp, Judge]]


def hash_password(password):
    return bcrypt.hash(password)


def get_data(fp:str) -> dict:
    data = None
    with open(fp, 'r') as f:
        data = json.load(f)
    return data


def seedData(session: Session):
    for fp, model in paths:
        data = get_data(fp)

        for row in data:
            if 'divisions' in row:
                del row['divisions']
            if 'judges' in row:
                del row['judges']
            if 'user_id' in row:
                del row['user_id']
            obj = model(**row)
            session.add(obj)

    session.commit()


def main():
    db = SessionLocal()
    try:
        seedData(db)
        print("✅ Seed data inserted successfully.")
    finally:
        db.close()


if __name__ == "__main__":
    main()

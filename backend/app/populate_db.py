import json

from sqlalchemy.orm import Session
from app.models.models import User, Competitor, Division, Judge, Competition  # adjust if paths differ
from app.database import SessionLocal  # assumes you have a SessionLocal factory
from passlib.hash import bcrypt

competitions_fp = './app/data/competitions.json'
divisions_fp = './app/data/divisions.json'
judges_fp = './app/data/judges.json'
users_fp = './app/data/users.json'
competitors_fp = './app/data/competitors.json'

paths = [[users_fp, User], [competitions_fp, Competition], [divisions_fp, Division], [judges_fp, Judge],
         [competitors_fp, Competitor]]


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
        obj = model(**data)
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


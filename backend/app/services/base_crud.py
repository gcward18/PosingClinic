from typing import Type, TypeVar, Generic
from sqlalchemy.orm import Session

ModelType = TypeVar("ModelType")  # Type variable to be replaced with a specific SQLAlchemy model


class CRUDBase(Generic[ModelType]):
    def __init__(self, model: Type[ModelType]):
        self.model = model

    def get(self, db: Session, id: int) -> ModelType:
        return db.query(self.model).get(id)

    def get_all(self, db: Session):
        return db.query(self.model).all()

    def create(self, db: Session, obj_in: ModelType) -> ModelType:
        db.add(obj_in)
        db.commit()
        db.refresh(obj_in)
        return obj_in

    def update(self, db: Session, db_obj: ModelType, obj_in: dict) -> ModelType:
        for attr, value in obj_in.items():
            if attr in db_obj.__table__.columns.keys():
                setattr(db_obj, attr, value)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def delete(self, db: Session, id: int):
        obj = db.query(self.model).get(id)
        db.delete(obj)
        db.commit()

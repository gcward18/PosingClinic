from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import User
from app.schemas.user_schema import UserCreate, UserUpdate
from app.services.user_crud import CRUDUser
from starlette import status

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
    dependencies=[],
)


crud_user = CRUDUser(User)


@router.get("/")
async def read_users():
    return [{"username": "Rick"}, {"username": "Morty"}]


@router.get("/me")
async def read_user_me():
    return {"username": "fakecurrentuser"}


@router.get("/{username}")
async def read_user(username: str):
    return {"username": username}


@router.post("/")
async def create_user(body: UserCreate, session: Session = Depends(get_db)):
    user = crud_user.create(session, User(**body.dict()))
    return user


@router.put("/{id}")
async def update_user(id: int, body: UserUpdate, session: Session = Depends(get_db)):
    try:
        user = crud_user.update(session, id, User(**body.dict()))
        return user
    except Exception as e:
        raise HTTPException(status_code=404, detail="User not found")


@router.delete("/{id}")
async def delete_user(id: int, session: Session = Depends(get_db)):
    try:
        crud_user.delete(session, id)
        return status.HTTP_204_NO_CONTENT
    except Exception as e:
        raise HTTPException(status_code=404, detail="User not found")

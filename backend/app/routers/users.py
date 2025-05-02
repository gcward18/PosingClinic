from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer

from app.database import get_db
from app.models.models import User
from app.schemas.user_schema import UserCreate, UserBase
from app.services.user_crud import CRUDUser
from starlette import status
from app.dependencies import oauth2_scheme
import jwt

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
    dependencies=[],
)


crud_user = CRUDUser(User)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.get("/", response_model=list[UserBase])
async def read_users(session: Session = Depends(get_db)):
    user = crud_user.get_all(db=session)
    if user is None:
        raise HTTPException(status_code=404, detail="user not found")
    return [UserBase.model_validate(j) for j in user]


@router.get("/me", response_model=UserBase)
async def read_user_me(current_user: User = Depends(oauth2_scheme), session: Session = Depends(get_db)):
    return UserBase.model_validate(current_user)
    

@router.get("/{username}")
async def read_user(username: str):
    return {"username": username}


@router.post("/")
async def create_user(body: UserCreate, session: Session = Depends(get_db)):
    user = crud_user.create(session, User(**body.dict()))
    return user


@router.put("/{id}")
async def update_user(id: int, body: UserBase, session: Session = Depends(get_db)):
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

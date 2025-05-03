from pydantic import BaseModel
from typing import Optional


class UserBase(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    firstname: Optional[str] = None
    lastname: Optional[str] = None

    class Config:
        arbitrary_types_allowed = True


class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserPasswordUpdate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

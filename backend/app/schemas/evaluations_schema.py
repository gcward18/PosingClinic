from pydantic import BaseModel
from typing import Optional


class JudgeBase(BaseModel):
    firstname: Optional[str]
    lastname: Optional[str]

    class Config:
        arbitrary_types_allowed = True


class JudgeCreate(JudgeBase):
    pass


class JudgeResponse(JudgeBase):
    id: int

    class Config:
        from_attributes = True

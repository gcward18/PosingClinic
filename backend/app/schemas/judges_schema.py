from pydantic import BaseModel


class JudgeBase(BaseModel):
    name: int
    sex_allowed: str


class JudgeCreate(JudgeBase):
    pass


class JudgeResponse(JudgeBase):
    id: int

    class Config:
        from_attributes = True

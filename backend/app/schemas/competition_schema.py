from pydantic import BaseModel


class JudgeBase(BaseModel):
    firstname: str
    lastname: str
    dob: str


class JudgeCreate(JudgeBase):
    pass


class JudgeResponse(JudgeBase):
    id: int

    class Config:
        from_attributes = True

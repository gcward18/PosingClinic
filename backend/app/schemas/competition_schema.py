from pydantic import BaseModel


class CompetitionBase(BaseModel):
    firstname: str
    lastname: str
    dob: str


class CompetitionCreate(CompetitionBase):
    pass


class CompetitionResponse(CompetitionBase):
    id: int

    class Config:
        from_attributes = True

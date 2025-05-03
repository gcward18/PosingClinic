from pydantic import BaseModel
from typing import Optional


class CompetitionBase(BaseModel):
    name: Optional[str] = None
    date: Optional[str] = None

    class Config:
        arbitrary_types_allowed = True


class CompetitionCreate(CompetitionBase):
    pass


class CompetitionResponse(CompetitionBase):
    id: int

    class Config:
        from_attributes = True

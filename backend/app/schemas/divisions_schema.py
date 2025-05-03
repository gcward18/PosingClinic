from pydantic import BaseModel
from typing import Optional


class DivisionBase(BaseModel):
    name: Optional[int] = None
    sex_allowed: Optional[str] = None

    class Config:
        arbitrary_types_allowed = True


class DivisionCreate(DivisionBase):
    pass


class DivisionResponse(DivisionBase):
    id: int

    class Config:
        from_attributes = True

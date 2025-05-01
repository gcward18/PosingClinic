from pydantic import BaseModel


class DivisionBase(BaseModel):
    name: int
    sex_allowed: str


class DivisionCreate(DivisionBase):
    pass


class DivisionResponse(DivisionBase):
    id: int

    class Config:
        from_attributes = True

from pydantic import BaseModel


class CompetitorBase(BaseModel):
    name: int
    sex_allowed: str


class CompetitorCreate(CompetitorBase):
    pass


class CompetitorResponse(CompetitorBase):
    id: int

    class Config:
        from_attributes = True

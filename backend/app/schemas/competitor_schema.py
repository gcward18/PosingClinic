from pydantic import BaseModel
from typing import Optional

class CompetitorBase(BaseModel):
    user_id: Optional[int] = None
    height: Optional[int] = None
    weight: Optional[int] = None
    sex: Optional[str] = None

    class Config:
        arbitrary_types_allowed = True

class CompetitorCreate(CompetitorBase):
    pass


class CompetitorResponse(CompetitorBase):
    id: int

    class Config:
        from_attributes = True

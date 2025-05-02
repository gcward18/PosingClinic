from datetime import datetime

from pydantic import BaseModel
from typing import Optional


class EvaluationBase(BaseModel):
    feedback: Optional[str]
    image_path: Optional[str]
    created_at: Optional[datetime]

    class Config:
        arbitrary_types_allowed = True


class EvaluationCreate(EvaluationBase):
    pass


class EvaluationResponse(EvaluationBase):
    id: int

    class Config:
        from_attributes = True

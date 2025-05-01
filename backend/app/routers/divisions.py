from fastapi import APIRouter, HTTPException
from sqlalchemy import and_
from sqlalchemy.orm import Session
from fastapi import Depends
from app.database import get_db
from app.models.models import Judge
from app.schemas.judges_schema import JudgeResponse, JudgeCreate, JudgeUpdate

router = APIRouter(
    prefix="/judges",
    tags=["judges"],
    responses={404: {"description": "Not found"}},
    dependencies=[]
)


@router.get("/{judge_id}", response_model=JudgeResponse)
async def get_judge(judge_id: int, db: Session = Depends(get_db)):
    judge = db.query(Judge).filter(and_(Judge.id == judge_id)).first()
    if judge is None:
        raise HTTPException(status_code=404, detail="Judge not found")
    return JudgeResponse.from_orm(judge)


@router.post("/", response_model=JudgeResponse)
async def post_judge(judge_body: JudgeCreate, db: Session = Depends(get_db)):
    judge = Judge(**judge_body.dict())
    db.add(judge)
    db.commit()
    db.refresh(judge)
    return JudgeResponse.from_orm(judge)


@router.put("/{judge_id}", response_model=JudgeResponse)
async def update_judge(
        judge_id: int,
        judge_update: JudgeUpdate,
        db: Session = Depends(get_db)
):
    judge = db.query(Judge).filter(and_(
        Judge.id == judge_id
    )).first()

    if judge is None:
        raise HTTPException(status_code=404, detail="Judge not found")

    update_data = judge_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(judge, field, value)

    db.commit()
    db.refresh(judge)

    return JudgeResponse.from_orm(judge)

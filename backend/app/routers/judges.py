from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from fastapi import Depends
from app.database import get_db
from app.models.models import Judge
from app.schemas.judges_schema import JudgeResponse, JudgeCreate, JudgeBase
from starlette import status

from app.services.judge_crud import CRUDJudge

router = APIRouter(
    prefix="/judges",
    tags=["judges"],
    responses={404: {"description": "Not found"}},
    dependencies=[]
)


crud_judges = CRUDJudge(Judge)


@router.get("/{judge_id}", response_model=JudgeResponse)
async def get_judge(judge_id: int, db: Session = Depends(get_db)):
    judge = crud_judges.get(id=judge_id, db=db)
    if judge is None:
        raise HTTPException(status_code=404, detail="Judge not found")
    return JudgeResponse.from_orm(judge)


@router.post("/", response_model=JudgeResponse)
async def post_judge(judge_body: JudgeCreate, db: Session = Depends(get_db)):
    judge = crud_judges.create(db, Judge(**judge_body.dict()))
    return JudgeResponse.from_orm(judge)


@router.put("/{judge_id}", response_model=JudgeResponse)
async def update_judge(
        judge_id: int,
        judge_update: JudgeBase,
        db: Session = Depends(get_db)
):
    judge = crud_judges.update(db=db, id=judge_id, obj_in=judge_update.dict(exclude_unset=True))

    if judge is None:
        raise HTTPException(status_code=404, detail="Judge not found")
    return JudgeResponse.from_orm(judge)


@router.delete("/{judge_id}")
async def delete_judge(id: int, db: Session = Depends(get_db)):
    try:
        crud_judges.delete(db=db, id=id)
        return status.HTTP_204_NO_CONTENT
    except Exception as e:
        raise HTTPException(status_code=404, detail="Judge not found")

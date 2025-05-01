from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from fastapi import Depends
from app.database import get_db
from app.models.models import Competition
from app.schemas.competition_schema import CompetitionResponse, CompetitionCreate, CompetitionUpdate
from starlette import status

from backend.app.services.competition_crud import CRUDCompetition

router = APIRouter(
    prefix="/competitions",
    tags=["competitions"],
    responses={404: {"description": "Not found"}},
    dependencies=[]
)

crud_competitions = CRUDCompetition(Competition)

@router.get("/{competition_id}", response_model=CompetitionResponse)
async def get_competition(competition_id: int, db: Session = Depends(get_db)):
    competition = crud_competitions.get(id=competition_id, db=db)
    if competition is None:
        raise HTTPException(status_code=404, detail="Competition not found")
    return CompetitionResponse.from_orm(competition)


@router.post("/", response_model=CompetitionResponse)
async def post_competition(competition_body: CompetitionCreate, db: Session = Depends(get_db)):
    competition = crud_competitions.create(db, Competition(**competition_body.dict()))
    return CompetitionResponse.from_orm(competition)


@router.put("/{competition_id}", response_model=CompetitionResponse)
async def update_competition(
        competition_id: int,
        competition_update: CompetitionUpdate,
        db: Session = Depends(get_db)
):
    competition = crud_competitions.update(db=db, id=competition_id, obj_in=competition_update.dict(exclude_unset=True))

    if competition is None:
        raise HTTPException(status_code=404, detail="Competition not found")
    return CompetitionResponse.from_orm(competition)

@router.delete("/{competition_id}")
async def delete_competition(id: int, db: Session = Depends(get_db)):
    try:
        crud_competitions.delete(db=db, id=id)
        return status.HTTP_204_NO_CONTENT
    except Exception as e:
        raise HTTPException(status_code=404, detail="Competition not found")

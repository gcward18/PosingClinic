from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from fastapi import Depends
from app.database import get_db
from app.models.models import Competitor
from app.schemas.competitor_schema import CompetitorResponse, CompetitorCreate, CompetitorUpdate
from starlette import status

from backend.app.services.competitor_crud import CRUDCompetitor

router = APIRouter(
    prefix="/competitors",
    tags=["competitors"],
    responses={404: {"description": "Not found"}},
    dependencies=[]
)

crud_competitors = CRUDCompetitor(Competitor)

@router.get("/{competitor_id}", response_model=CompetitorResponse)
async def get_competitor(competitor_id: int, db: Session = Depends(get_db)):
    competitor = crud_competitors.get(id=competitor_id, db=db)
    if competitor is None:
        raise HTTPException(status_code=404, detail="Competitor not found")
    return CompetitorResponse.from_orm(competitor)


@router.post("/", response_model=CompetitorResponse)
async def post_competitor(competitor_body: CompetitorCreate, db: Session = Depends(get_db)):
    competitor = crud_competitors.create(db, Competitor(**competitor_body.dict()))
    return CompetitorResponse.from_orm(competitor)


@router.put("/{competitor_id}", response_model=CompetitorResponse)
async def update_competitor(
        competitor_id: int,
        competitor_update: CompetitorUpdate,
        db: Session = Depends(get_db)
):
    competitor = crud_competitors.update(db=db, id=competitor_id, obj_in=competitor_update.dict(exclude_unset=True))

    if competitor is None:
        raise HTTPException(status_code=404, detail="Competitor not found")
    return CompetitorResponse.from_orm(competitor)

@router.delete("/{competitor_id}")
async def delete_competitor(id: int, db: Session = Depends(get_db)):
    try:
        crud_competitors.delete(db=db, id=id)
        return status.HTTP_204_NO_CONTENT
    except Exception as e:
        raise HTTPException(status_code=404, detail="Competitor not found")

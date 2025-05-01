from fastapi import APIRouter, HTTPException
from sqlalchemy import and_
from sqlalchemy.orm import Session
from fastapi import Depends
from app.database import get_db
from app.models.models import Competitor
from app.schemas.competitor_schema import CompetitorResponse, CompetitorCreate, CompetitorUpdate

router = APIRouter(
    prefix="/competitors",
    tags=["competitors"],
    responses={404: {"description": "Not found"}},
    dependencies=[]
)


@router.get("/{competitor_id}", response_model=CompetitorResponse)
async def get_competitor(competitor_id: int, db: Session = Depends(get_db)):
    competitor = db.query(Competitor).filter(and_(Competitor.id == competitor_id)).first()
    if competitor is None:
        raise HTTPException(status_code=404, detail="Competitor not found")
    return CompetitorResponse.from_orm(competitor)


@router.post("/", response_model=CompetitorResponse)
async def post_competitor(competitor_body: CompetitorCreate, db: Session = Depends(get_db)):
    competitor = Competitor(**competitor_body.dict())
    db.add(competitor)
    db.commit()
    db.refresh(competitor)
    return CompetitorResponse.from_orm(competitor)


@router.put("/{competitor_id}", response_model=CompetitorResponse)
async def update_competitor(
        competitor_id: int,
        competitor_update: CompetitorUpdate,
        db: Session = Depends(get_db)
):
    competitor = db.query(Competitor).filter(and_(
        Competitor.id == competitor_id
    )).first()

    if competitor is None:
        raise HTTPException(status_code=404, detail="Competitor not found")

    update_data = competitor_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(competitor, field, value)

    db.commit()
    db.refresh(competitor)

    return CompetitorResponse.from_orm(competitor)

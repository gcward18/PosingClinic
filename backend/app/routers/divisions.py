from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from fastapi import Depends
from app.database import get_db
from app.models.models import Division
from app.schemas.division_schema import DivisionResponse, DivisionCreate, DivisionUpdate
from starlette import status

from backend.app.services.division_crud import CRUDDivision

router = APIRouter(
    prefix="/divisions",
    tags=["divisions"],
    responses={404: {"description": "Not found"}},
    dependencies=[]
)

crud_divisions = CRUDDivision(Division)

@router.get("/{division_id}", response_model=DivisionResponse)
async def get_division(division_id: int, db: Session = Depends(get_db)):
    division = crud_divisions.get(id=division_id, db=db)
    if division is None:
        raise HTTPException(status_code=404, detail="Division not found")
    return DivisionResponse.from_orm(division)


@router.post("/", response_model=DivisionResponse)
async def post_division(division_body: DivisionCreate, db: Session = Depends(get_db)):
    division = crud_divisions.create(db, Division(**division_body.dict()))
    return DivisionResponse.from_orm(division)


@router.put("/{division_id}", response_model=DivisionResponse)
async def update_division(
        division_id: int,
        division_update: DivisionUpdate,
        db: Session = Depends(get_db)
):
    division = crud_divisions.update(db=db, id=division_id, obj_in=division_update.dict(exclude_unset=True))

    if division is None:
        raise HTTPException(status_code=404, detail="Division not found")
    return DivisionResponse.from_orm(division)

@router.delete("/{division_id}")
async def delete_division(id: int, db: Session = Depends(get_db)):
    try:
        crud_divisions.delete(db=db, id=id)
        return status.HTTP_204_NO_CONTENT
    except Exception as e:
        raise HTTPException(status_code=404, detail="Division not found")

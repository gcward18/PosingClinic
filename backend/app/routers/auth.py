from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from starlette import status

from app import settings
from app.config import create_access_token
from app.database import get_current_user, get_db, authenticate_user
from app.models.models import User
from app.schemas.user_schema import UserCreate, UserLogin

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
    responses={404: {"description": "Not found"}},
    dependencies=[],
)

@router.post("/register", status_code=201)
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    hashed_password = User.hash_password(user_data.password)
    db_user = User(
        email=user_data.email,
        username=user_data.username,
        password_hash=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"message": "User registered successfully", "user": db_user}


@router.post("/login",  status_code=200)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    db_user = authenticate_user(form_data, db)
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user.username}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}


# @router.post("/logout", status_code=200)
# async def logout(session_id: int, db: Session = Depends(get_db)):
#     db_session = db.query(UserSession).filter(UserSession.id == session_id).first()
#     if not db_session:
#         return {"message": "Session not found"}
    
#     db.delete(db_session)
#     db.commit()
    
#     return {"message": "Logout successful"}


# @router.get("/current_user", status_code=200)
# async def get_current_user_route(current_user: User = Depends(get_current_user)):
#     return {"user": current_user}


# @router.get("/user_sessions", status_code=200)
# async def get_user_sessions(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
#     sessions = db.query(UserSession).filter(UserSession.user_id == current_user.id).all()
#     return {"sessions": sessions}


# @router.delete("/delete_user", status_code=200)
# async def delete_user(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
#     db.delete(current_user)
#     db.commit()
#     return {"message": "User deleted successfully"}


# @router.delete("/delete_session", status_code=200)
# async def delete_session(session_id: int, db: Session = Depends(get_db)):
#     db_session = db.query(UserSession).filter(UserSession.id == session_id).first()
#     if not db_session:
#         return {"message": "Session not found"}
    
#     db.delete(db_session)
#     db.commit()
    
#     return {"message": "Session deleted successfully"}


# @router.get("/user_sessions/{session_id}", status_code=200)
# async def get_user_session(session_id: int, db: Session = Depends(get_db)):
#     db_session = db.query(UserSession).filter(UserSession.id == session_id).first()
#     if not db_session:
#         return {"message": "Session not found"}
    
#     return {"session": db_session}


# @router.get("/user_sessions/{session_id}/delete", status_code=200)
# async def delete_user_session(session_id: int, db: Session = Depends(get_db)):
#     db_session = db.query(UserSession).filter(UserSession.id == session_id).first()
#     if not db_session:
#         return {"message": "Session not found"}
    
#     db.delete(db_session)
#     db.commit()
    
#     return {"message": "Session deleted successfully"}


# @router.get("/user_sessions/{session_id}/refresh", status_code=200)
# async def refresh_user_session(session_id: int, db: Session = Depends(get_db)):
#     db_session = db.query(UserSession).filter(UserSession.id == session_id).first()
#     if not db_session:
#         return {"message": "Session not found"}
    
#     # Refresh the session expiration time
#     db_session.expires_at = datetime.utcnow() + timedelta(days=1)
#     db.commit()
    
#     return {"message": "Session refreshed successfully", "session": db_session}


# @router.get("/user_sessions/{session_id}/extend", status_code=200)
# async def extend_user_session(session_id: int, db: Session = Depends(get_db)):
#     db_session = db.query(UserSession).filter(UserSession.id == session_id).first()
#     if not db_session:
#         return {"message": "Session not found"}
    
#     # Extend the session expiration time
#     db_session.expires_at = datetime.utcnow() + timedelta(days=1)
#     db.commit()
    
#     return {"message": "Session extended successfully", "session": db_session}


# @router.get("/user_sessions/{session_id}/invalidate", status_code=200)
# async def invalidate_user_session(session_id: int, db: Session = Depends(get_db)):
#     db_session = db.query(UserSession).filter(UserSession.id == session_id).first()
#     if not db_session:
#         return {"message": "Session not found"}
    
#     # Invalidate the session
#     db.delete(db_session)
#     db.commit()
    
#     return {"message": "Session invalidated successfully"}


# @router.get("/user_sessions/{session_id}/validate", status_code=200)
# async def validate_user_session(session_id: int, db: Session = Depends(get_db)):
#     db_session = db.query(UserSession).filter(UserSession.id == session_id).first()
#     if not db_session:
#         return {"message": "Session not found"}
    
#     # Validate the session
#     if db_session.expires_at < datetime.utcnow():
#         return {"message": "Session expired"}
    
#     return {"message": "Session is valid", "session": db_session}

from fastapi import APIRouter, File, UploadFile, Depends
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.exceptions import HTTPException
import base64
import uuid
from datetime import datetime
from sqlalchemy.orm import Session
from app.clients.llm import client
from app.database import get_db, minio_client, BUCKET_NAME
from app.models import Evaluation
import io

router = APIRouter(
    prefix="/evaluations",
    tags=["evaluations"],
    responses={404: {"description": "Not found"}},
    dependencies=[],
)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        # Read file content
        file_content = await file.read()
        encoded_image = base64.b64encode(file_content).decode("utf-8")
        
        # Generate unique filename
        file_extension = file.filename.split('.')[-1] if '.' in file.filename else 'jpg'
        unique_filename = f"{datetime.utcnow().strftime('%Y%m%d')}_{uuid.uuid4()}.{file_extension}"
        
        # Upload to MinIO
        minio_client.put_object(
            BUCKET_NAME,
            unique_filename,
            io.BytesIO(file_content),
            length=len(file_content),
            content_type=file.content_type
        )
        
        # Get AI feedback
        messages = [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Describe the weaknesses and strengths of the pose for this bodybuilder."},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{encoded_image}",
                        }
                    }
                ]
            }
        ]
        
        completion = client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            messages=messages,
            temperature=1,
            max_completion_tokens=1024,
            top_p=1,
            stream=False,
            stop=None,
        )
        
        response_content = completion.choices[0].message.content
        
        # Save to database
        evaluation = Evaluation(
            image_path=f"{BUCKET_NAME}/{unique_filename}",
            feedback=response_content
        )
        db.add(evaluation)
        db.commit()
        db.refresh(evaluation)
        
        return JSONResponse(content={
            "response": response_content,
            "evaluation_id": evaluation.id,
            "image_path": evaluation.image_path
        })
        
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )

@router.get("/")
async def list_evaluations(db: Session = Depends(get_db)):
    evaluations = db.query(Evaluation).order_by(Evaluation.created_at.desc()).all()
    return evaluations

@router.get("/file/{bucket_name}/{filename}")
async def get_file(bucket_name: str, filename: str):
    try:
        # Get file data from MinIO
        data = minio_client.get_object(bucket_name, filename)
        return StreamingResponse(data, media_type="image/jpeg")
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

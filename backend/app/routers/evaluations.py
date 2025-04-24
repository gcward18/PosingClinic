import mimetypes
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
from PIL import Image

router = APIRouter(
    prefix="/evaluations",
    tags=["evaluations"],
    responses={404: {"description": "Not found"}},
    dependencies=[],
)

async def get_feedback(encoded_image: str) -> str:
    """
    Function for feedback generation.
    """
    messages = [
        {
            "role": "user",
            "content": [
                {
                    "type": "text", 
                    "text": (
                        "Can you critique this pose and make suggestions on "
                        "how to perform it better and highlight the strengths "
                        "of the bodybuilder in the photo"
                    )
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/webp;base64,{encoded_image}",
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
    return response_content

async def process_file(file: UploadFile = File(...)) -> [str, str]:
    """
    Function to process the uploaded file.
    """
    # Read file content
    file_content = await file.read()
    
    # Open and process the image
    image = Image.open(io.BytesIO(file_content))
    image = image.resize((1200, 800))   # Resize image
    image = image.convert("RGB")        # Convert to RGB if not already
    
    # Compress and convert to WEBP format
    image_bytes_arr = io.BytesIO()
    image.save(image_bytes_arr, format="WEBP", quaility=80)
    image_bytes_arr.seek(0)
    
    # Encode image to base64
    encoded_image = base64.b64encode(image_bytes_arr.getvalue()).decode("utf-8")
    
    # Generate unique filename
    unique_filename = f"{datetime.utcnow().strftime('%Y%m%d')}_{uuid.uuid4()}.webp"
    
    # Upload to MinIO
    minio_client.put_object(
        BUCKET_NAME,
        unique_filename,
        io.BytesIO(file_content),
        length=len(file_content),
        content_type=file.content_type
    )
    return encoded_image, unique_filename

@router.post("/upload")
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        encoded_image, unique_filename = await process_file(file)
        
        # Get AI feedback
        response_content = await get_feedback(encoded_image)
        
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
        mime_type, _ = mimetypes.guess_type(filename)
        if mime_type is None:
            mime_type = "application/octet-stream"
            
        return StreamingResponse(data, media_type=mime_type)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

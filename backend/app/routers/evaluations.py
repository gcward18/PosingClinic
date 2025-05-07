import mimetypes
from fastapi import APIRouter, File, UploadFile, Depends, Request
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.exceptions import HTTPException
import base64
import uuid
from datetime import datetime
from sqlalchemy.orm import Session
from app.clients.llm import client
from app.database import get_db, minio_client, BUCKET_NAME
from app.models.models import Evaluation
import io
from PIL import Image
import asyncio
from typing import AsyncGenerator
import json
from app.schemas.evaluations_schema import EvaluationResponse
from app.services.evaluation_crud import CRUDEvaluation
from app.services.evaluation_queue import evaluation_queue,EvaluationStatus

router = APIRouter(
    prefix="/evaluations",
    tags=["evaluations"],
    responses={404: {"description": "Not found"}},
    dependencies=[],
)

crud_evaluations = CRUDEvaluation(Evaluation)

def format_sse_event(id: int, event: str, data: dict) -> str:
    """
    Function to format the server-sent event.
    """
    event_data = f"id: {id}\nevent: {event}\ndata: {data}\n\n"
    return event_data

async def event_generator() -> AsyncGenerator[str, None]:
    """
    Function to generate events for streaming.
    Sends evaluation status updates when available.
    """
    while True:
        if evaluation_queue:
            evaluation = evaluation_queue.popleft()
            
            event_data = {
                "type": "evaluation_response",
                "id": evaluation.id,
                "status": evaluation.status,
            }
            
            if evaluation.result:
                event_data["result"] = evaluation.result
            
            sse_event = format_sse_event(
                id=evaluation.id,
                event=evaluation.status,
                data=json.dumps(event_data)
            )
            
            yield sse_event.encode("utf-8")
        await asyncio.sleep(1)


@router.get("/stream")
async def stream_events(request: Request):
    '''
    Endpoint that returns a server sent event stream.
    '''
    async def generator():
        async for event in event_generator():
            yield event
            if await request.is_disconnected():
                print("Client disconnected")
                break
    return StreamingResponse(generator(), media_type="text/event-stream")


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
                        """You are an IFBB-level posing coach and judge. Analyze the uploaded bodybuilding pose photo with a focus on presentation and muscular detail. Provide clear, constructive feedback organized under the following 5 sections:
                            
                            Overall Pose Execution
                            
                            Is the pose symmetrical and clean?
                            
                            Are key muscle groups being showcased effectively?
                            
                            Head, Torso, and Core
                            
                            Is the head positioned naturally and in line?
                            
                            Is the chest lifted and the core tight?
                            
                            Arms and Upper Extremities
                            
                            Are the arms at the right angle and flexed correctly?
                            
                            Do the hands distract or support the pose?
                            
                            Hips, Legs, and Feet
                            
                            Are the hips neutral and glutes engaged?
                            
                            Are the legs flexed and feet well-positioned?
                            
                            Improvements
                            
                            Suggest 2–3 specific adjustments for better stage presentation.
                            
                            Identify 1–2 muscle groups that need more development.
                            
                            Keep your tone professional and supportive. Be precise and useful, as if preparing the athlete for a top-tier competition."""

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
    try:
        minio_client.put_object(
            BUCKET_NAME,
            unique_filename,
            io.BytesIO(file_content),
            length=len(file_content),
            content_type=file.content_type
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading file: {str(e)}")
    return encoded_image, unique_filename


async def process_evaluation(evaluation_id: int, encoded_image: str, db: Session, evaluation_status: EvaluationStatus):
    """
    Function to process the evaluation.
    """
    try: 
        # get ai critique
        feedback = await get_feedback(encoded_image)
        
        # update evaluation status
        evaluation = crud_evaluations.get(id=evaluation_id, db=db)
        evaluation.feedback = feedback
        db.commit()
        
        # Update evaluation status for SSE
        evaluation_status.status = "completed"
        evaluation_status.result = feedback
    except Exception as e:
        # Update evaluation status for SSE
        evaluation_status.status = 'failed'
        evaluation_status.result = str(e)
        

@router.post("/upload")
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        encoded_image, unique_filename = await process_file(file)

        # Create evaluation entry in the database
        evaluation = Evaluation(
            image_path=f"{BUCKET_NAME}/{unique_filename}",
            feedback=""
        )
        db.add(evaluation)
        db.commit()
        db.refresh(evaluation)

        # add event to the processing queue
        evaluation_status = EvaluationStatus(
            id=evaluation.id,
            status="processing",
            created_at=datetime.utcnow()
        )
        evaluation_queue.append(evaluation_status)
        
        # process the feedback asynchronously
        asyncio.create_task(process_evaluation(evaluation.id, encoded_image, db, evaluation_status))
        
        return JSONResponse(content={
            "message": "Evaluation processing",
            "evaluation_id": evaluation.id
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



@router.get("/{evaluation_id}", response_model=EvaluationResponse)
async def get_evaluation(evaluation_id: int, db: Session = Depends(get_db)):
    evaluation = crud_evaluations.get(id=evaluation_id, db=db)
    if evaluation is None:
        raise HTTPException(status_code=404, detail="Evaluation not found")
    return EvaluationResponse.from_orm(evaluation)

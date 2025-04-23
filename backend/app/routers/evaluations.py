from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse
import base64
from ..clients.llm import client

router = APIRouter(
    prefix="/evaluations",
    tags=["evaluations"],
    responses={404: {"description": "Not found"}},
    dependencies=[],
)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_content = await file.read()
        encoded_image = base64.b64encode(file_content).decode("utf-8")
        
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
        return JSONResponse(content={"response": response_content})
        
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )

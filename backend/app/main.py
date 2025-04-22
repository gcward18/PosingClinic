from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
from groq import Groq
import base64
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Groq client
client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.post("/upload")
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
    
# def process_file(file_bytes, filename):
#     socketio.emit('file_received', {'data': filename})
#     encoded_file = base64.b64encode(file_bytes).decode("utf-8")
#     _, file_extension = os.path.splitext(filename)
    
#     messages = [
#         {
#             "role": "user",
#             "content": [
#                 {"type": "text", "text": "Describe the weaknesses and strengths of the pose for this bodybuilder."},
#                 {
#                     "type": "image",
#                     "image": {
#                         "data": encoded_file,
#                         "mime_type": f"image/{file_extension[1:].lower()}"
#                     }
#                 }
#             ]
#         }
#     ]
    
#     response = llama_client.inference.chat_completion(
#         model_id="llama3.2-vision:11b",
#         messages=messages
#     )
#     socketio.emit('file_processed', {'response': response.completion_message.content})

# @socketio.on('connect')
# def handle_connect():
#     print('Client connected')
#     socketio.emit('connected', {'data': 'Connected to server'})

# @socketio.on('disconnect')
# def handle_disconnect():
#     print('Client disconnected')

# @app.route('/uploads/<filename>', methods=['GET'])
# def uploaded_file(filename):
#     return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    # socketio.run(app, debug=True, port=5000)
    app.run(debug=True, port=5000)
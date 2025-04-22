from flask import Flask, request, send_from_directory, jsonify
import os
from flask_cors import CORS
from flask_socketio import SocketIO
from json import loads as json_loads, dumps as json_dumps
from groq import Groq
import base64
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app)

client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)
socketio = SocketIO(app, cors_allowed_origins="*")

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files.get('file')
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
        
    # if file:
    #     filename = file.filename
    #     thread = threading.Thread(target=process_file, args=(file.read(), filename,))
    #     thread.start()
    #     file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    #     return jsonify({"filename": filename}), 200

    if file:
        encoded_image = base64.b64encode(file.read()).decode("utf-8")
        
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
        
        # Extract the content from the message
        response_content = completion.choices[0].message.content
        
        return jsonify({"response": response_content}), 200
    
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

@app.route('/uploads/<filename>', methods=['GET'])
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    # socketio.run(app, debug=True, port=5000)
    app.run(debug=True, port=5000)
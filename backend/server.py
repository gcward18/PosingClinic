from flask import Flask, request, send_from_directory, jsonify
import os
from flask_cors import CORS
from json import loads as json_loads, dumps as json_dumps
app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files.get('file')
    metadata = json_loads(request.form.get('metadata'))
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if not metadata:
        return jsonify({"error": "No metadata provided"}), 400
    
    if metadata['model'] not in ['llama3.2-vision:11b', 'llama3.2-vision:7b']:
        return jsonify({"error": "Invalid model"}), 400
    
    if file:
        filename = file.filename
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return jsonify({"filename": filename}), 200

@app.route('/uploads/<filename>', methods=['GET'])
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
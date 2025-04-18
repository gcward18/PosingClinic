import os
from llama_stack_client import LlamaStackClient
import base64

# Initialize the client
client = LlamaStackClient(base_url="http://localhost:8321")

# Load and encode the image
image_path = "./images/file_example_JPG_100kB.jpg"
with open(image_path, "rb") as image_file:
    encoded_image = base64.b64encode(image_file.read()).decode("utf-8")
    
_, file_extension = os.path.splitext(image_path)
mime_type = f"image/{file_extension[1:].lower()}"  # Extract extension and lowercase

# Prepare the message with the image
messages = [
    {
        "role": "user",
        "content": [
            {"type": "text", "text": "Describe the contents of this image."},
            {
                "type": "image",
                "image": {
                    "data": encoded_image,
                    "mime_type": mime_type
                }
            }
        ]
    }
]

# Send the request to the server
response = client.inference.chat_completion(
    model_id="llama3.2-vision:11b",
    messages=messages
)

# Print the response
print(response.completion_message.content)


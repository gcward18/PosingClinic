import os
from llama_stack_client import LlamaStackClient
import base64

# Initialize the client
client = LlamaStackClient(base_url="http://localhost:8321")

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


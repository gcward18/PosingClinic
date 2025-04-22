import os
from dotenv import load_dotenv
load_dotenv()
import base64



# Load and encode the image
image_path = "./backend/uploads/IMG_1484.jpeg"
print(os.path, os.path.exists(image_path))
with open(image_path, "rb") as image_file:
    encoded_image = base64.b64encode(image_file.read()).decode("utf-8")
    
_, file_extension = os.path.splitext(image_path)
mime_type = f"image/{file_extension[1:].lower()}"  # Extract extension and lowercase


completion = client.chat.completions.create(
    model="meta-llama/llama-4-scout-17b-16e-instruct",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Please critique this back double bicep pose?"
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{encoded_image}",
                    }
                }
            ]
        }
    ],
    temperature=1,
    max_completion_tokens=1024,
    top_p=1,
    stream=False,
    stop=None,
)

print(completion.choices[0].message)



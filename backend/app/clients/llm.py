import os
from groq import Groq

# Initialize Groq client
client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)

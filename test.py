import os
import google.generativeai as genai

# genai.configure(api_key=os.environ["GEMINI_API_KEY"])
genai.configure(api_key="AIzaSyDWOU2OMb3Le7e48gvG6tEV0eQnvHYPzBI")

# Create the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-2.0-flash-exp",
  generation_config=generation_config,
)

chat_session = model.start_chat(
  history=[
    # {
    #   "role": "user",
    #   "parts": [
    #     "hello\n",
    #   ],
    # },
    # {
    #   "role": "model",
    #   "parts": [
    #     "Hi there! How can I help you today?\n",
    #   ],
    # },
  ]
)

response = chat_session.send_message("How are you today")

print(response.text)
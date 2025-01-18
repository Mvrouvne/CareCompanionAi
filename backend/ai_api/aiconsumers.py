from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import User
from api.models import user_ai_Messages
import google.generativeai as genai
import requests
import asyncio
import json
import os


class aiConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']
        self.channel_id = f'channel_{self.user.id}'
        if self.user.is_anonymous:
            print('unauthenticated User')
            await self.close()

        else:
            await self.channel_layer.group_add(self.channel_id, self.channel_name)
            await self.accept()
            print('connection established...')

    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.channel_id, self.channel_name)
        print(f'User {self.user.username} disconnected')

    async def receive(self, text_data):
        text_data_dic = json.loads(text_data)
        if 'user_prompt' in text_data_dic:
            user_prompt = text_data_dic['user_prompt']
            print('user prompt: ', user_prompt)
            await self.channel_layer.group_send(
                self.channel_id,
                {
                    'type': 'ai_processing',
                    'user_prompt': user_prompt
                })

    async def ai_processing(self, event):
        ai_response = await self.generateResponse(event['user_prompt'])

        ## Save data ###
        QandA = user_ai_Messages(
            user=self.user,
            userMessages=event['user_prompt'],
            aiMessages=ai_response,
        )
        await database_sync_to_async(QandA.save)()

        await self.send(text_data=json.dumps(
            {
                'type': 'ai_response',
                'ai_response': ai_response,
            }
        ))

    async def generateResponse(self, user_prompt):
        print('dkhhhhhhhhhhhhhhhhhl')
        flowise_url = os.getenv('FLOWISE_API_URL')
        flowise_api = os.getenv('FLOWISE_API_KEY')
        url = 'http://flowise:3000/api/v1/prediction/cb9867f9-658c-4207-be82-0cf1fd1420d3/'
        headers = {
            "Authorization": "Bearer 2FJljlbqVJxt7N-FtrAoF_Wqe1IQ659jmINN1L0qMyo"}
        user_input = {"question": user_prompt,
                      'overrideConfig': {'sessionId': self.channel_id}}

        response = requests.post(url, headers=headers, json=user_input)
        res = response.json()
        print('response---- ', res)
        return res['text']

        # genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

        # # Create the model
        # generation_config = {
        #     "temperature": 1,
        #     "top_p": 0.95,
        #     "top_k": 40,
        #     "max_output_tokens": 1024,
        #     "response_mime_type": "text/plain",
        # }

        # model = genai.GenerativeModel(
        #     model_name="gemini-1.5-flash-002",
        #     generation_config=generation_config,
        # )

        # chat_session = model.start_chat(
        #     history=[
        #         {
        #             "role": "assistant",
        #             "parts": [
        #                 "You are CareCompanion, an empathetic and knowledgeable assistant specializing in mental and physical care. You provide practical, compassionate advice on a wide range of topics such as mobility, nutrition, safety, and emotional well-being for individuals of all ages. While you do not provide medical advice, your role is to listen carefully, understand the person's specific issues, and offer guidance, support, and emotional companionship. Always ask for details about the individual's specific concerns and give thoughtful advice tailored to their needs. Most importantly, the patient should not feel like he is talking to an ai, you should feel human just like him."
        #             ]
        #         },
        #     ]
        # )

        # response = chat_session.send_message(user_prompt)
        # return response.text

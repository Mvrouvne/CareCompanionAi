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
        flowise_url = os.getenv('FLOWISE_API_URL')
        flowise_api = os.getenv('FLOWISE_API_KEY')

        url = f'http://flowise:3000/api/v1/prediction/{flowise_url}/'
        headers = {
            "Authorization": f"Bearer {flowise_api}"}
        user_input = {"question": user_prompt,
                      'overrideConfig': {'sessionId': self.channel_id}}

        response = requests.post(url, headers=headers, json=user_input)
        res = response.json()
        return res['text']
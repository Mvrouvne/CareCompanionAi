from channels.generic.websocket import AsyncWebsocketConsumer

class aiConsumer(AsyncWebsocketConsumer):
    async def   connect(self):
        self.conversation_Id = self.scope['url_route']['kwargs']['id']
        print(self.conversation_Id)
        await self.accept()
        print('connection established')
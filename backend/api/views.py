from django.shortcuts import render
from .models import user_ai_Messages
from rest_framework.views import APIView
from rest_framework.response import Response
from .MessagesSerializer import MessagesSerializer


class GetUserAiMessages(APIView):
    def get(self, request):
        messages = user_ai_Messages.objects.filter(user=request.user).order_by('id')
        serializedMessages = MessagesSerializer(messages, many=True)
        return Response(serializedMessages.data)
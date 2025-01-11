from .models import user_ai_Messages
from rest_framework import serializers

class   MessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_ai_Messages
        fields = ['userMessages', 'aiMessages']
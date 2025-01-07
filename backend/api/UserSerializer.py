from djoser.serializers import UserCreateSerializer
from django.contrib.auth.models import User
from rest_framework import serializers

class   UserSerializer(UserCreateSerializer):
    email = serializers.EmailField(required=True)

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ['username', 'email', 'password']
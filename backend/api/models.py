from django.db import models
from django.contrib.auth.models import User

class   user_ai_Messages(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    userMessages = models.TextField(max_length=1000)
    aiMessages = models.TextField()

    def __str__(self):
        return f'Conversation of {self.user}'
from django.urls import path
from .views import GetUserAiMessages

urlpatterns = [
    path('user-ai-messages/', GetUserAiMessages.as_view()),
]
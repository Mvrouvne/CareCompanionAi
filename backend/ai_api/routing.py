from django.urls import re_path
from .aiconsumers import aiConsumer

urlpatterns = [
    # re_path(r'ws/user-prompt/(?P<id>\d+)/$', aiConsumer.as_asgi()),
    re_path(r'ws/user-ai-socket/', aiConsumer.as_asgi()),
]

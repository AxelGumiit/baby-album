from rest_framework import serializers
from .models import Media  # updated model name to handle photos & videos

class MediaSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True, required=False)
    video = serializers.FileField(use_url=True, required=False)

    class Meta:
        model = Media
        fields = ['id', 'image', 'video', 'uploaded_at']

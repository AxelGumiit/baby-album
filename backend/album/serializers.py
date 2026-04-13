from rest_framework import serializers
from .models import Media

class MediaSerializer(serializers.ModelSerializer):
    uploader_name = serializers.CharField(required=False, allow_null=True)
    image = serializers.ImageField(use_url=True, required=False)
    video = serializers.FileField(use_url=True, required=False)

    class Meta:
        model = Media
        fields = ['id', 'uploader_name', 'image', 'video', 'uploaded_at']

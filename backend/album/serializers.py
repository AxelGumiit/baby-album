from rest_framework import serializers
from .models import Photo

class PhotoSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)  # ensures Cloudinary URL is returned

    class Meta:
        model = Photo
        fields = ['id', 'name', 'message', 'image', 'uploaded_at']

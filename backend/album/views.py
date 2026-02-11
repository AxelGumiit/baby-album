from rest_framework import generics
from .models import Photo
from .serializers import PhotoSerializer

class PhotoListCreateView(generics.ListCreateAPIView):
    queryset = Photo.objects.order_by('-uploaded_at')
    serializer_class = PhotoSerializer

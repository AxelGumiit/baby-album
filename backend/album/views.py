from rest_framework import generics
    from .models import Media
from .serializers import MediaSerializer

class MediaListCreateView(generics.ListCreateAPIView):
    queryset = Media.objects.all().order_by('-uploaded_at')
    serializer_class = MediaSerializer

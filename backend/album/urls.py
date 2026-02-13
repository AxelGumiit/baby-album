from django.urls import path
from .views import PhotoListCreateView

urlpatterns = [
    path('api/photos/', PhotoListCreateView.as_view(), name='photo-list-create'),
]

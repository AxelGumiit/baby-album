from django.urls import path
from .views import MediaListCreateView  # updated to new view

urlpatterns = [
    path('media/', MediaListCreateView.as_view(), name='media-list-create'),
]

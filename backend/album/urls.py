from django.urls import path
from .views import MediaListCreateView, MediaRetrieveUpdateDestroyView

urlpatterns = [
    path('media/', MediaListCreateView.as_view()),
    path('media/<int:pk>/', MediaRetrieveUpdateDestroyView.as_view()),
]
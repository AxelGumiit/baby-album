from django.urls import path
from .views import MediaListCreateView, MediaRetrieveDestroyView

urlpatterns = [
    path('media/', MediaListCreateView.as_view()),
    path('media/<int:pk>/', MediaRetrieveDestroyView.as_view()),
]
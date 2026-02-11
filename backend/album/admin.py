from django.contrib import admin
from .models import Photo

@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ('name', 'uploaded_at')
    search_fields = ('name',) 
    list_filter = ('uploaded_at',)

from django.contrib import admin
from .models import Media  # updated model

@admin.register(Media)
class MediaAdmin(admin.ModelAdmin):
    list_display = ('id', 'image_tag', 'video_tag', 'uploaded_at')
    list_filter = ('uploaded_at',)
    readonly_fields = ('image_tag', 'video_tag')

    def image_tag(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" width="100" style="border-radius:10px" />'
        return "-"
    image_tag.allow_tags = True
    image_tag.short_description = "Photo Preview"

    def video_tag(self, obj):
        if obj.video:
            return f'<video width="150" controls><source src="{obj.video.url}" type="video/mp4"></video>'
        return "-"
    video_tag.allow_tags = True
    video_tag.short_description = "Video Preview"


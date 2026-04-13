from django.db import models

class Media(models.Model):
    uploader_name = models.CharField(max_length=100, blank=True, null=True)

    image = models.ImageField(upload_to='photos/', blank=True, null=True)
    video = models.FileField(upload_to='videos/', blank=True, null=True)

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.image and self.video:
            return f"{self.uploader_name or 'Anonymous'} - Photo & Video at {self.uploaded_at}"
        elif self.image:
            return f"{self.uploader_name or 'Anonymous'} - Photo at {self.uploaded_at}"
        elif self.video:
            return f"{self.uploader_name or 'Anonymous'} - Video at {self.uploaded_at}"
        return f"{self.uploader_name or 'Anonymous'} upload at {self.uploaded_at}"
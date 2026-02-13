from django.db import models

class Media(models.Model):
    # Optional image
    image = models.ImageField(upload_to='photos/', blank=True, null=True)
    
    # Optional video
    video = models.FileField(upload_to='videos/', blank=True, null=True)
    
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        # Show type of media uploaded
        if self.image and self.video:
            return f"Photo & Video uploaded at {self.uploaded_at}"
        elif self.image:
            return f"Photo uploaded at {self.uploaded_at}"
        elif self.video:
            return f"Video uploaded at {self.uploaded_at}"
        return f"Anonymous upload at {self.uploaded_at}"

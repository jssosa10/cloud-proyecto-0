from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

CATEGORY_CHOICES = [
    ('CONFERENCE', 'CONFERENCE'),
    ('SEMINAR', 'SEMINAR'),
    ('CONGRESS', 'CONGRESS'),
    ('COURSE', 'COURSE')
]

TYPE_CHOICES = [
    ('VIRTUAL', 'VIRTUAL'),
    ('PRESENCIAL', 'PRESENCIAL')
]

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

class Event(models.Model):
    owner = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event_name = models.CharField(max_length=120)
    event_category = models.CharField(max_length=20,
                            choices=CATEGORY_CHOICES)
    event_place = models.CharField(max_length=120)
    event_address = models.CharField(max_length=120)

    event_initial_date = models.DateTimeField(auto_now_add=False)
    event_final_date = models.DateTimeField(auto_now_add=False)
    event_type = models.CharField(max_length=120,
                        choices=TYPE_CHOICES)
    
    thumbnail = models.ImageField(upload_to="event_thumbnails")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
         ordering = ['-created_at']

    def __str__(self):
        return self.name

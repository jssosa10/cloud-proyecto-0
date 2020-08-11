from rest_framework import serializers
from django.contrib.auth import get_user_model # If used custom user model
import base64
from django.conf import settings
import os
from .models import Event

UserModel = get_user_model()



class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    def create(self, validated_data):

        user = UserModel.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

    class Meta:
        model = UserModel
        fields = ["username", "first_name", "last_name", "email", "password"]

class EventSerializer(serializers.ModelSerializer):
    # thumbnail = serializers.SerializerMethodField('encode_thumbnail')

    # def encode_thumbnail(self, event):
    #      print("TEST",event, flush=True)
    #      with open(os.path.join(settings.MEDIA_ROOT, event.thumbnail.name), "rb") as image_file:
    #          return base64.b64encode(image_file.read())
    
    class Meta:
        model = Event
        fields = ("id","event_name","event_category","event_place","event_address","event_initial_date","event_final_date","event_type","thumbnail")

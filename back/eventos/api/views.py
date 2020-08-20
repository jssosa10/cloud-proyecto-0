from rest_framework.response import Response
from rest_framework.views import APIView
from . import serializers
from .models import Event
from django.http import Http404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


class User(APIView):

    def post(self, request):
        serializer = serializers.UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Events(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        """ Get all events """
        events = Event.objects.filter(owner=request.user.id)
        serializer = serializers.EventSerializer(events, many=True)
        return Response(serializer.data)

    def post(self, request):
        """ Adding a new event. """
        print(request.data)
        serializer = serializers.EventSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=
                status.HTTP_400_BAD_REQUEST)
        else:
            owner = request.user
            serializer.save(owner=owner)
        
            return Response(serializer.data, status=status.HTTP_201_CREATED)

class EventDetail(APIView):
    permission_classes = (IsAuthenticated,)

    def delete(self, request, event_id):
        try:
            owner = request.user
            event = Event.objects.get(owner=owner, pk=event_id)
        except Event.DoesNotExist:
            raise Http404
        serializer = serializers.EventSerializer(event)
        res = serializer.data
        event.delete()
        return Response(res,status=status.HTTP_200_OK)

    def get(self, request, event_id):
        try:
            owner = request.user
            event = Event.objects.get(owner=owner, pk=event_id)
        except Event.DoesNotExist:
            raise Http404
        serializer = serializers.EventSerializer(event)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, event_id):
        try:
            owner = request.user
            event = Event.objects.get(owner=owner, pk=event_id)
        except Event.DoesNotExist:
            raise Http404

        serializer = serializers.EventSerializer(event, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=
                status.HTTP_400_BAD_REQUEST)
        else:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

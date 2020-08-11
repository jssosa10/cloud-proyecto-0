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
        """ Get all todos """
        todos = Event.objects.filter(owner=request.user.id)
        serializer = serializers.EventSerializer(todos, many=True)
        return Response(serializer.data)

    def post(self, request):
        """ Adding a new todo. """
        print(request.data)
        serializer = serializers.EventSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=
                status.HTTP_400_BAD_REQUEST)
        else:
            data = serializer.data
            print(data, flush=True)
            owner = request.user
            print(owner,flush=True)
            event = Event(owner=owner, **data)
            event.save()
            request.data['id'] = event.pk # return id
            return Response(request.data, status=status.HTTP_201_CREATED)

    # def put(self, request, todo_id):
    #     """ Update a todo """
    #     serializer = serializers.EventSerializer(data=request.DATA)
    #     if not serializer.is_valid():
    #         return Response(serializer.errors, status=
    #             status.HTTP_400_BAD_REQUEST)
    #     else:
    #         data = serializer.data
    #         desc = data['description']
    #         done = data['done']
    #         t = Todo(id=todo_id, owner=request.user, description=desc,\
    #                  done=done, updated=datetime.now())
    #         t.save()
    #         return Response(status=status.HTTP_200_OK)
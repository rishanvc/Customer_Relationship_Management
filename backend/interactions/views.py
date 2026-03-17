from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import InteractionNoteSerializer
from .models import InteractionNote
# Create your views here.

class InteractionNoteCreateView(APIView):
    def post(self,request):
        serializer=InteractionNoteSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message":"The note added successfully"},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)




class InteractionNoteListView(APIView):

    def get(self, request):
        user = request.user

        # Admin → see all notes
        if user.role == "admin":
            notes = InteractionNote.objects.all()

        # Staff → see only their notes
        else:
            notes = InteractionNote.objects.filter(staff=user)

        serializer = InteractionNoteSerializer(notes, many=True)
        return Response(serializer.data)
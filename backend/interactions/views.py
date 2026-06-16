from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import InteractionNoteSerializer
from .models import InteractionNote
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsStaffUserRole
from datetime import date
# Create your views here.

class InteractionNoteCreateView(APIView):
    permission_classes=[IsStaffUserRole]

    def post(self,request):
        serializer=InteractionNoteSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(staff=request.user)
            return Response({"message":"The note added successfully"},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)





class InteractionNoteListView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self, request):
        user = request.user

        # today=date.today()
        # Admin → see all notes
        if user.role == "admin":
            # notes = InteractionNote.objects.filter(created_at__date=today)
            notes=InteractionNote.objects.all()

        # Staff → see only their notes
        else:
            notes = InteractionNote.objects.filter(staff=user)

        serializer = InteractionNoteSerializer(notes, many=True)
        return Response(serializer.data)
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import StaffRegisterSerializer,StaffListSerializer,StaffUpdateSerializer
from django.contrib.auth import authenticate
from .models import User
from rest_framework.authtoken.models import Token
from .permissions import IsAdminUserRole
# Create your views here.


class StaffRegisterView(APIView):
    def post(self,request):
        serializer=StaffRegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message":"Staff registered successfully, Waiting for the admins approval"},
                status=status.HTTP_201_CREATED
                )
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

class LoginView(APIView):

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is None:
            return Response(
                {"error": "Invalid username or password"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        if not user.is_active:
            return Response(
                {"message": "Your account is waiting for admin approval"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        token,created=Token.objects.get_or_create(user=user)

        return Response(
            {
                "message": "Login successful",
                "token":token.key,
                "role": user.role,
                "username": user.username
            }
        )
    



class StaffListView(APIView):
    permission_classes=[IsAdminUserRole]

    def get(self,request):
        staff_users=User.objects.filter(role='staff')
        serializer=StaffListSerializer(staff_users,many=True)
        return Response(serializer.data)
    

class ApproveStaffView(APIView):
    permission_classes=[IsAdminUserRole]

    def patch(self,request,pk):
        try:
            user_staff=User.objects.get(id=pk,role='staff')
        except User.DoesNotExist():
            return Response({"error":"the staff does not exists"},status=status.HTTP_404_NOT_FOUND)
        
        user_staff.is_active=True
        user_staff.save()
        return Response({"message":"the staff approved successfully"})

class DeleteStaffView(APIView):
    permission_classes=[IsAdminUserRole]

    def delete(self,request,pk):
        try:
            user_staff=User.objects.get(id=pk,role='staff')
        except User.DoesNotExist():
            return Response({"error":"the staff does not exist"},status=status.HTTP_404_NOT_FOUND)
        
        user_staff.delete()
        
        return Response({"message":"the staff deleted successfully"},status=status.HTTP_204_NO_CONTENT)



class UpdateStaffView(APIView):
    permission_classes=[IsAdminUserRole]
    
    def patch(self,request,pk):
        try:
            staff_user=User.objects.get(id=pk,role='staff')
        except User.DoesNotExist():
            return Response({"error":"the staff does not exist"},status=status.HTTP_404_NOT_FOUND)
        
        serializer=StaffUpdateSerializer(staff_user,data=request.data,partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response("Staff updated successfully")
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



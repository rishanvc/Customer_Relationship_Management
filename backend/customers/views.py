from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Customer
from .serializers import CustomerSerializer
from accounts.permissions import IsAdminUserRole,IsStaffUserRole
from rest_framework.permissions import IsAuthenticated
# Create your views here.


class CustomerCreateView(APIView):
    permission_classes=[IsAdminUserRole]

    def post(self,request):
        serializer=CustomerSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message":"The customer added successfully"},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

class CustomerListView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        user=request.user
        if user.role=='admin':
            customers=Customer.objects.all()
        else:
            customers=Customer.objects.filter(assigned_user=user)

        serializer=CustomerSerializer(customers,many=True)
        return Response(serializer.data)
    

class CustomerUpdateView(APIView):
    permission_classes=[IsAuthenticated]

    def patch(self, request, pk):
        try:
            customer = Customer.objects.get(id=pk)
        except Customer.DoesNotExist:
            return Response(
                {"error": "Customer not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        user = request.user

        # Staff can only update lead status
        if user.role == "staff":
            lead_status = request.data.get("lead_status")

            if lead_status:
                customer.lead_status = lead_status
                customer.save()
                return Response({"message": "Lead status updated"})

            return Response(
                {"error": "Staff can only update lead status"},
                status=status.HTTP_403_FORBIDDEN
            )

        # Admin can update full customer details
        serializer = CustomerSerializer(customer, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Customer updated successfully"})

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



    
class CustomerDeleteView(APIView):
    permission_classes=[IsAdminUserRole]

    def delete(self, request, pk):
        try:
            customer = Customer.objects.get(id=pk)
        except Customer.DoesNotExist:
            return Response(
                {"error": "Customer not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        customer.delete()

        return Response(
            {"message": "Customer deleted successfully"},
            status=status.HTTP_204_NO_CONTENT
        )


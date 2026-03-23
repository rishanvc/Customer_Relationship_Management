from rest_framework import serializers
from .models import InteractionNote


class InteractionNoteSerializer(serializers.ModelSerializer):

    customer_name = serializers.CharField(source="customer.name", read_only=True)
    staff_name = serializers.CharField(source="staff.username", read_only=True)

    class Meta:
        model = InteractionNote
        fields = ['id', 'customer', 'customer_name', 'staff_name', 'note', 'created_at']
        read_only_fields = ['staff_name', 'created_at']
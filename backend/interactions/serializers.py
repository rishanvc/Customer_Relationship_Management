from rest_framework import serializers
from .models import InteractionNote


class InteractionNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model=InteractionNote
        fields='__all__'
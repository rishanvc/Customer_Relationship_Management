from rest_framework import serializers
from .models import User

class StaffRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['username','email','password']
    
    def create(self, validated_data):
        user=User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role='staff',
            is_active=False
        )
        return user
    

    
class StaffListSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','email','is_active']

class StaffUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['username','email']

    
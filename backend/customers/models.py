from django.db import models
from django.conf import settings

# Create your models here.
class Customer(models.Model):
    LEAD_STATUS=[
        ('new','New'),
        ('contacted','Contacted'),
        ('follow_up','Follow up'),
        ('converted','Converted'),
        ('lost','Lost'),
    ]
    name=models.CharField(max_length=20)
    email = models.EmailField(unique=True, null=True, blank=True)
    phone=models.CharField(max_length=20)
    lead_status=models.CharField(max_length=20,choices=LEAD_STATUS,default='new')
    assigned_user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.SET_NULL,null=True,blank=True)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
                                    
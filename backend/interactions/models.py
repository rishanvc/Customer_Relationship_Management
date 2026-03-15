from django.db import models
from django.conf import settings
from customers.models import Customer

# Create your models here.

class InteractionNote(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE)
    staff=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    note=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer.name} - {self.staff.username}"


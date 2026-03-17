from django.contrib import admin
from .models import InteractionNote

# Register your models here.
@admin.register(InteractionNote)
class InteractionNoteAdmin(admin.ModelAdmin):
    list_display=('customer','staff','note','created_at')


from django.urls import path
from .views import InteractionNoteCreateView,InteractionNoteListView

urlpatterns = [
    path('notes/', InteractionNoteCreateView.as_view(), name='add-note'),
    path('notes/list/', InteractionNoteListView.as_view(), name='note-list'),
]
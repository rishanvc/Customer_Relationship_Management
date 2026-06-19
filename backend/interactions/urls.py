from django.urls import path
from .views import InteractionNoteCreateView,InteractionNoteListView,SummarizeNoteView

urlpatterns = [
    path('notes/', InteractionNoteCreateView.as_view(), name='add-note'),
    path('notes/list/', InteractionNoteListView.as_view(), name='note-list'),
    path('notes/summarize/', SummarizeNoteView.as_view(), name='summarize-note'),
]
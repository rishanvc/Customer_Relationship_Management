from django.urls import path
from .views import StaffRegisterView,LoginView,StaffListView,ApproveStaffView,DeleteStaffView,UpdateStaffView

urlpatterns = [
    path('register/',StaffRegisterView.as_view(),name='staff-register '),
    path('login/',LoginView.as_view(),name='login'),
    path('staff/',StaffListView.as_view(),name='staff-list'),
    path('staff/<int:pk>/approve/',ApproveStaffView.as_view(),name='staff-approve'),
    path('staff/<int:pk>/delete/',DeleteStaffView.as_view(),name='staff-delete'),
    path('staff/<int:pk>/update/',UpdateStaffView.as_view(),name='staff-update'),
]

from django.urls import path
from .views import CustomerCreateView,CustomerListView,CustomerUpdateView,CustomerDeleteView

urlpatterns = [
    path('customers/',CustomerCreateView.as_view(),name='create-customer'),
    path('customers/list/',CustomerListView.as_view(),name='customer-list'),
    path('customers/<int:pk>/update/',CustomerUpdateView.as_view(),name='customer-update'),
    path('customers/<int:pk>/delete/',CustomerDeleteView.as_view(),name='customer-delete'),
]

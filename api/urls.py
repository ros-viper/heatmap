from django.urls import path
from api import views

urlpatterns = [
    path('sensors/', views.sensor_list)
]
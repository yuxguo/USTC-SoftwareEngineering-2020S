from django.urls import path, include
from django.conf.urls import url
from . import views
from rest_framework import routers

# router = routers.DefaultRouter()
# router.register('login', views.UserLoginView, basename='login')

urlpatterns = [
    url('login/', views.UserLoginView.as_view()),
    url('signup/', views.UserSignupView.as_view()),
    url('date/', views.UserDateView.as_view())  
]

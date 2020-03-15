from django.shortcuts import render
from .models import UserInfo
from rest_framework.views import APIView
from rest_framework.response import Response
import time

# Create your views here.
LOGIN_EXPIRE = 20

class UserLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        userobj = UserInfo.objects.filter(username=username, password=password).first()
        if not userobj:
            return Response({
                'code': 1,
                'msg': 'Username or Password Error',
            })
        else:
            userobj.token = str(time.time())
            userobj.save()
            return Response({
                'code': 0,
                'msg': 'Login Successfully',
                'token': userobj.token,
            })

class UserSignupView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        userobj = UserInfo.objects.filter(username=username).first()
        if not userobj:
            user_create_info = {
                'username': username,
                'password': password,
                'token': '0'
            }
            UserInfo.objects.create(**user_create_info)
            return Response({
                'code': 0,
                'msg': 'User Create Successfully',
            })
        else:
            return Response({
                'code': 1,
                'msg': 'User Already Exist',
            })

class UserDateView(APIView):
    def post(self, request):
        print("post!")
        date = request.data.get('date')
        token = request.data.get('token')
        userobj = UserInfo.objects.filter(token=token).first()
        if not userobj:
            return Response({
                'code': 1,
                'msg': 'Please Login',
            })
        else:
            if time.time() - float(token) > LOGIN_EXPIRE:
                return Response({
                    'code': 1,
                    'msg': 'Login Expired',
                })
            else :
                fest = None
                if date[5:] == '10-01':
                    fest = "国庆节"
                elif date[5:] == '01-01':
                    fest = "元旦"
                elif date[5:] == '12-25':
                    fest = "圣诞节"
                
                if fest is None:
                    return Response(None)
                else:
                    return Response({
                    'code': 0,
                    'fest': fest,
                })
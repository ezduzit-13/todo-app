from django.shortcuts import render
from django.shortcuts import render,redirect
import json
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from .models import AppUser,Post,Comment
from django.contrib.auth.models import Group, Permission, User
from django.contrib.auth.decorators import permission_required

def index(request):
    user = request.user
    print(user)
    if str(user) == 'AnonymousUser':
        return redirect('signin')
    else:
        return render(request,'index.html',{'a':user})


@csrf_exempt
def signup(request):
    app_user = AppUser.objects.all()
    print(request.session,'initial session')

    if request.method == 'GET':
        return render(request,'signup.html',{'user':app_user})
    elif request.method == 'POST':

        body = json.loads(request.body)

        AppUser.objects.create_user(username=body['email'],  email=body['email'], password=body['password'])

        user = authenticate(request, username = body['email'], password = body['password'])

        if user is not None:
            login(request, user)

    return JsonResponse({'success':True})

@csrf_exempt
def signin(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        print(body)

        user = authenticate(request, username = body['email'], password = body['password'])


        if user is not None:
            print('user exists')
            login(request,user)
        else:
            print('user does not exist')

    return render(request,'signin.html')

def signout(request):
    logout(request)
    return redirect('signin')
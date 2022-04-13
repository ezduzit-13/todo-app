from django.shortcuts import render
from django.shortcuts import render,redirect
import json
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from .models import AppUser,Task
from django.contrib.auth.models import Group, Permission, User
from django.contrib.auth.decorators import permission_required
from .serializers import TaskSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.viewsets import ModelViewSet

def index(request):
    user = request.user
    print(user,'<<<< user')
    if str(user) == 'AnonymousUser':
        return redirect('signin')
    else:
        thePage = open('react-frontend/build/index.html').read()
        return HttpResponse(thePage)

def home_page(request):
    return render(request,'home_page.html')
    

# region sign in
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
#endregion
    
        
#api views
class TaskViewSet(ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


@api_view(['GET'])
def get_userid(request):
    current_user = request.user.id

    return Response(current_user)

@api_view(['GET'])
def user_tasks(request,userID):

    tasks = Task.objects.filter(user_id = userID)
    serializer = TaskSerializer(instance = tasks, many = True)

    return Response(serializer.data)



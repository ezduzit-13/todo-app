from django.contrib import admin
from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter




router = DefaultRouter()
router.register(r'task', views.TaskViewSet, basename='task')



urlpatterns = [
    path('',views.signup,name = 'signup'),
    path('signin',views.signin,name = 'signin'),
    path('signout',views.signout,name = 'signout'),
    path('index',views.index,name = 'index'),
    path('current-user/',views.get_userid),
    # api urls
    path('',include(router.urls)),
    path('user-post/<int:userID>',views.user_tasks),

]



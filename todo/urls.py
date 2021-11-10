"""todo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
# from rest_framework.routers import SimpleRouter
from users.views import UserRetrieveAPIView, UserListAPIView
from projects.views import ProjectAPIView, TodoAPIView, ProjectFilterAPIView

# router = SimpleRouter()
# router.register('todo', TodoAPIView, basename='todo')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-usr/', include('rest_framework.urls')),
    #    path('api/', include(router.urls)),
    path('users/', UserListAPIView.as_view()),
    path('user/<int:pk>/', UserRetrieveAPIView.as_view()),
    path('project_create/', ProjectAPIView.as_view({'get': 'create'})),
    path('project_filter/<str:name>/', ProjectFilterAPIView.as_view()),
    path('project_update/<int:pk>/', ProjectAPIView.as_view({'get': 'update'})),
    path('project_delete/<int:pk>/', ProjectAPIView.as_view({'get': 'destroy'})),
    path('projects/', ProjectAPIView.as_view({'get': 'list'})),
    path('todo/', TodoAPIView.as_view({'get': 'list'})),
    path('todo_update/<int:pk>/', TodoAPIView.as_view({'get': 'update'})),
    path('todo_delete/<int:pk>/', TodoAPIView.as_view({'get': 'destroy'})),
    path('todo_crete/', TodoAPIView.as_view({'get': 'create'})),
]

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
from rest_framework.routers import DefaultRouter
from users.views import UserAPIView
from projects.views import ProjectAPIView, TodoAPIView

router = DefaultRouter()
router.register('users', UserAPIView, basename='users')
router.register('projects', ProjectAPIView, basename='projects')
router.register('todos', TodoAPIView, basename='todos')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-usr/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
]

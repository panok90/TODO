from rest_framework.viewsets import ModelViewSet

from .models import Project, Todo
from .serializers import ProjectModelSerializer, TodoModelSerializer


class ProjectAPIView(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    search_fields = ['name']  # поле заголовка точный поиск
    ordering_fields = ('id',)


class TodoAPIView(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer

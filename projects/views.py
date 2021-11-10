from rest_framework.generics import ListAPIView
from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet

from .models import Project, Todo
from .serializers import ProjectModelSerializer, TodoModelSerializer


class UserLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectAPIView(ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = UserLimitOffsetPagination


class ProjectFilterAPIView(ListAPIView):
    serializer_class = ProjectModelSerializer

    def get_queryset(self):
        name = self.kwargs['name']
        return Project.objects.filter(name__contains=name)


class TodoAPIView(ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    pagination_class = PageNumberPagination
    page_size = 20

    def destroy(self, request, *args, **kwargs):
        todo = Todo.objects.get(id=kwargs['pk'])
        todo.todo_is_active = False
        todo.save()
        return todo

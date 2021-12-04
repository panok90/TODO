from django.test import TestCase
import json
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from mixer.backend.django import mixer

from .models import User
from projects.models import Project, Todo
from .views import UserAPIView
from projects.views import ProjectAPIView, TodoAPIView


class TestAPIClient(TestCase):
    def setUp(self) -> None:
        pass

    def test_get_detail_user(self):
        user = User.objects.create(username='us', first_name='us', last_name='us', email='us@localhost')
        client = APIClient()
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_project(self):
        user = User.objects.create(username='us', first_name='us', last_name='us', email='us@localhost')
        project = Project.objects.create(name='project_test', link='https://github.com/panok90/TODO.git')
        client = APIClient()
        admin = User.objects.create_superuser('admin', 'admin@localhost', '12345_qwerty')
        client.login(username='admin', password='12345_qwerty')
        response = client.put(f'/api/projects/{project.id}/',
                              {'name': 'Django', 'link': 'https://github.com/panok90/Django.git'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
#        project = Project.objects.get(id=project.id)
#        self.assertEqual(project.name, 'Django')
#       self.assertEqual(project.link, 'https://github.com/panok90/Django.git')
        client.logout()

    def tearDown(self) -> None:
        pass


class TestAPIRequestFactory(TestCase):

    def test_get_list_users(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserAPIView.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {'username': 'user_1', 'first_name': 'user_1',
                                               'last_name': 'user_1', 'email': 'user_1@localhost'}, format='json')
        admin = User.objects.create_superuser('admin', 'admin@localhost', '12345qwerty')
        force_authenticate(request, admin)
        view = UserAPIView.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def tearDown(self) -> None:
        pass


class TestAPITestCase(APITestCase):
    def test_get_list(self):
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):

        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        project = mixer.blend(Project)
        todo = mixer.blend(Todo)
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'/api/todos/{todo.id}/', {'project': project, 'user': admin, 'text_todo': 'Text1'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = Todo.objects.get(id=todo.id)
        self.assertEqual(todo.text_todo, 'Text1')

    def tearDown(self) -> None:
        pass


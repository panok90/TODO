from users.models import User
from django.core.management.base import BaseCommand
from django.utils.crypto import get_random_string


class Command(BaseCommand):
    help = 'Создание случайного пользователя'

    def add_arguments(self, parser):
        parser.add_argument('-u', '--user', type=str, help='Имя пользователя')
        parser.add_argument('-p', '--password', type=str, help='Пароль')
        parser.add_argument('-e', '--email', type=str, help='Почта')

    def handle(self, *args, **kwargs):
        username = kwargs['user']
        password = kwargs['password']
        email = kwargs['email']
        User.objects.create_user(username=username, first_name=username, last_name=username, \
                                 email=email, password=password, is_staff=True)

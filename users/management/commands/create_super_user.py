from users.models import User
from django.core.management.base import BaseCommand
from django.utils.crypto import get_random_string


class Command(BaseCommand):
    help = 'Создание случайного пользователя'

    def add_arguments(self, parser):
        parser.add_argument('-u', type=str, help='Имя пользователя')
        parser.add_argument('-p', type=str, help='Пароль')
        parser.add_argument('-e', type=str, help='Почта')

    def handle(self, *args, **kwargs):
        username = kwargs['-u']
        password = kwargs['-p']
        email = kwargs['-e']
        User.objects.create_user(username=username, first_name=username, last_name=username, \
                                 email=email, password=password, is_staff=True)

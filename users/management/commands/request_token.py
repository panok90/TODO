from django.core.management.base import BaseCommand
import requests


class Command(BaseCommand):
    help = 'Создание token'

    def add_arguments(self, parser):
        parser.add_argument('-u', '--username', type=str, help='Имя пользователя')
        parser.add_argument('-p', '--password', type=str, help='Пароль')

    def handle(self, *args, **kwargs):

        username = kwargs['username']
        password = kwargs['password']
        response = requests.post('http://127.0.0.1:8000/api-token-auth/',
                                 data={'username': f'{username}', 'password': f'{password}'})

        print(response.status_code)
        print(response.json())

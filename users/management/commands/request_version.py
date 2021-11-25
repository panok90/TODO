from django.core.management.base import BaseCommand
import requests


class Command(BaseCommand):
    help = 'Проверка версий'

    #def add_arguments(self, parser):
        #parser.add_argument('-v', '--version', type=int, help='Версия')

    def handle(self, *args, **kwargs):
       # version = kwargs['version']

        response = requests.get('http://127.0.0.1:8000/api/users/', headers={
            'Accept': 'application/json; version=2.0'})
        print(response.json())

        response = requests.get(
            'http://127.0.0.1:8000/api/users/')
        print(response.json())


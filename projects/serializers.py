from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import HyperlinkedModelSerializer, StringRelatedField
from .models import Project, ToDo
from users.serializers import UserModelSerializer
from users.models import User


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class TodoModelSerializer(HyperlinkedModelSerializer):
    project = PrimaryKeyRelatedField(queryset=Project.objects.all())
    user = PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = ToDo
        fields = '__all__'

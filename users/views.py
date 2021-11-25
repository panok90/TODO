from rest_framework.viewsets import ModelViewSet

from .models import User
from .serializers import UserModelSerializer, UserModelSerializerBase


class UserAPIView(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserModelSerializerBase
        return UserModelSerializer

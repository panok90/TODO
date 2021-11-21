from rest_framework.viewsets import ModelViewSet

from .models import User
from .serializers import UserModelSerializer


class UserAPIView(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

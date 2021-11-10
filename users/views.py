from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView
from .models import User
from .serializers import UserModelSerializer


class UserListAPIView(ListAPIView):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = User.objects.all()
    serializer_class = UserModelSerializer


class UserRetrieveAPIView(RetrieveAPIView, UpdateAPIView):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

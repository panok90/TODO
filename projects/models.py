from django.db import models
from users.models import User


class Project(models.Model):
    name = models.CharField(max_length=64)
    link = models.URLField(blank=True)
    users = models.ManyToManyField(User, blank=True)


class ToDo(models.Model):
    project = models.OneToOneField(Project, name='project', on_delete=models.CASCADE, primary_key=True)
    text_todo = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    todo_is_active = models.BooleanField(default=True)

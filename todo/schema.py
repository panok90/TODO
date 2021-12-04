import graphene
from graphene_django import DjangoObjectType

from projects.models import Project, Todo
from users.models import User


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class Query(graphene.ObjectType):
    project_name = graphene.List(ProjectType, name=graphene.String(required=False))
    user_by_project_name = graphene.List(UserType)
    todo_by_project_name = graphene.List(TodoType, id=graphene.Int(required=True))

    def resolve_project_name(self, info, name=None):
        projects = Project.objects.all()
        if name:
            projects = Project.objects.filter(name=name)
        return projects

    def resolve_user_by_project_name(self, info):
        users = User.objects.all()
        return users

    def resolve_todo_by_project_name(self, info, id):
        todo = Todo.objects.filter(project=id)
        return todo


class TodoMutation(graphene.Mutation):
    class Arguments:
        todo_text = graphene.String(required=True)
        id = graphene.ID()

    todo = graphene.Field(TodoType)

    @classmethod
    def mutate(cls, root, info, todo_text, id):
        todo = Todo.objects.get(pk=id)
        todo.text_todo = todo_text
        todo.save()
        return TodoMutation(todo=todo)


class Mutation(graphene.ObjectType):
    update_todo = TodoMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)

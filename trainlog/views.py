from .models import Exercise
from .serializers import ExerciseSerializer
from rest_framework import permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from .custom_views import CustomerUserBaseViewSet
from rest_framework.authentication import TokenAuthentication


class ExerciseViewSet(CustomerUserBaseViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = [
        "muscle",
        "sub_muscles",
        "category",
    ]
    search_fields = ["name", "description"]
    ordering_fields = ["name", "last_modified", "created_at"]

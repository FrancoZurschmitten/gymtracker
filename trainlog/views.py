from django.shortcuts import render
from .models import Exercise
from django.shortcuts import get_object_or_404
from rest_framework import status
from .serializers import ExerciseSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import permissions
from django.db.models import Q
from django.contrib.auth.models import User
from rest_framework.decorators import action
from .hashid import HashidRouter
from django.http import Http404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters


class UserPermissionViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        return (
            super()
            .get_queryset()
            .filter(Q(user=self.request.user) | Q(user=User.objects.get(pk=1)))
        )

    def create(self, request, *args, **kwargs):
        request.data["user"] = request.user
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user != instance.user:
            return Response(
                {"error": "You do not have permissions to modify this exercise."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().update(request, *args, **kwargs)

    def partial_update(self, request, pk=None):
        instance = self.get_object()
        if request.user != instance.user:
            return Response(
                {"error": "You do not have permissions to modify this exercise."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().partial_update(request, pk=None)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user != instance.user:
            return Response(
                {"error": "You do not have permissions to delete this exercise."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().destroy(request, *args, **kwargs)


class ExerciseViewSet(UserPermissionViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        "muscle",
        "sub_muscles",
        "category",
    ]
    search_fields = ["name", "description"]
    ordering_fields = ["name", "last_modified", "created_at"]

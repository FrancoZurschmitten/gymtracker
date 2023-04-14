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


class ExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return (
            super()
            .get_queryset()
            .filter(Q(user=self.request.user) | Q(user=User.objects.get(pk=1)))
        )

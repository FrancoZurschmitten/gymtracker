from rest_framework import viewsets, filters, permissions, status
from rest_framework.response import Response
from .models import Exercise, ExerciseNote, SerieNote, default_user
from .serializers import (
    ExerciseSerializer,
    ExerciseNoteSerializer,
    SerieNoteSerializer,
    ExerciseReadOnlySerializer,
)
from django.db.models import ProtectedError


class ExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    ordering_fields = ["id", "name"]
    search_fields = ["name"]

    def get_queryset(self):
        queryset = super().get_queryset().filter(user=self.request.user)
        if self.action in ["create", "update", "destroy"]:
            return queryset.filter(public=False)
        return queryset

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, *args, **kwargs)
        except ProtectedError:
            return Response(
                {"detail": "You cannot delete this object because"},
                status.HTTP_400_BAD_REQUEST,
            )


class ExerciseNoteViewSet(viewsets.ModelViewSet):
    queryset = ExerciseNote.objects.all()
    serializer_class = ExerciseNoteSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["id", "exercise"]

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)


class SerieNoteViewSet(viewsets.ModelViewSet):
    queryset = SerieNote.objects.all()
    serializer_class = SerieNoteSerializer

    def get_queryset(self):
        return (
            super()
            .get_queryset()
            .filter(
                exercise_note__in=ExerciseNote.objects.filter(user=self.request.user).all()
            )
        )


class CommunityExerciseReadOnlyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Exercise.objects.all().filter(public=True)
    serializer_class = ExerciseReadOnlySerializer
    permission_classes = [permissions.AllowAny]


class DefaultExerciseReadOnlyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Exercise.objects.all().filter(user=default_user)
    serializer_class = ExerciseReadOnlySerializer

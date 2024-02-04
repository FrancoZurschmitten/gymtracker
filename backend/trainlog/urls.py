from .views import (
    ExerciseViewSet,
    ExerciseNoteViewSet,
    SerieNoteViewSet,
    DefaultExerciseReadOnlyViewSet,
    CommunityExerciseReadOnlyViewSet,
)
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(
    r"default-exercise", DefaultExerciseReadOnlyViewSet, basename="default-exercise"
)
router.register(r"exercise", ExerciseViewSet, basename="exercise")
router.register(r"exercise-note", ExerciseNoteViewSet, basename="exercise-note")
router.register(r"serie-note", SerieNoteViewSet, basename="serie-note")
router.register(
    r"default-exercise", DefaultExerciseReadOnlyViewSet, basename="default-exercise"
)
router.register(
    r"community-exercise",
    CommunityExerciseReadOnlyViewSet,
    basename="community-exercise",
)

urlpatterns = []
urlpatterns += router.urls

from .views import (
    ExerciseViewSet,
    ExerciseNoteViewSet,
    SerieNoteViewSet,
    DefaultExerciseReadOnlyViewSet,
    CommunityExerciseReadOnlyViewSet,
    ExerciseCurrentUserReadOnlyViewSet,
)
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r"exercises", ExerciseViewSet, basename="exercise")
router.register(r"my-exercises",
                ExerciseCurrentUserReadOnlyViewSet, basename="my-exercise")
router.register(
    r"community-exercises",
    CommunityExerciseReadOnlyViewSet,
    basename="community-exercise",
)
router.register(
    r"default-exercises", DefaultExerciseReadOnlyViewSet, basename="default-exercise"
)
router.register(r"exercise-notes", ExerciseNoteViewSet,
                basename="exercise-note")
router.register(r"serie-notes", SerieNoteViewSet, basename="serie-note")


urlpatterns = []
urlpatterns += router.urls

from django.contrib import admin
from . import models

admin.site.register(
    [
        models.MuscleGroup,
        models.SubMuscleGroup,
        models.ExerciseCategory,
        models.Exercise,
        models.Division,
        models.Routine,
        models.Note,
        models.ExerciseNote,
    ]
)

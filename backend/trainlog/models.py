from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth import get_user_model

UserModel = get_user_model()
default_user, _ = UserModel.objects.get_or_create(username="simon_petrikov")


class MuscleGroup(models.TextChoices):
    CHEST = "Chest"
    SHOULDERS = "Shoulders"
    TRICEPS = "Triceps"
    BACK = "Back"
    BICEPS = "Biceps"
    ARMS = "Arms"
    QUADRICEPS = "Quadriceps"
    HAMSTRINGS = "Hamstrings"
    HIP = "Hip"
    CALVES = "Calves"
    ABS = "Abs"


class Exercise(models.Model):
    user = models.ForeignKey(UserModel, null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(max_length=250, blank=True, null=True)
    muscle_group = models.CharField(
        max_length=100, choices=MuscleGroup.choices, blank=True, null=True
    )
    public = models.BooleanField(default=False)

    def __str__(self):
        if self.muscle_group:
            return f"{self.name} ({self.muscle_group})"
        return self.name


class ExerciseNote(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.PROTECT)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.exercise} {self.date}"


class SerieNote(models.Model):
    exercise_note = models.ForeignKey(ExerciseNote, on_delete=models.CASCADE)

    serie_number = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(
            10), ]
    )
    repetitions = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(30)]
    )
    weight_in_kg = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(500)]
    )
    rest_time_in_seconds = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(3600)],
        blank=True,
        null=True,
    )
    rir_value = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(10)], blank=True, null=True
    )
    observations = models.TextField(max_length=150, blank=True, null=True)

    class Meta:
        unique_together = ["exercise_note", "serie_number"]

    def __str__(self):
        return f"{self.exercise_note}: {self.serie_number}"

from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError


class NameInfo(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(max_length=500, blank=True)

    class Meta:
        abstract = True


class MuscleGroup(NameInfo):
    class Meta:
        db_table = "muscle_group"
        get_latest_by = "order_date"

    def __str__(self):
        return self.name


class SubMuscleGroup(NameInfo):
    muscle_group = models.ForeignKey(MuscleGroup, on_delete=models.CASCADE)

    class Meta:
        ordering = ["muscle_group"]

    def __str__(self):
        return "-".join([self.name, self.muscle_group.name])


class ExerciseCategory(NameInfo):
    def __str__(self):
        return self.name


class Exercise(NameInfo):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    muscle = models.ManyToManyField(SubMuscleGroup, blank=True)
    category = models.ForeignKey(
        ExerciseCategory,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="category",
    )
    created_at = models.DateTimeField(auto_now=True)

    def clean(self):
        super().clean()
        for sub_muscle in self.muscle.all():
            if sub_muscle.muscle_group != self.category.muscle_group:
                raise ValidationError(
                    f"SubMuscleGroup {sub_muscle.name} does not belong to the same MuscleGroup as the Exercise Category."
                )

    def __str__(self):
        return self.name


class Division(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=500, blank=True)
    exercises = models.ManyToManyField(Exercise, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Routine(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=500, blank=True)
    divisions = models.ManyToManyField(Division, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    routine = models.ForeignKey(Routine, on_delete=models.CASCADE)
    division = models.ForeignKey(
        Division, on_delete=models.CASCADE, blank=True, null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "|".join(
            [
                self.routine.name,
                str(self.created_at.date()),
            ]
        )


class ExerciseNote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    note = models.ForeignKey(Note, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    series = models.CharField(max_length=200, blank=True)
    reps = models.CharField(max_length=200, blank=True)
    weights = models.CharField(max_length=200, blank=True)
    rest = models.CharField(max_length=200, blank=True)
    annot = models.TextField(max_length=2000, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "|".join([self.exercise.name, str(self.created_at.date())])

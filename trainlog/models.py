from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError


class NameInfo(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(max_length=500, blank=True)

    class Meta:
        abstract = True


class CreateInfo(models.Model):
    last_modified = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True


class MuscleGroup(NameInfo, CreateInfo):
    class Meta:
        db_table = "muscle_groups"
        get_latest_by = "order_date"

    def __str__(self):
        return self.name


class SubMuscleGroup(NameInfo, CreateInfo):
    muscle_group = models.ForeignKey(MuscleGroup, on_delete=models.CASCADE)

    class Meta:
        db_table = "sub_muscle_groups"
        ordering = ["muscle_group"]

    def __str__(self):
        return "-".join([self.name, self.muscle_group.name])


class ExerciseCategory(NameInfo, CreateInfo):
    def __str__(self):
        return self.name


class Exercise(NameInfo, CreateInfo):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    muscle = models.ManyToManyField(SubMuscleGroup, blank=True)
    category = models.ForeignKey(
        ExerciseCategory,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="category",
    )

    class Meta:
        db_table = "exercises"

    def clean(self):
        super().clean()
        for sub_muscle in self.muscle.all():
            if sub_muscle.muscle_group != self.category.muscle_group:
                raise ValidationError(
                    f"""SubMuscleGroup {sub_muscle.name} does not belong 
                    to the same MuscleGroup as the Exercise Category."""
                )

    def __str__(self):
        return self.name


class Division(NameInfo, CreateInfo):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exercises = models.ManyToManyField(Exercise)

    class Meta:
        db_table = "divisions"

    def __str__(self):
        return self.name


class Routine(NameInfo, CreateInfo):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    divisions = models.ManyToManyField(Division)

    class Meta:
        db_table = "routines"

    def __str__(self):
        return self.name


class Note(CreateInfo):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    routine = models.ForeignKey(Routine, on_delete=models.CASCADE, blank=True)
    division = models.ForeignKey(Division, on_delete=models.CASCADE)

    class Meta:
        db_table = "notes"

    @property
    def exercise_notes(self):
        return ExerciseNote.objects.filter(note=self)

    def __str__(self):
        return "|".join(
            [
                self.division.name,
                str(self.created_at.date()),
            ]
        )


class ExerciseNote(CreateInfo):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    note = models.ForeignKey(Note, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    series = models.CharField(max_length=50, blank=True)
    reps = models.CharField(max_length=50, blank=True)
    weights = models.CharField(max_length=50, blank=True)
    rest = models.CharField(max_length=50, blank=True)
    annot = models.TextField(max_length=500, blank=True)

    class Meta:
        db_table = "exercise_notes"

    def clean(self) -> None:
        super().clean()
        if not self.exercise in self.note.division.exercises.all():
            raise ValidationError(
                f"""The exercise {self.exercise.name} does not belong to 
                the note {self.note.__str__()}."""
            )
        elif self.user != self.note.user:
            raise ValidationError(f"""The user does not belong to the user in note.""")
        for exercise_note in self.note.exercise_notes.all():
            if self.exercise == exercise_note.exercise:
                raise ValidationError(f""""This exercise note already exists.""")

    def __str__(self):
        return "|".join([self.exercise.name, str(self.created_at.date())])

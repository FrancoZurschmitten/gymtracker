from django.contrib import admin
from .models import Exercise, ExerciseNote, SerieNote

admin.site.register([Exercise, ExerciseNote, SerieNote])

from rest_framework import serializers
from .models import Exercise, ExerciseNote, SerieNote


class ExerciseNotePrimaryKeyRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        return ExerciseNote.objects.all().filter(user=self.context["request"].user)


class ExerciseSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Exercise
        fields = "__all__"


class ExerciseReadOnlySerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(
        source="user.username", read_only=True)

    class Meta:
        model = Exercise
        fields = "__all__"


class SerieNoteReadOnlyForExerciseNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = SerieNote
        exclude = ["exercise_note"]


class ExerciseNoteReadOnlySerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    exercise = ExerciseReadOnlySerializer(read_only=True)
    serie_notes = serializers.SerializerMethodField()

    class Meta:
        model = ExerciseNote
        fields = "__all__"
        read_only_fields = ["date"]

    def get_serie_notes(self, obj):
        serie_notes = SerieNote.objects.all().filter(
            exercise_note=ExerciseNote.objects.get(pk=obj.pk))
        serie_notes_serializer = SerieNoteReadOnlyForExerciseNoteSerializer(
            serie_notes, many=True)
        return serie_notes_serializer.data


class ExerciseNoteSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = ExerciseNote
        fields = "__all__"
        read_only_fields = ["date"]


class SerieNoteSerializer(serializers.ModelSerializer):
    exercise_note = ExerciseNotePrimaryKeyRelatedField()

    class Meta:
        model = SerieNote
        fields = "__all__"

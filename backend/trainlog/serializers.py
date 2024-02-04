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


class ExerciseReadOnlySerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(source="user.username", read_only=True)

    class Meta:
        model = Exercise
        fields = "__all__"

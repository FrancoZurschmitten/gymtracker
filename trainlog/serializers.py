from rest_framework import serializers
from .models import Exercise


class ExerciseSerializer(serializers.HyperlinkedModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    last_modified = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = Exercise
        fields = [
            "url",
            "name",
            "description",
            "muscle",
            "sub_muscles",
            "category",
            "last_modified",
            "created_at",
        ]

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)

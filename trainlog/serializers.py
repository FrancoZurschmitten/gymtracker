from rest_framework import serializers
from .models import Exercise


class ExerciseSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    last_modified = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = Exercise
        fields = [
            "name",
            "description",
            "muscle",
            "sub_muscles",
            "category",
            "last_modified",
            "created_at",
        ]

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["user"] = user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        user = self.context["request"].user
        validated_data["user"] = user
        return super().update(instance, validated_data)

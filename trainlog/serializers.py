from rest_framework import serializers
from .models import Exercise
from django.urls import reverse
from .hashid import HashidRouter
from rest_framework.response import Response
from rest_framework import status



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
    
    
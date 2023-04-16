from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from django.db.models import Q
from django.contrib.auth.models import User


class CustomerUserBaseViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        return (
            super()
            .get_queryset()
            .filter(Q(user=self.request.user) | Q(user=User.objects.get(pk=1)))
        )

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user != instance.user:
            return Response(
                {f"error": "You do not have permissions to modify this."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().update(request, *args, **kwargs)

    def partial_update(self, request, pk=None):
        instance = self.get_object()
        if request.user != instance.user:
            return Response(
                {"error": "You do not have permissions to partial modify this."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().partial_update(request, pk=None)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user != instance.user:
            return Response(
                {"error": "You do not have permissions to delete this."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().destroy(request, *args, **kwargs)

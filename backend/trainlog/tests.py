from rest_framework.test import APITestCase
from rest_framework import status
from .models import Exercise, ExerciseNote, SerieNote, UserModel
from django.urls import reverse


class ExerciseViewSetTests(APITestCase):
    def setUp(self):
        self.model = Exercise
        self.queryset = Exercise.objects.all()
        self.user = UserModel.objects.create(
            username="testuser", password="testpassword"
        )
        self.client.force_authenticate(user=self.user)

    def test_create_exercise_by_current_user(self):
        url = reverse("exercise-list")
        data = {"name": "testexercise"}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        json = response.json()
        exercise_created = self.queryset.get(id=json["id"])
        self.assertEqual(self.user, exercise_created.user)

    def test_delete_exercise_protected(self):
        exercise = self.queryset.create(user=self.user, name="testexercise")
        ExerciseNote.objects.create(user=self.user, exercise=exercise)
        url = reverse("exercise-detail", kwargs={"pk": exercise.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_exercise_with_public_in_true(self):
        exercise = Exercise.objects.create(
            user=self.user, name="testexercise", public=True
        )
        url = reverse("exercise-detail", kwargs={"pk": exercise.pk})
        response = self.client.put(url, {"name": "changetestexercise"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class ExerciseNoteViewSetTests(APITestCase):
    def setUp(self):
        self.model = ExerciseNote
        self.queryset = ExerciseNote.objects.all()
        self.user = UserModel.objects.create(
            username="testuser", password="testpassword"
        )
        self.client.force_authenticate(user=self.user)

    def test_create_exercise_note_with_exercise_by_other_user(self):
        user2 = UserModel.objects.create(username="testuser2", password="testpassword")
        exercise = Exercise.objects.create(user=user2, name="testexercise")

        url = reverse("exercise-note-list")
        data = {"exercise": exercise.pk}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        json = response.json()
        self.assertEqual(ExerciseNote.objects.get(pk=json["id"]).user, self.user)


class SerieNoteViewSetTests(APITestCase):
    def setUp(self):
        self.model = SerieNote
        self.queryset = SerieNote.objects.all()
        self.user = UserModel.objects.create(
            username="testuser", password="testpassword"
        )
        self.client.force_authenticate(user=self.user)
        self.serie_note_data = {
            "exercise_note": None,
            "serie_number": 1,
            "repetitions": 10,
            "weight_in_kg": 50,
            "rest_time_in_seconds": None,
            "rir_value": None,
            "observations": "",
        }

    def test_create_serie_note_with_exercise_note_by_other_user(self):
        user2 = UserModel.objects.create(username="testuser2", password="testpassword")
        exercise = Exercise.objects.create(user=user2, name="testexercise")
        exercise_note = ExerciseNote.objects.create(user=user2, exercise=exercise)

        url = reverse("serie-note-list")
        data = self.serie_note_data
        data["exercise_note"] = exercise_note.pk

        response = self.client.post(url, data, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
            f"The {self.model._meta.model_name.upper()} should only accept {ExerciseNote._meta.model_name.upper()} made by the current user",
        )

    def test_create_serie_note_with_exercise_note_by_current_user(self):
        exercise = Exercise.objects.create(user=self.user, name="testexercise")
        exercise_note = ExerciseNote.objects.create(user=self.user, exercise=exercise)

        url = reverse("serie-note-list")
        data = self.serie_note_data
        data["exercise_note"] = exercise_note.pk

        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        json = response.json()
        self.assertEqual(
            SerieNote.objects.get(id=json["id"]).exercise_note.user, self.user
        )


class CommunityExerciseReadOnlyViewSetTests(APITestCase):
    def setUp(self):
        self.model = Exercise
        self.queryset = Exercise.objects.all()
        self.user = UserModel.objects.create(
            username="testuser", password="testpassword"
        )

    def test_exercise_public_in_list(self):
        Exercise.objects.create(user=self.user, name="testexercise1")
        exercise2 = Exercise.objects.create(
            user=self.user, name="testexercise2", public=True
        )

        url = reverse("community-exercise-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        json = response.json()
        self.assertEqual(len(json["results"]), 1)
        self.assertEqual(exercise2.pk, json["results"][0]["id"])


class DefaultExerciseReadOnlyViewSetTests(APITestCase):
    pass

# Generated by Django 4.2.8 on 2024-02-13 23:22

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("trainlog", "0005_exercise_public_alter_exercise_muscle_group"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="serienote",
            unique_together={("exercise_note", "serie_number")},
        ),
    ]

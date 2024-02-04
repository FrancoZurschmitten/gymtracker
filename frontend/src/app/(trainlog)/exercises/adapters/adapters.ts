import { Exercise, ExerciseFormData } from "../services/types";
import { AdaptedExercise, AdaptedExerciseFormData } from "./types";

export function createAdaptedExercise(data: Exercise): AdaptedExercise {
  const formattedData: AdaptedExercise = {
    id: data.id,
    name: data.name,
    description: data.description,
    muscleGroup: data.muscle_group,
    isPublic: data.public,
  };
  return formattedData;
}

export function reverseAdaptedExercise(data: AdaptedExercise): Exercise {
  const formattedData: Exercise = {
    id: data.id,
    name: data.name,
    description: data.description,
    muscle_group: data.muscleGroup,
    public: data.isPublic,
  };
  return formattedData;
}

export function reverseAdaptedExerciseFormData(
  data: AdaptedExerciseFormData
): ExerciseFormData {
  const formattedData: ExerciseFormData = {
    name: data.name,
    description: data.description,
    muscle_group: data.muscleGroup,
    public: data.isPublic,
  };
  return formattedData;
}

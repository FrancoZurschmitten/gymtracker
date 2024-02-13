import { ListResponse } from "@/services/types";

export type AdaptedExercise = {
  id: number;
  name: string;
  description: string;
  muscleGroup: string | null;
  isPublic: boolean;
};

export type AdaptedExerciseListResponse = ListResponse & {
  results: AdaptedExercise[];
};

export interface AdaptedExerciseFormData extends Omit<AdaptedExercise, "id"> {}

export interface AdaptedExerciseFormDataError {
  non_field_errors?: string[];
  name?: string[];
  description?: string[];
  muscleGroup?: string[];
  isPublic?: string[];
}

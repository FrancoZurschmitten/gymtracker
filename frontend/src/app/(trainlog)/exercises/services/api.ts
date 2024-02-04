import { API } from "@/services/utils";
import { Exercise, ExerciseFormData, ExerciseList } from "./types";

const endpoint = "trainlog/exercise/";

export async function getExercises(filters?: string): Promise<ExerciseList> {
  return await API.get(endpoint + (filters ? filters : "")).then(
    (res) => res.data
  );
}

export async function getExecrise(id: string | number): Promise<Exercise> {
  return await API.get(endpoint + `${id}/`).then((res) => res.data);
}

export async function createExercise(data: ExerciseFormData) {
  return await API.post(endpoint, data).then((res) => res.data);
}

export async function updateExecrise(
  id: string | number,
  data: ExerciseFormData
) {
  return await API.put(endpoint + `${id}/`, data).then((res) => res.data);
}

export async function deleteExercise(id: string | number) {
  return await API.delete(endpoint + `${id}`);
}

import { ListResponse } from "@/services/types";

export type Exercise = {
  id: number;
  name: string;
  description: string;
  muscle_group: string | null;
  public: boolean;
};

export type ExerciseList = Omit<ListResponse, "resutls"> & {
  results: Exercise[];
};

export interface ExerciseFormData extends Omit<Exercise, "id"> {}

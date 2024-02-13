import { AdaptedExercise } from "../../exercises/adapters/types";

export type AdaptedSerieNote = {
  id: number;
  serieNumber: number;
  repetitions: number;
  weightInKg: number;
  restTimeInSeconds: null | number;
  rirValue: null | number;
  observations: null | string;
};

export type AdaptedNote = {
  id: number;
  exercise: AdaptedExercise;
  serieNotes: AdaptedSerieNote[];
  date: string;
};

export type AdaptedSerieNoteFormData = Omit<AdaptedSerieNote, "id"> & {
  exerciseNote: number;
};
export type AdatpedNoteFormData = {
  exercise: number;
};

import { ListResponse } from "@/services/types";
import { Exercise } from "../../exercises/services/types";

export type SerieNote = {
  id: number;
  serie_number: number;
  repetitions: number;
  weight_in_kg: number;
  rest_time_in_seconds: null | number;
  rir_value: null | number;
  observations: null | string;
};

export type Note = {
  id: number;
  exercise: Exercise;
  serie_notes: SerieNote[];
  date: string;
};

export type NoteFormData = {
  exercise: number;
}

export type NoteList = Omit<ListResponse, "results"> & {
  results: Note[];
};

export type SerieNoteFormData = Omit<SerieNote, "id"> & {
  exercise_note: number;
};

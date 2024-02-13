"use client";
import { createAdaptedExercise } from "../../exercises/adapters";
import { Note, SerieNote, SerieNoteFormData } from "../services/types";
import {
  AdaptedNote,
  AdaptedSerieNote,
  AdaptedSerieNoteFormData,
} from "./types";

export function createAdaptedSerieNote(data: SerieNote): AdaptedSerieNote {
  const formattedData: AdaptedSerieNote = {
    id: data.id,
    repetitions: data.repetitions,
    restTimeInSeconds: data.rest_time_in_seconds,
    weightInKg: data.weight_in_kg,
    rirValue: data.rir_value,
    serieNumber: data.serie_number,
    observations: data.observations,
  };
  return formattedData;
}

export function createAdaptedNote(data: Note): AdaptedNote {
  const formattedData: AdaptedNote = {
    id: data.id,
    date: data.date,
    exercise: createAdaptedExercise(data.exercise),
    serieNotes: data.serie_notes.map((item) => createAdaptedSerieNote(item)),
  };
  return formattedData;
}

export function reverseAdatedSerieNoteFormData(
  data: AdaptedSerieNoteFormData
): SerieNoteFormData {
  const formattedData: SerieNoteFormData = {
    exercise_note: data.exerciseNote,
    serie_number: data.serieNumber,
    repetitions: data.repetitions,
    weight_in_kg: data.weightInKg,
    rir_value: data.rirValue,
    rest_time_in_seconds: data.restTimeInSeconds,
    observations: data.observations,
  };
  return formattedData;
}

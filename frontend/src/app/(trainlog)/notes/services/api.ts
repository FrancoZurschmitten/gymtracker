import { API } from "@/services";
import { Note, NoteFormData, NoteList, SerieNoteFormData } from "./types";

const serieNoteEndpoint = "trainlog/serie-notes/";
const noteEndpoint = "trainlog/exercise-notes/";

export async function getNotes(filters?: string): Promise<NoteList> {
  return await API.get(noteEndpoint + (filters ? filters : "")).then(
    (res) => res.data
  );
}

export async function getNote(id: number | string): Promise<Note> {
  return await API.get(noteEndpoint + `${id}/`).then((res) => res.data);
}

export async function createExerciseNote(data: NoteFormData) {
  return API.post(noteEndpoint, data).then((res) => res.data);
}

export async function createSerieNote(data: SerieNoteFormData) {
  return API.post(serieNoteEndpoint, data).then((res) => res.data);
}

export async function updateSerieNote(
  id: number | string,
  data: SerieNoteFormData
) {
  return API.put(serieNoteEndpoint + `${id}/`, data).then((res) => res.data);
}

export async function deleteSerieNote(id: number | string) {
  return API.delete(serieNoteEndpoint + `${id}/`);
}

export async function deleteNote(id: number | string) {
  return API.delete(noteEndpoint + `${id}/`);
}

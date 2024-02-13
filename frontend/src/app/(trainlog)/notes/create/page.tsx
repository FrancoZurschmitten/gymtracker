"use client";
import { useRouter } from "next/navigation";
import ExerciseNoteForm from "../components/ui/exercise-note-form";

export default function NotesCreatePage() {
  const router = useRouter();

  const callback = (id: number) => router.push(`/notes/${id}/update`);

  return <ExerciseNoteForm callback={callback} />;
}

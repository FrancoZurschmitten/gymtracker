"use client";

import NotFound from "@/app/not-found";
import { useFetchExercise } from "../hooks/use-fetch-exercise";
import { Spinner } from "@nextui-org/react";
import { ExerciseView } from "../components/ui/exercise-view";

export default function ExercisePage({ params }: { params: { id: number } }) {
  const { fetchData, fetchError } = useFetchExercise(params.id);

  if (fetchError) return <NotFound />;

  if (!fetchData) return <Spinner />;

  return <ExerciseView itemView={fetchData} />;
}

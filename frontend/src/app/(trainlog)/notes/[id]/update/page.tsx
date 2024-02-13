"use client";
import NotFound from "@/app/not-found";
import { useFetchNote } from "../../hooks/use-fetch-note";
import { Divider, Spacer, Spinner } from "@nextui-org/react";
import SerieNoteMultiForm from "../../components/ui/serie-notes/serie-note-multi-form";
import { title } from "@/components/ui/primitives";

export default function NoteUpdatePage({ params }: { params: { id: number } }) {
  const { fetchData, fetchError } = useFetchNote(params.id);

  if (fetchError) return <NotFound />;

  if (!fetchData) return <Spinner />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <h2 className={title({ size: "sm" })}>{fetchData.exercise.name}</h2>
        <span className="text-default-500">{fetchData.date}</span>
      </div>
      <Divider />
      <Spacer y={4} />
      <h3 className={title({ size: "xs" })}>Series:</h3>
      <SerieNoteMultiForm note={fetchData} />
    </div>
  );
}

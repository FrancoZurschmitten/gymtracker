"use client";

import { useCallback, useState } from "react";
import SerieNoteForm from "./serie-note-form";
import { AdaptedNote } from "../../../adapters/types";
import AddSerieNoteCard from "./add-serie-note-card";

export default function SerieNoteMultiForm({ note }: { note: AdaptedNote }) {
  const [numberOfSeries, setNumberOfSeries] = useState(
    note.serieNotes.map((s) => s.serieNumber)
  );

  const addSerie = () =>
    setNumberOfSeries((prev) => [
      ...prev,
      prev.length > 0 ? prev[prev.length - 1] + 1 : 1,
    ]);

  const removeSerie = (serieNumberToDelete: number) =>
    setNumberOfSeries((prev) =>
      prev.filter((serieNumber) => serieNumber !== serieNumberToDelete)
    );

  const renderSerieNotes = useCallback(() => {
    return numberOfSeries.map((n) => {
      var serieNote = note.serieNotes.find((note) => note.serieNumber === n);
      return (
        <SerieNoteForm
          key={n}
          itemToEdit={serieNote}
          serieNumber={serieNote ? serieNote.serieNumber : n}
          noteId={note.id}
          destroyCallback={() => removeSerie(n)}
          formId={"serieNoteForm" + n}
        />
      );
    });
  }, [numberOfSeries, note]);

  return (
    <div className="grid grid-cols-4 gap-4">
      {renderSerieNotes()}
      <AddSerieNoteCard onPress={addSerie} />
    </div>
  );
}

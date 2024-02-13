import { AdaptedSerieNote } from "../../../adapters/types";

export default function SerieNoteView({
  itemView,
}: {
  itemView: AdaptedSerieNote;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p>Repeticiones: {itemView.repetitions}</p>
      <p>Peso: {itemView.weightInKg}kg</p>
      {itemView.restTimeInSeconds ? (
        <p>Descanso: {itemView.restTimeInSeconds}s</p>
      ) : null}
      {itemView.rirValue ? <p>Rir: {itemView.rirValue}</p> : null}
      {itemView.observations ? (
        <p>Observaciones: {itemView.observations}</p>
      ) : null}
    </div>
  );
}

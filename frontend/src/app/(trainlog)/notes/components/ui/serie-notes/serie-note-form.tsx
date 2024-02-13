"use client";
import { Xicon } from "@/components/ui/icons";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Input,
  Textarea,
} from "@nextui-org/react";
import { FormEvent, useCallback, useRef, useState } from "react";
import { reverseAdatedSerieNoteFormData } from "../../../adapters";
import { noteAPI } from "../../../services";
import ErrorView from "@/components/ui/error-view";
import { AdaptedSerieNote } from "../../../adapters/types";
import { mutate } from "swr";

interface SerieNoteFormError {
  non_field_errors?: string[];
  serie_number?: string[];
  repetitions?: string[];
  weight_in_kg?: string[];
  rest_time_in_seconds?: string[];
  rir_value?: string[];
  observations?: string[];
}

export default function SerieNoteForm({
  isReadOnly = false,
  serieNumber = 1,
  noteId,
  itemToEdit,
  destroyCallback = () => undefined,
  formId = "serieNoteForm",
}: {
  isReadOnly?: boolean;
  serieNumber?: number;
  noteId: number;
  itemToEdit?: AdaptedSerieNote;
  destroyCallback?: () => void;
  formId?: string;
}) {
  const [repetitions, setReps] = useState(itemToEdit?.repetitions ?? 0);
  const [weightInKg, setWeight] = useState(itemToEdit?.weightInKg ?? 0);
  const [rirValue, setRir] = useState<number | null>(
    itemToEdit?.rirValue ?? null
  );
  const [restTimeInSeconds, setRest] = useState<number | null>(
    itemToEdit?.restTimeInSeconds ?? null
  );
  const [observations, setObs] = useState<string>(
    itemToEdit?.observations ?? ""
  );
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<SerieNoteFormError>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;
    setLoading(true);

    const body = reverseAdatedSerieNoteFormData({
      exerciseNote: noteId,
      serieNumber,
      repetitions,
      weightInKg,
      restTimeInSeconds,
      rirValue,
      observations,
    });

    try {
      if (itemToEdit) {
        await noteAPI.updateSerieNote(itemToEdit.id, body);
      } else {
        await noteAPI.createSerieNote(body);
      }
      setError(undefined);
    } catch (error: any) {
      console.log(error.response.data);
      setError(error.response.data as SerieNoteFormError);
    } finally {
      mutate("note" + noteId).then(() => setLoading(false));
    }
  };

  const handleDeleteItem = useCallback(() => {
    if (itemToEdit) {
      setLoading(true);
      noteAPI
        .deleteSerieNote(itemToEdit.id)
        .then(() => mutate("note" + noteId))
        .then(() => setLoading(false));
    }
    destroyCallback();
  }, [setLoading, destroyCallback, itemToEdit, noteId]);

  return (
    <Card fullWidth>
      <CardHeader className="flex justify-between">
        <Chip color={itemToEdit ? "primary" : "default"} size="sm">
          {serieNumber}
        </Chip>
        <button
          className="bg-transparent text-default-400 rounded-full p-2 hover:bg-default-100"
          aria-label="Close"
          type="button"
          onClick={handleDeleteItem}
        >
          <Xicon />
        </button>
      </CardHeader>
      <CardBody>
        <form id={formId} onSubmit={handleSubmit} className="space-y-3">
          <ErrorView message={error?.non_field_errors} />
          <Input
            required
            isRequired
            value={repetitions.toString()}
            onValueChange={(value) => setReps(Number(value))}
            name="repetitions"
            placeholder="10"
            label="Repetitions"
            type="number"
            errorMessage={
              error?.repetitions ? error.repetitions.join("\n") : undefined
            }
            isReadOnly={isReadOnly}
          />

          <Input
            required
            isRequired
            value={weightInKg.toString()}
            onValueChange={(value) => setWeight(Number(value))}
            name="weight"
            placeholder="50"
            label="Peso en kg"
            type="number"
            errorMessage={
              error?.weight_in_kg ? error.weight_in_kg.join("\n") : undefined
            }
            isReadOnly={isReadOnly}
          />

          <Input
            value={rirValue?.toString()}
            onValueChange={(value) => setRir(Number(value))}
            name="rir"
            placeholder="2"
            label="Rir"
            type="number"
            errorMessage={
              error?.rir_value ? error.rir_value.join("\n") : undefined
            }
            isReadOnly={isReadOnly}
          />

          <Input
            value={restTimeInSeconds?.toString()}
            onValueChange={(value) => setRest(Number(value))}
            name="rest"
            placeholder="120"
            label="Descanso en segundos"
            type="number"
            errorMessage={
              error?.rest_time_in_seconds
                ? error.rest_time_in_seconds.join("\n")
                : undefined
            }
            isReadOnly={isReadOnly}
          />

          <Textarea
            value={observations}
            onValueChange={setObs}
            name="obs"
            placeholder="max 100 characters"
            label="Observaciones"
            maxRows={2}
            errorMessage={
              error?.observations ? error.observations.join("\n") : undefined
            }
            isReadOnly={isReadOnly}
          />
        </form>
      </CardBody>
      <CardFooter>
        <Button
          isLoading={isLoading}
          form={formId}
          color="success"
          type="submit"
          fullWidth
        >
          {itemToEdit ? "Guardar cambios" : "Crear serie"}
        </Button>
      </CardFooter>
    </Card>
  );
}

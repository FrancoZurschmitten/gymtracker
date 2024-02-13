import ExerciseTable from "@/app/(trainlog)/exercises/components/ui/exercise-table";
import { FormEvent, useRef, useState } from "react";
import { noteAPI } from "../../services";
import { Button } from "@nextui-org/react";
import { mutate } from "swr";
import { title } from "@/components/ui/primitives";

export default function ExerciseNoteForm({
  callback = () => undefined,
  formId = "exerciseNoteForm",
}: {
  callback?: (id: number) => void;
  formId?: string;
}) {
  const [exercise, setExercise] = useState<number>();
  const inProgress = useRef(false);
  const [error, setError] = useState<any>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inProgress.current) return;
    inProgress.current = true;

    if (!exercise) {
      setError({ exercise: ["El ejercicio no puede ser nulo."] });
      return;
    }

    try {
      const data = await noteAPI.createExerciseNote({ exercise });
      callback(data.id);
    } catch (error: any) {
      console.log(error);
      setError(error.response.data);
    } finally {
      inProgress.current = false;
      mutate("notes");
    }
  };

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4">
      <h2 className={title({ size: "sm" })}>Seleccionar un ejercicio: </h2>
      <ExerciseTable
        selectionMode="single"
        selectedKeys={new Set(exercise ? [String(exercise)] : [])}
        setSelectedKeys={(key) => setExercise(Number(Array.from(key)[0]))}
      />
      <div className="flex justify-end">
        <Button
          color="primary"
          isDisabled={Boolean(!exercise)}
          form={formId}
          type="submit"
        >
          Continuar
        </Button>
      </div>
    </form>
  );
}

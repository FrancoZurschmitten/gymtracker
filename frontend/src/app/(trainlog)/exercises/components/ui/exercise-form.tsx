"use client";

import { FormEvent, useRef, useState } from "react";
import {
  Checkbox,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { exerciseAPI } from "../../services";
import { reverseAdaptedExerciseFormData } from "../../adapters";
import {
  AdaptedExercise,
  AdaptedExerciseFormData,
  AdaptedExerciseFormDataError,
} from "../../adapters/types";
import { muscleGroups } from "@/config/constants";

export default function ExerciseForm({
  initialValues = {
    name: "",
    description: "",
    muscleGroup: null,
    isPublic: false,
  },
  itemToEdit,
  callback = () => undefined,
}: {
  initialValues?: AdaptedExerciseFormData;
  itemToEdit?: AdaptedExercise;
  callback?: () => void;
}) {
  const [name, setName] = useState<string>(itemToEdit ? itemToEdit.name : "");
  const [description, setDescription] = useState<string>(
    itemToEdit ? itemToEdit.description : ""
  );
  const [muscleGroup, setMuscleGroup] = useState<string | null>(
    itemToEdit ? itemToEdit.muscleGroup : null
  );
  const [isPublic, setPublic] = useState<boolean>(
    itemToEdit ? itemToEdit.isPublic : initialValues.isPublic
  );
  const inProgress = useRef(false);
  const [error, setError] = useState<AdaptedExerciseFormDataError>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inProgress.current) return;
    inProgress.current = true;

    const body = reverseAdaptedExerciseFormData({
      name,
      description,
      muscleGroup,
      isPublic,
    });

    try {
      if (itemToEdit) {
        await exerciseAPI.updateExecrise(itemToEdit.id, body);
      } else {
        await exerciseAPI.createExercise(body);
      }
      callback();
    } catch (error: any) {
      setError(error?.response?.data);
    } finally {
      inProgress.current = false;
    }
  };

  return (
    <form id="exerciseForm" onSubmit={handleSubmit} className="space-y-4">
      {error?.non_field_errors ? (
        <p className="text-danger">{error.non_field_errors}</p>
      ) : null}
      <Input
        label="Nombre"
        isRequired
        value={name}
        onValueChange={setName}
        errorMessage={error?.name?.join("\n")}
      />
      <Textarea
        label="Descripción"
        value={description}
        onValueChange={setDescription}
        errorMessage={error?.description?.join("\n")}
      />
      <Select
        label="Selecciona el grupo muscular"
        selectedKeys={muscleGroup ? [muscleGroup] : []}
        onChange={(e) => setMuscleGroup(e.target.value)}
        errorMessage={error?.muscleGroup?.join("\n")}
      >
        {muscleGroups.map(({ key, label }) => (
          <SelectItem key={key}>{label}</SelectItem>
        ))}
      </Select>
      <Checkbox isSelected={isPublic} onValueChange={setPublic}>
        ¿Quieres que sea público?
        <p className="text-warning text-small">
          Una vez que es publico no podras editarlo ni borrarlo
        </p>
      </Checkbox>
    </form>
  );
}

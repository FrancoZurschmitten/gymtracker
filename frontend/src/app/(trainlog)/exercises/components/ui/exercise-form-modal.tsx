import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import ExerciseForm from "./exercise-form";
import { AdaptedExercise } from "../../adapters/types";

export default function ExerciseFormModal({
  itemToEdit,
  isOpen,
  onOpenChange,
  callback = () => undefined,
}: {
  itemToEdit?: AdaptedExercise;
  isOpen?: boolean;
  onOpenChange?: () => void;
  callback?: () => void;
}) {
  return (
    <Modal isOpen={isOpen || Boolean(itemToEdit)} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => {
          return (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {itemToEdit
                  ? "Cambiar " + itemToEdit.name
                  : "Crear un nuevo ejercicio"}
              </ModalHeader>
              <ModalBody>
                <ExerciseForm
                  itemToEdit={itemToEdit}
                  callback={() => {
                    callback();
                    onClose();
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button form="exerciseForm" type="submit" color="success">
                  {itemToEdit ? "Guardar cambios" : "Guardar"}
                </Button>
              </ModalFooter>
            </>
          );
        }}
      </ModalContent>
    </Modal>
  );
}

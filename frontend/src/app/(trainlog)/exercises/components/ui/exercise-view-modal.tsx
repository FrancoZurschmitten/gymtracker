import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { AdaptedExercise } from "../../adapters/types";
import NextLink from "next/link";

export default function ExerciseViewModal({
  itemView,
  onOpenChange,
}: {
  itemView?: AdaptedExercise;
  onOpenChange?: () => void;
}) {
  return (
    <Modal isOpen={Boolean(itemView)} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => {
          if (!itemView) return null;
          return (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {itemView.name}
              </ModalHeader>
              <ModalBody>
                {itemView.description ? (
                  <p className="text-default-500">{itemView.description}</p>
                ) : null}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  variant="flat"
                  as={NextLink}
                  href={`/exercises/${itemView.id}`}
                >
                  Ver en detalle
                </Button>
              </ModalFooter>
            </>
          );
        }}
      </ModalContent>
    </Modal>
  );
}

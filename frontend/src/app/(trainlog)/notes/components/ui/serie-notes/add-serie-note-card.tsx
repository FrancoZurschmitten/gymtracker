"use client";
import { PlusIcon } from "@/components/ui/icons";
import { Card } from "@nextui-org/react";

export default function AddSerieNoteCard({
  onPress,
}: {
  onPress?: () => void;
}) {
  return (
    <Card
      className="min-w-[18.5rem] min-h-[31rem]"
      isHoverable
      isPressable
      onPress={onPress}
    >
      <PlusIcon
        size={40}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-default-500"
      />
    </Card>
  );
}

"use client";
import { Button } from "@nextui-org/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { PlusIcon } from "./icons";

export default function PlusButton({
  isLink = false,
  onPress,
}: {
  isLink?: boolean;
  onPress?: () => void;
}) {
  const pathname = usePathname();
  return (
    <Button
      as={isLink ? NextLink : "button"}
      href={isLink ? pathname + "/create" : undefined}
      endContent={<PlusIcon />}
      color="primary"
      onPress={onPress}
    >
      Crear nuevo
    </Button>
  );
}

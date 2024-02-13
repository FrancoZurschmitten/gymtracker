import { Chip } from "@nextui-org/react";

export default function ErrorView({
  message,
}: {
  message?: string[] | string;
}) {
  if (!message) return null;
  return (
    <Chip
      color="danger"
      radius="md"
      variant="flat"
      className="max-w-sm h-auto py-2 w-full"
    >
      {typeof message === "string" ? message : message.map((s) => <p key={s}>{s}</p>)}
    </Chip>
  );
}

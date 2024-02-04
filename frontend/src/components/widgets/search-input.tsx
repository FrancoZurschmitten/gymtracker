import { Input } from "@nextui-org/react";
import { SearchIcon } from "../ui/icons";

export default function SearchInput({
  value,
  onValueChange,
  onClear,
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  onClear?: () => void;
}) {
  return (
    <Input
      isClearable
      className="w-full sm:max-w-[44%]"
      placeholder="Buscar por nombre..."
      startContent={<SearchIcon />}
      value={value}
      onValueChange={onValueChange}
      onClear={onClear}
      size="sm"
    />
  );
}

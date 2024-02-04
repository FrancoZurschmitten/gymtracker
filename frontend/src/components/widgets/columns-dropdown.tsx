import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
} from "@nextui-org/react";
import { ChevronDownIcon } from "../ui/icons";
import { capitalize } from "@/lib/utils";

export default function ColumnsDropdown({
  columns,
  visibleColumns,
  onSelectionChange,
}: {
  columns: {
    name: string;
    uid: string;
    sortable?: boolean;
  }[];
  visibleColumns: Selection;
  onSelectionChange?: (keys: Selection) => void;
}) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button endContent={<ChevronDownIcon />}>Columnas</Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Toggle visible columns"
        disallowEmptySelection
        closeOnSelect={false}
        selectionMode="multiple"
        selectedKeys={visibleColumns}
        onSelectionChange={onSelectionChange}
      >
        {columns.map((column) => (
          <DropdownItem key={column.uid} className="capitalize">
            {capitalize(column.name)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

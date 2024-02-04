import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeIcon, VerticalDotsIcon } from "./icons";
import { Key } from "react";

const iconClasses = "text-xl text-default-500 pointer-events-none";

export function ActionDropdown({
  isReadOnly = false,
  onAction,
}: {
  isReadOnly: boolean;
  onAction?: (key: Key) => void;
}) {
  if (isReadOnly) {
    return (
      <div className="relative flex justify-end items-center gap-2">
        <Dropdown placement="bottom-end" showArrow>
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="light">
              <VerticalDotsIcon className="text-default-300" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Item actions"
            variant="faded"
            onAction={onAction}
          >
            <DropdownSection title="Actions">
              <DropdownItem
                key="view"
                description="Te permite ver"
                startContent={<EyeIcon className={iconClasses} />}
              >
                Ver
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }

  return (
    <div className="relative flex justify-end items-center gap-2">
      <Dropdown placement="bottom-end" showArrow>
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light">
            <VerticalDotsIcon className="text-default-300" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Item actions"
          variant="faded"
          onAction={onAction}
        >
          <DropdownSection title="Actions" showDivider>
            <DropdownItem
              key="view"
              description="Te permite ver"
              startContent={<EyeIcon className={iconClasses} />}
            >
              Ver
            </DropdownItem>

            <DropdownItem
              key="change"
              description="Te permite editar"
              startContent={<EditIcon className={iconClasses} />}
            >
              Editar
            </DropdownItem>
          </DropdownSection>

          <DropdownSection title="Danger zone">
            <DropdownItem
              key="delete"
              description="Lo borra permanentemente"
              color="danger"
              startContent={<DeleteIcon className={iconClasses} />}
            >
              Borrar
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

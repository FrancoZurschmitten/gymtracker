"use client";
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

export const iconClasses = "text-xl text-default-500 pointer-events-none";

export function ActionDropdown({
  isReadOnly = false,
  isEditingOnly = false,
  onAction,
}: {
  isReadOnly?: boolean;
  isEditingOnly?: boolean;
  onAction?: (key: Key) => void;
}) {
  const viewDropdownItem = (
    <DropdownItem
      key="view"
      description="Te permite ver"
      startContent={<EyeIcon className={iconClasses} />}
    >
      Ver
    </DropdownItem>
  );

  const editDropdownItem = (
    <DropdownItem
      key="change"
      description="Te permite editar"
      startContent={<EditIcon className={iconClasses} />}
    >
      Editar
    </DropdownItem>
  );

  const deleteDropdownItem = (
    <DropdownItem
      key="delete"
      description="Lo borra permanentemente"
      color="danger"
      startContent={<DeleteIcon className={iconClasses} />}
    >
      Borrar
    </DropdownItem>
  );

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
              {viewDropdownItem}
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }

  if (isEditingOnly) {
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
              {editDropdownItem}
            </DropdownSection>
            <DropdownSection title="Danger zone">
              {deleteDropdownItem}
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
            {viewDropdownItem}
            {editDropdownItem}
          </DropdownSection>
          <DropdownSection title="Danger zone">
            {deleteDropdownItem}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

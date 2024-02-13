"use client";
import { AdaptedUser } from "@/app/(auth)/adapters/types";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";

export default function UserNavMenu({ user }: { user: AdaptedUser }) {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="primary"
          name={
            user.firstName
              ? user.firstName[0] + user.lastName[0]
              : user.username
          }
          size="sm"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="gap-2">
          <p className="font-semibold">
            Registrado como <b>{user.username}</b>
          </p>
        </DropdownItem>
        <DropdownItem key="logout" onClick={() => signOut()} color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

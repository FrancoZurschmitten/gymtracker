"use client";
import React, { Key, useCallback, useEffect, useMemo, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  ButtonGroup,
  Skeleton,
} from "@nextui-org/react";
import { ThemeSwitch } from "@/components/widgets/theme-switch";
import { usePathname, useRouter } from "next/navigation";
import NextLink from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { ChevronDownIcon } from "@/components/ui/icons";
import clsx from "clsx";
import { Session } from "next-auth";
import UserNavMenu from "./user-nav-menu";

const menuItems = [{ label: "Profile", href: "/profile" }];

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  const user = useMemo(() => {
    if (session) return session.user;
    return null;
  }, [session]);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut();
    }
  }, [session]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => setIsMenuOpen(false), [pathname]);

  const handleAction = useCallback(
    (key: Key) => {
      switch (key) {
        case "exercises":
          return router.push("/exercises");
        default:
          return alert("Todavia no esta disponible. Lo siento");
      }
    },
    [router]
  );

  const isActiveLink = useCallback(
    (href: string) => {
      if (href === pathname || (pathname.includes(href) && href !== "/"))
        return true;
      return false;
    },
    [pathname]
  );

  const userMenu = useMemo(() => {
    if (user) {
      return <UserNavMenu user={user} />;
    }

    if (status === "loading") {
      return <Skeleton className="w-8 h-8 rounded-full" />;
    }

    return (
      <Button color="primary" variant="flat" onClick={() => signIn()}>
        Iniciar sesión
      </Button>
    );
  }, [user, status]);

  const exerciseMenu = useMemo(() => {
    const isActive = isActiveLink("/exercises");
    return (
      <ButtonGroup>
        <Button
          as={NextLink}
          href="/exercises"
          disableRipple
          className={clsx([
            isActive ? "font-semibold" : "",
            "text-medium",
            "p-0 bg-transparent data-[hover=true]:bg-transparent",
          ])}
          variant="light"
          color={isActive ? "primary" : "default"}
        >
          Exercises
        </Button>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button
              disableRipple
              className={clsx([
                isActive ? "font-semibold" : "",
                "text-medium",
                "p-0 bg-transparent data-[hover=true]:bg-transparent",
              ])}
              variant="light"
              color={isActive ? "primary" : "default"}
              isIconOnly
            >
              <ChevronDownIcon />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Exercises" onAction={handleAction}>
            <DropdownItem
              key="exercises"
              description="Ejercicios creados por ti."
            >
              Tus ejercicios
            </DropdownItem>
            <DropdownItem
              key="default_exercises"
              description="Ejercicios que vienen por defecto."
            >
              Ejercicios por defecto
            </DropdownItem>
            <DropdownItem
              key="community_exercises"
              description="Ejercicios hechos por usuarios de esta aplicación."
            >
              Ejercicios de la comunidad
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </ButtonGroup>
    );
  }, [isActiveLink, handleAction]);

  return (
    <Navbar
      shouldHideOnScroll
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent className="md:hidden basis-1 pl-4" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent justify="center">
        <NavbarBrand className="max-w-fit">
          <NextLink className="text-lg uppercase font-semibold" href="/">
            GymTracker
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4">
        <NavbarItem isActive={isActiveLink("/")}>
          <Link
            color={isActiveLink("/") ? "primary" : "foreground"}
            aria-current={isActiveLink("/") ? "page" : "false"}
            as={NextLink}
            href={"/"}
          >
            Home
          </Link>
        </NavbarItem>

        {exerciseMenu}

        <NavbarItem isActive={isActiveLink("/notes")}>
          <Link
            color={isActiveLink("/notes") ? "primary" : "foreground"}
            aria-current={isActiveLink("/notes") ? "page" : "false"}
            as={NextLink}
            href={"/notes"}
          >
            Notes
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <ThemeSwitch />
        {userMenu}
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {menuItems.map(({ href, label }, index) => (
            <NavbarMenuItem key={index} isActive={isActiveLink(href)}>
              <Link
                as={NextLink}
                onClick={() => setIsMenuOpen(false)}
                color={isActiveLink(href) ? "primary" : "foreground"}
                href={href}
              >
                {label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </Navbar>
  );
}

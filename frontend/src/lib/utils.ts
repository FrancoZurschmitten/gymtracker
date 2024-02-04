import { muscleGroups } from "@/config/constants";

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
}

export function isActiveLink(pathname: string, href: string) {
  if (href === pathname || (pathname.includes(href) && href !== "/"))
    return true;
  return false;
}

export function getMuscleGroupLabel(key: string) {
  return muscleGroups.find((m) => m.key === key)?.label ?? key;
}

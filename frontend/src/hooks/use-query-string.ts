"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export function useQueryString(querys: { name: string; value: any }[]) {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: any) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, String(value));
      return params.toString();
    },
    [searchParams]
  );

  const queryStrings = useMemo(
    () =>
      "?" +
      querys.map(({ name, value }) => createQueryString(name, value)).join("&"),
    [createQueryString, querys]
  );

  return { queryStrings };
}

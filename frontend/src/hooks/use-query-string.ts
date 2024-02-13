"use client";

import { useCallback,  useMemo } from "react";

export function useQueryString(querys: { name: string; value: any }[]) {

  const createQueryString = useCallback(
    (name: string, value: any) => {
      const params = new URLSearchParams();
      params.set(name, String(value));
      return params.toString();
    },
    []
  );

  const queryStrings = useMemo(() => {
    return (
      "?" +
      querys.map(({ name, value }) => createQueryString(name, value)).join("&")
    );
  }, [createQueryString, querys]);

  return { queryStrings, createQueryString };
}

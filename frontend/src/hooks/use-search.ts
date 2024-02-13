"use client";

import { useState } from "react";

export function useSearch() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValueChange = (value: string) => setSearchValue(value);

  return { searchValue, handleSearchValueChange };
}

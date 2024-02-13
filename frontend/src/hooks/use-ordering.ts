"use client";

import { SortDescriptor } from "@nextui-org/react";
import { useMemo, useState } from "react";

export function useOrdering() {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

  const orderingValue = useMemo(
    () =>
      (sortDescriptor.direction === "ascending" ? "" : "-") +
      sortDescriptor.column,

    [sortDescriptor]
  );

  return { sortDescriptor, setSortDescriptor, orderingValue };
}

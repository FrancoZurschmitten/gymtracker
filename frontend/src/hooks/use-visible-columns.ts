import { Selection } from "@nextui-org/react";
import { useMemo, useState } from "react";

export function useVisibleColumns(
  initialVisibleColumns: string[],
  columns: {
    name: string;
    uid: string;
    sortable?: boolean;
  }[]
) {
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(initialVisibleColumns)
  );

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) => visibleColumns.has(column.uid));
  }, [visibleColumns, columns]);

  return { headerColumns, visibleColumns, setVisibleColumns };
}

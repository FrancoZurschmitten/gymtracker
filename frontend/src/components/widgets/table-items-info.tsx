import { pageSize as generalPageSize } from "@/config/constants";

export function TableItemsInfo({
  countItems = 0,
  pageSize = generalPageSize,
}: {
  countItems?: number;
  pageSize?: number;
}) {
  return (
    <div className="flex justify-between items-end gap-4">
      <span className="text-default-500 text-small">
        {countItems} ejericios en total
      </span>

      <span className="text-default-500 text-small">
        Filas por página: {pageSize}
      </span>
    </div>
  );
}

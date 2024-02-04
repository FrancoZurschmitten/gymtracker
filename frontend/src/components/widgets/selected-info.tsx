import { Selection } from "@nextui-org/react";

export default function SelectedInfo({
  selectionMode,
  selectedKeys,
  countItems = 0,
}: {
  selectionMode: "none" | "multiple" | "single";
  selectedKeys?: Selection;
  countItems?: number;
}) {
  if (selectionMode === "none" || !selectedKeys) return null;
  return (
    <span className="text-small text-default-400">
      {selectedKeys === "all"
        ? "All items selected"
        : `${selectedKeys.size} of ${countItems} selected`}
    </span>
  );
}

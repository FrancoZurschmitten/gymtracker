"use client";

import { Key, useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Pagination,
  Button,
  Spinner,
  SortDescriptor,
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Link,
} from "@nextui-org/react";
import { useQueryString } from "@/hooks/use-query-string";
import { pageSize } from "@/config/constants";
import { EmptyContent } from "@/components/widgets/empty-content";
import { useFetchNotes } from "../../hooks/use-fetch-notes";
import { noteAPI } from "../../services";
import { AdaptedNote } from "../../adapters/types";
import { ActionDropdown } from "@/components/ui/action-dropdown";
import ColumnsDropdown from "@/components/widgets/columns-dropdown";
import SearchInput from "@/components/widgets/search-input";
import { useVisibleColumns } from "@/hooks/use-visible-columns";
import SelectedInfo from "@/components/widgets/selected-info";
import { TableItemsInfo } from "@/components/widgets/table-items-info";
import SerieNoteView from "./serie-notes/serie-note-view";
import NextLink from "next/link";
import PlusButton from "@/components/ui/plus-button";

const columns = [
  { name: "EJERCICIO", uid: "exercise", sortable: true },
  { name: "SERIES", uid: "serieNotes" },
  { name: "FECHA DE CREACIÓN", uid: "date", sortable: true },
  { name: "ACCIONES", uid: "actions" },
];
const INITIAL_VISIBLE_COLUMNS = ["exercise", "serieNotes", "date", "actions"];

export default function NoteTable({
  selectedKeys,
  setSelectedKeys,
  selectionMode = "none",
  isCompact = false,
}: {
  selectedKeys?: Selection;
  setSelectedKeys?: (value: Selection) => void;
  selectionMode?: "single" | "multiple" | "none";
  isCompact?: boolean;
  isReadOnly?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState(1);
  const offset = useMemo(() => (currentPage - 1) * pageSize, [currentPage]);

  const [searchValue, setSearchValue] = useState("");
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

  const { queryStrings } = useQueryString([
    { name: "limit", value: pageSize },
    { name: "offset", value: offset },
    { name: "search", value: searchValue },
    { name: "ordering", value: orderingValue },
  ]);

  const { visibleColumns, setVisibleColumns, headerColumns } =
    useVisibleColumns(INITIAL_VISIBLE_COLUMNS, columns);

  const { fetchData, isFetching, fetchError, mutate } =
    useFetchNotes(queryStrings);

  useEffect(() => {
    if (fetchError && currentPage > 1)
      setCurrentPage((prevPage) => prevPage - 1);
  }, [fetchError, currentPage, setCurrentPage]);

  const classNames = useMemo(
    () => ({
      wrapper: ["max-h-[32rem]"],
    }),
    []
  );

  const loadingState = useMemo(
    () => (isFetching ? "loading" : "idle"),
    [isFetching]
  );

  const items = useMemo(
    () => (fetchData ? fetchData.results : []),
    [fetchData]
  );

  const totalPages = useMemo(
    () => (fetchData ? Math.ceil(fetchData.count / pageSize) : 0),
    [fetchData]
  );

  const handleSearchChange = useCallback(
    (value: string | undefined) => {
      setSearchValue(String(value));
      setCurrentPage(1);
    },
    [setSearchValue, setCurrentPage]
  );

  const handleClear = useCallback(() => {
    setSearchValue("");
    setCurrentPage(1);
  }, [setSearchValue, setCurrentPage]);

  const handleAction = useCallback(
    (key: Key, item: AdaptedNote) => {
      switch (key) {
        case "change":
          return router.push(pathname + `/${item.id}/update`);

        case "delete":
          return noteAPI
            .deleteNote(item.id)
            .then(() => mutate())
            .catch(() => alert("No se pudo borrar la nota"));

        default:
          return null;
      }
    },
    [router, mutate, pathname]
  );

  const renderCell = useCallback(
    (item: AdaptedNote, columnKey: Key) => {
      switch (columnKey) {
        case "actions":
          return (
            <ActionDropdown
              isEditingOnly
              onAction={(key) => handleAction(key, item)}
            />
          );

        case "exercise":
          return (
            <Link
              as={NextLink}
              href={"exercises/" + `${item.exercise.id}`}
              isBlock
              showAnchorIcon
              color="foreground"
            >
              {item.exercise.name}
            </Link>
          );

        case "serieNotes":
          return (
            <div className="flex gap-1">
              {item.serieNotes.map((item) => {
                return (
                  <Popover key={item.id} size="sm" showArrow>
                    <PopoverTrigger>
                      <Button size="sm" isIconOnly>
                        {item.serieNumber}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="px-1 py-2">
                        <SerieNoteView itemView={item} />
                      </div>
                    </PopoverContent>
                  </Popover>
                );
              })}
            </div>
          );

        case "date":
          return item.date;

        default:
          return item[columnKey as keyof AdaptedNote] as any;
      }
    },
    [handleAction]
  );

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-4 items-center flex-col sm:flex-row">
          <SearchInput
            value={searchValue}
            onValueChange={handleSearchChange}
            onClear={handleClear}
          />

          <div className="flex gap-3 justify-between sm:justify-end items-center w-full">
            <ColumnsDropdown
              columns={columns}
              visibleColumns={visibleColumns}
              onSelectionChange={setVisibleColumns}
            />

            <PlusButton isLink />
          </div>
        </div>

        <TableItemsInfo countItems={fetchData?.count} />
      </div>
    );
  }, [
    searchValue,
    handleSearchChange,
    handleClear,
    visibleColumns,
    setVisibleColumns,
    fetchData,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        {totalPages === 0 ? (
          <div />
        ) : (
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={currentPage}
            total={totalPages}
            onChange={(page) => setCurrentPage(page)}
          />
        )}

        <SelectedInfo
          selectionMode={selectionMode}
          selectedKeys={selectedKeys}
          countItems={fetchData?.count}
        />
      </div>
    );
  }, [
    currentPage,
    totalPages,
    setCurrentPage,
    selectionMode,
    selectedKeys,
    fetchData,
  ]);

  return (
    <Table
      aria-label="Exercise Table"
      isHeaderSticky
      classNames={classNames}
      topContent={topContent}
      topContentPlacement="outside"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      // Selection
      disabledBehavior="all"
      selectionMode={selectionMode}
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      isCompact={isCompact}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.name === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        items={items}
        loadingContent={<Spinner />}
        loadingState={loadingState}
        emptyContent={
          <EmptyContent
            loadingState={loadingState}
            error={fetchError}
            reset={router.refresh}
          />
        }
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

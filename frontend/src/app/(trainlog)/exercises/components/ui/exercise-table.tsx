"use client";

import { Key, useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Pagination,
  Spinner,
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Chip,
} from "@nextui-org/react";
import { useQueryString } from "@/hooks/use-query-string";
import { pageSize } from "@/config/constants";
import { getMuscleGroupLabel } from "@/lib/utils";
import { EmptyContent } from "@/components/widgets/empty-content";
import { useFetchExercises } from "../../hooks/use-fetch-exercises";
import { exerciseAPI } from "../../services";
import { AdaptedExercise } from "../../adapters/types";
import { ActionDropdown } from "@/components/ui/action-dropdown";
import ColumnsDropdown from "@/components/widgets/columns-dropdown";
import SearchInput from "@/components/widgets/search-input";
import ExerciseFormModal from "./exercise-form-modal";
import ExerciseViewModal from "./exercise-view-modal";
import { useVisibleColumns } from "@/hooks/use-visible-columns";
import SelectedInfo from "@/components/widgets/selected-info";
import { TableItemsInfo } from "@/components/widgets/table-items-info";
import { usePagination } from "@/hooks/use-pagination";
import { useSearch } from "@/hooks/use-search";
import { useOrdering } from "@/hooks/use-ordering";
import PlusButton from "@/components/ui/plus-button";

const columns = [
  { name: "NOMBRE", uid: "name", sortable: true },
  { name: "DESCRIPCIÓN", uid: "description" },
  { name: "GRUPO MUSCULAR", uid: "muscleGroup" },
  { name: "ES PÚBLICO", uid: "isPublic" },
  { name: "ACCIONES", uid: "actions" },
];
const INITIAL_VISIBLE_COLUMNS = ["name", "muscleGroup", "isPublic", "actions"];

export default function ExerciseTable({
  selectedKeys,
  setSelectedKeys,
  selectionMode = "none",
}: {
  selectedKeys?: Selection;
  setSelectedKeys?: (value: Selection) => void;
  selectionMode?: "single" | "multiple" | "none";
}) {
  const isReadOnly = selectionMode !== "none";
  const router = useRouter();
  const pathname = usePathname();

  const { currentPage, handlePageChange, offset } = usePagination();
  const { searchValue, handleSearchValueChange } = useSearch();
  const { sortDescriptor, setSortDescriptor, orderingValue } = useOrdering();

  const { visibleColumns, setVisibleColumns, headerColumns } =
    useVisibleColumns(INITIAL_VISIBLE_COLUMNS, columns);

  const [itemView, setItemView] = useState<any>();
  const [itemChange, setItemChange] = useState<any>();
  const [isOpenModalForm, setOpenModalForm] = useState(false);

  const { queryStrings } = useQueryString([
    { name: "limit", value: pageSize },
    { name: "offset", value: offset },
    { name: "search", value: searchValue },
    { name: "ordering", value: orderingValue },
  ]);

  const { fetchData, isFetching, fetchError, mutate } =
    useFetchExercises(queryStrings);

  useEffect(() => {
    if (fetchError && currentPage > 1) {
      router.push(pathname);
    }
  }, [fetchError, currentPage, router, pathname]);

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
      handleSearchValueChange(value ?? "");
      handlePageChange(1);
    },
    [handleSearchValueChange, handlePageChange]
  );

  const handleClear = useCallback(() => {
    handleSearchValueChange("");
    handlePageChange(1);
  }, [handleSearchValueChange, handlePageChange]);

  const handleAction = useCallback(
    (key: Key, item: AdaptedExercise) => {
      switch (key) {
        case "view":
          return setItemView(item);

        case "change":
          return setItemChange(item);

        case "delete":
          return exerciseAPI.deleteExercise(item.id).then(() => mutate());

        default:
          return null;
      }
    },
    [setItemView, setItemChange, mutate]
  );

  const renderCell = useCallback(
    (item: AdaptedExercise, columnKey: Key) => {
      switch (columnKey) {
        case "actions":
          return (
            <ActionDropdown
              isReadOnly={isReadOnly || item.isPublic}
              onAction={(key) => handleAction(key, item)}
            />
          );

        case "name":
          return item.name;

        case "description":
          return <p className="text-default-500">{item.description}</p>;

        case "muscleGroup":
          return item.muscleGroup ? (
            <Chip variant="flat">{getMuscleGroupLabel(item.muscleGroup)}</Chip>
          ) : null;

        case "isPublic":
          return (
            <Chip color={item.isPublic ? "success" : "default"} variant="flat">
              {item.isPublic ? "Si" : "No"}
            </Chip>
          );

        default:
          return item[columnKey as keyof AdaptedExercise] as any;
      }
    },
    [handleAction, isReadOnly]
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

            {!isReadOnly && (
              <PlusButton onPress={() => setOpenModalForm(true)} />
            )}

            <ExerciseViewModal
              itemView={itemView}
              onOpenChange={() => setItemView(undefined)}
            />

            {!isReadOnly && (
              <ExerciseFormModal
                itemToEdit={itemChange}
                isOpen={isOpenModalForm}
                onOpenChange={() => {
                  setItemChange(undefined);
                  setOpenModalForm(false);
                }}
                callback={mutate}
              />
            )}
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
    setOpenModalForm,
    itemView,
    setItemView,
    itemChange,
    isOpenModalForm,
    setItemChange,
    mutate,
    isReadOnly,
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
            onChange={handlePageChange}
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
    handlePageChange,
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
      topContentPlacement={isReadOnly ? "inside" : "outside"}
      bottomContent={bottomContent}
      bottomContentPlacement={isReadOnly ? "inside" : "outside"}
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      // Selection
      disabledBehavior="all"
      selectionMode={selectionMode}
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      isCompact={isReadOnly}
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

"use client";

import { Key, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
  Chip,
} from "@nextui-org/react";
import { PlusIcon } from "@/components/ui/icons";
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

const columns = [
  { name: "CLAVE ÚNICA", uid: "id", sortable: true },
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
  isCompact = false,
}: {
  selectedKeys?: Selection;
  setSelectedKeys?: (value: Selection) => void;
  selectionMode?: "single" | "multiple" | "none";
  isCompact?: boolean;
  isReadOnly?: boolean;
}) {
  const router = useRouter();

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

  const [itemView, setItemView] = useState<any>();
  const [itemChange, setItemChange] = useState<any>();
  const [isOpenModalForm, setOpenModalForm] = useState(false);

  const { queryStrings } = useQueryString([
    { name: "limit", value: pageSize },
    { name: "offset", value: offset },
    { name: "search", value: searchValue },
    { name: "ordering", value: orderingValue },
  ]);

  const { visibleColumns, setVisibleColumns, headerColumns } =
    useVisibleColumns(INITIAL_VISIBLE_COLUMNS, columns);

  const { fetchData, isFetching, fetchError, mutate } =
    useFetchExercises(queryStrings);

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
              isReadOnly={item.isPublic}
              onAction={(key) => handleAction(key, item)}
            />
          );

        case "id":
          return <p className="text-primary">{item.id}</p>;

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

            <Button
              endContent={<PlusIcon />}
              color="primary"
              onClick={() => setOpenModalForm(true)}
            >
              Add New
            </Button>

            <ExerciseViewModal
              itemView={itemView}
              onOpenChange={() => setItemView(undefined)}
            />

            <ExerciseFormModal
              itemToEdit={itemChange}
              isOpen={isOpenModalForm}
              onOpenChange={() => {
                setItemChange(undefined);
                setOpenModalForm(false);
              }}
              callback={mutate}
            />
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
    setOpenModalForm,
    mutate,
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

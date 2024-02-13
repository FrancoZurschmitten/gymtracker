"use client";

import { pageSize } from "@/config/constants";
import { useMemo, useState } from "react";

export function usePagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const offset = useMemo(() => (currentPage - 1) * pageSize, [currentPage]);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return {
    currentPage,
    handlePageChange,
    offset,
  };
}

"use client";

import useSWR from "swr";
import { createAdaptedNote } from "../adapters";
import { noteAPI } from "../services";

const swrOptions = {
  keepPreviousData: true,
};

const fetchAdaptedNote = async (id: string | number) => {
  return await noteAPI.getNote(id).then((data) => createAdaptedNote(data));
};

export const useFetchNote = (id: string | number) => {
  const {
    data: fetchData,
    isLoading: isFetching,
    error: fetchError,
    mutate,
  } = useSWR("note" + id, () => fetchAdaptedNote(id), swrOptions);

  return { fetchData, isFetching, fetchError, mutate };
};

"use client";

import useSWR from "swr";
import { noteAPI } from "../services";
import { createAdaptedNote } from "../adapters";

const swrOptions = {
  keepPreviousData: true,
};

const fetchAdaptedNotes = async (filters?: string) => {
  return await noteAPI.getNotes(filters).then((data) => ({
    ...data,
    results: data.results.map((item) => createAdaptedNote(item)),
  }));
};

export const useFetchNotes = (filters?: string) => {
  const {
    data: fetchData,
    isLoading: isFetching,
    error: fetchError,
    mutate,
  } = useSWR(
    "notes" + (filters ? filters : ""),
    () => fetchAdaptedNotes(filters),
    swrOptions
  );

  return { fetchData, isFetching, fetchError, mutate };
};

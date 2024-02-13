"use client";

import useSWR from "swr";
import { createAdaptedExercise } from "../adapters";
import { exerciseAPI } from "../services";

const swrOptions = {
  keepPreviousData: true,
};

const fetchAdaptedExercise = async (id: string | number) => {
  return await exerciseAPI
    .getExecrise(id)
    .then((data) => createAdaptedExercise(data));
};

export const useFetchExercise = (id: string | number) => {
  const {
    data: fetchData,
    isLoading: isFetching,
    error: fetchError,
    mutate,
  } = useSWR("exercise" + id, () => fetchAdaptedExercise(id), swrOptions);

  return { fetchData, isFetching, fetchError, mutate };
};

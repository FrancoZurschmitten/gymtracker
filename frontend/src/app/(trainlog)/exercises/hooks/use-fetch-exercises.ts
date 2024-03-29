"use client";

import useSWR from "swr";
import { createAdaptedExercise } from "../adapters";
import { exerciseAPI } from "../services";

const swrOptions = {
  keepPreviousData: true,
};

const fetchAdaptedExercises = async (filters?: string) => {
  return await exerciseAPI.getExercises(filters).then((data) => ({
    ...data,
    results: data.results.map((item) => createAdaptedExercise(item)),
  }));
};

export const useFetchExercises = (filters?: string) => {
  const key = "exercises" + (filters ? filters : "");

  const {
    data: fetchData,
    isLoading: isFetching,
    error: fetchError,
    mutate,
  } = useSWR(key, () => fetchAdaptedExercises(filters), swrOptions);

  return { fetchData, isFetching, fetchError, mutate };
};

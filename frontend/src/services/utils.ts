import axios from "axios";
import { getSession } from "next-auth/react";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

export const API = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(async function (config) {
  const session = await getSession();
  if (session) {
    config.headers.Authorization = "Bearer " + session.accessToken;
  }
  return config;
});

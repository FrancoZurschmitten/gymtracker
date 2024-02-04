import axios from "axios";
import { getSession } from "next-auth/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API = axios.create({
  baseURL: BASE_URL,
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

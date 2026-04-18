import axios, { AxiosError } from "axios";
import { getJwt } from "@/lib/auth/session";

// ─── Base URL ───
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "http://localhost:8000";

// ─── Custom error class ───
export class ApiClientError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.details = details;
  }
}

// ─── Centralized axios instance ───
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { Accept: "application/json" },
});

// Request interceptor — attach JWT
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = getJwt();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// Response interceptor — handle 401
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {

    if (error.response?.status === 401 && typeof window !== "undefined") {
      document.cookie = "hometutorly.jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax";
      const redirect = window.location.pathname;
      window.location.href = `/login?redirect=${encodeURIComponent(redirect)}`;
    }

    const data = error.response?.data as Record<string, unknown> | undefined;
    const message =
      (data?.message as string) ??
      (data?.error as string) ??
      error.message ??
      `Request failed with status ${error.response?.status}`;

    return Promise.reject(
      new ApiClientError(message, error.response?.status ?? 0, data),
    );
  },
);

export default api;

// ─── Helper: extract user-friendly error message ───
export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof ApiClientError) return error.message;
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}
import type { AuthTokens, AuthUser } from "@/types";

const AUTH_SESSION_KEY = "hometutorly.auth.session";
const JWT_COOKIE_NAME = "hometutorly.jwt";
const JWT_EXPIRY_MINUTES = 2 * 24 * 60; // 2 days

function setCookie(name: string, value: string, minutes: number): void {
  const expires = new Date(Date.now() + minutes * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function deleteCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

export function saveJwt(token: string): void {
  if (typeof window === "undefined") return;
  setCookie(JWT_COOKIE_NAME, token, JWT_EXPIRY_MINUTES);
}

export function getJwt(): string | null {
  if (typeof window === "undefined") return null;
  return getCookie(JWT_COOKIE_NAME);
}

export function clearJwt(): void {
  if (typeof window === "undefined") return;
  deleteCookie(JWT_COOKIE_NAME);
}

interface StoredAuthSession {
  tokens: AuthTokens | null;
  user: AuthUser | null;
}

export function saveAuthSession(tokens?: AuthTokens, user?: AuthUser): void {
  if (typeof window === "undefined") {
    return;
  }

  const session: StoredAuthSession = {
    tokens: tokens ?? null,
    user: user ?? null,
  };

  window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
}

export function clearAuthSession(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_SESSION_KEY);
  clearJwt();
}
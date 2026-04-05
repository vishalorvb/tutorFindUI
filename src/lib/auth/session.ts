import type { AuthTokens, AuthUser } from "@/types";

const AUTH_SESSION_KEY = "tutorfind.auth.session";

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
}
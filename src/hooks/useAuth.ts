import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  loginRequest,
  registerRequest,
  logoutRequest,
  fetchUser,
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  LogoutResponse,
  User,
} from "@/lib/auth";

export const USER_QUERY_KEY = ["auth", "user"] as const;

// ─── Token Helper (client-only) ───────────────────────────────────────────────

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

// ─── useUser ─────────────────────────────────────────────────────────────────

/**
 * Fetches the authenticated user from GET /api/user.
 * Skips the request entirely when no token is present in localStorage.
 * Returns `undefined` when unauthenticated (no token) or when the
 * token is invalid (Laravel returns 401, axios throws, react-query catches).
 */
export function useUser() {
  return useQuery<User, Error>({
    queryKey: USER_QUERY_KEY,
    queryFn: fetchUser,
    retry: false,                // don't retry on 401 — user simply isn't authed
    staleTime: 1000 * 60 * 5,   // treat user data as fresh for 5 minutes
    enabled: !!getToken(),       // skip network call when there's no token
  });
}

// ─── useLogin ────────────────────────────────────────────────────────────────

/**
 * Login mutation.
 * - `loginRequest` in auth.ts already saves the token to localStorage.
 * - Sets the user directly in the query cache (no extra GET /api/user call).
 * - Redirects to /admin/dashboard on success.
 * - Expose `error` from the returned object to show validation messages.
 */
export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      queryClient.setQueryData<User>(USER_QUERY_KEY, data.user);
      router.push("/dashboard");
    },
  });
}

// ─── useRegister ─────────────────────────────────────────────────────────────

/**
 * Register mutation.
 * - `registerRequest` in auth.ts saves the token to localStorage.
 * - Sets the user in cache and redirects to /admin/dashboard on success.
 * - `password_confirmation` must equal `password` (Laravel `confirmed` rule).
 */
export function useRegister() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<AuthResponse, Error, RegisterCredentials>({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      queryClient.setQueryData<User>(USER_QUERY_KEY, data.user);
      router.push("/dashboard");
    },
  });
}

// ─── useLogout ───────────────────────────────────────────────────────────────

/**
 * Logout mutation.
 * - Calls POST /api/logout which deletes the token in the DB via auth:sanctum.
 * - `logoutRequest` in auth.ts removes the token from localStorage.
 * - Clears the entire query cache so no stale user data lingers.
 * - Redirects to /signin.
 * - Falls back to cache clear + redirect even if the API call fails (onSettled),
 *   so the user is never stuck in a broken authenticated state on the client.
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<LogoutResponse, Error, void>({
    mutationFn: logoutRequest,
    onSettled: () => {
      // Always clear cache and redirect — even on network error.
      // The token is already removed from localStorage by logoutRequest.
      queryClient.clear();
      router.push("/signin");
    },
  });
}

// ─── useIsAuthenticated ───────────────────────────────────────────────────────

/**
 * Convenience hook: returns whether the user is authenticated and
 * whether the initial user fetch is still in flight.
 *
 * `isLoading` is only true while the query is actually fetching
 * (i.e. a token exists and GET /api/user is in-flight).
 * When there is no token, `enabled` is false so `isLoading` stays false.
 */
export function useIsAuthenticated() {
  const { data, isLoading } = useUser();
  return {
    isAuthenticated: !!data,
    isLoading,
    user: data ?? null,
  };
}
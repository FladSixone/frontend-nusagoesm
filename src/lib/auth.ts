import api from "@/lib/axios";

export interface User {
  id: number;
  name: string;
  email: string;
  // Add any other fields your Laravel User model returns
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

/**
 * Step 1: Hit /sanctum/csrf-cookie to get the XSRF-TOKEN cookie.
 * Step 2: POST /login with credentials.
 * Sanctum sets a session cookie on success.
 */
export async function loginRequest(credentials: LoginCredentials): Promise<void> {
  await api.get("/sanctum/csrf-cookie");
  await api.post("/api/login", credentials);
}

/**
 * POST /logout to invalidate the session on the Laravel side.
 */
export async function logoutRequest(): Promise<void> {
  await api.post("/logout");
}

/**
 * GET /api/user — returns the authenticated user or throws a 401.
 * Used to check if the user is currently logged in.
 */
export async function fetchUser(): Promise<User> {
  const response = await api.get<User>("/api/user");
  return response.data;
}

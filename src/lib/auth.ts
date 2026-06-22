import api from "@/lib/axios";

// ─── Shared Types ────────────────────────────────────────────────────────────

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

// ─── Request Payloads ────────────────────────────────────────────────────────

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string; // Laravel's `confirmed` rule expects this field
  role: "admin" | "user";
}

// ─── Response Shapes ─────────────────────────────────────────────────────────

export interface AuthResponse {
  message: string;       // e.g. "Login berhasil" / "Pendaftaran berhasil"
  access_token: string;  // Sanctum plain-text token
  token_type: "Bearer";
  user: User;
}

export interface LogoutResponse {
  message: string; // "Logout berhasil"
}

// ─── Token Helpers ───────────────────────────────────────────────────────────

const TOKEN_KEY = "access_token";

function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

// ─── Auth Requests ───────────────────────────────────────────────────────────

/**
 * POST /api/login
 * Validates credentials, returns a Sanctum token, and persists it locally.
 */
export async function loginRequest(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/api/login", credentials);
  saveToken(response.data.access_token);
  return response.data;
}

/**
 * POST /api/register
 * Creates a new user account, returns a Sanctum token, and persists it locally.
 * Note: `password_confirmation` must match `password` (Laravel `confirmed` rule).
 */
export async function registerRequest(
  credentials: RegisterCredentials
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/api/register", credentials);
  saveToken(response.data.access_token);
  return response.data;
}

/**
 * POST /api/logout
 * Deletes the current token from the DB (auth:sanctum) and clears local storage.
 */
export async function logoutRequest(): Promise<LogoutResponse> {
  const response = await api.post<LogoutResponse>("/api/logout");
  clearToken();
  return response.data;
}

/**
 * GET /api/user
 * Returns the currently authenticated user (requires Bearer token in header).
 */
export async function fetchUser(): Promise<User> {
  const response = await api.get<User>("/api/user");
  return response.data;
}
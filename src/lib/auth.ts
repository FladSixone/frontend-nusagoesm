import api from "@/lib/axios";
import Cookies from "js-cookie";

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
  password_confirmation: string;
  role: "admin" | "user";
}

// ─── Response Shapes ─────────────────────────────────────────────────────────

export interface AuthResponse {
  message: string;
  access_token: string;  // Sanctum Bearer token
  token_type: "Bearer";
  user: User;
}

export interface LogoutResponse {
  message: string;
}

// ─── Token Helpers ───────────────────────────────────────────────────────────

const TOKEN_KEY = "token";
const AUTH_FLAG = "is_authenticated"; // presence flag for middleware only

export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);       // axios interceptor reads this
  Cookies.set(AUTH_FLAG, "1", {                 // middleware reads this
    expires: 1,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  Cookies.remove(AUTH_FLAG);
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

// ─── Auth Requests ───────────────────────────────────────────────────────────

export async function loginRequest(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/api/login", credentials);
  saveToken(response.data.access_token);
  return response.data;
}

export async function registerRequest(credentials: RegisterCredentials): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/api/register", credentials);
  saveToken(response.data.access_token);
  return response.data;
}

export async function logoutRequest(): Promise<LogoutResponse> {
  try{
  const response = await api.post<LogoutResponse>("/api/logout");
  clearToken();
  return response.data;
  } catch {
    return { message: "Logout berhasil" };
  }
}

export async function fetchUser(): Promise<User> {
  const response = await api.get<User>("/api/user");
  return response.data;
}
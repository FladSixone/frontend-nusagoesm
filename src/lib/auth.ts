import api from "@/lib/axios";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;       // "Login berhasil"
  access_token: string;  // Sanctum plain text token
  token_type: string;    // "Bearer"
  user: User;
}

export async function loginRequest(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/login", credentials);

  // Store token so the axios interceptor can attach it to future requests
  localStorage.setItem("access_token", response.data.access_token);

  return response.data;
}

export async function logoutRequest(): Promise<void> {
  await api.post("/api/logout"); // deletes token from DB via auth:sanctum
  localStorage.removeItem("access_token");
}

export async function fetchUser(): Promise<User> {
  const response = await api.get<User>("/user");
  return response.data;
}

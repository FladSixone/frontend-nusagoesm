import api from "@/lib/axios";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  department: string;
  position: string;
  created_at: string;
  updated_at: string;
}

export interface EmployeePayload {
  name: string;
  email: string;
  phone: string;
  address: string;
  department: string;
  position: string;
}

export interface MessageResponse {
  message: string;
}

export interface StoreEmployeeResponse {
  message: string;
  data: Employee;
}

export interface UpdateEmployeeResponse {
  message: string;
  data: Employee;
}

// ─── Requests ────────────────────────────────────────────────────────────────

/** GET /api/employees */
export async function fetchEmployees(): Promise<Employee[]> {
  const response = await api.get<Employee[]>("/api/employees");
  return response.data;
}

/** GET /api/employees/:id */
export async function fetchEmployee(id: number): Promise<Employee> {
  const response = await api.get<Employee>(`/api/employees/${id}`);
  return response.data;
}

/** POST /api/employees */
export async function storeEmployee(
  payload: EmployeePayload
): Promise<StoreEmployeeResponse> {
  const response = await api.post<StoreEmployeeResponse>("/api/employees", payload);
  return response.data;
}

/** PUT /api/employees/:id */
export async function updateEmployee(
  id: number,
  payload: EmployeePayload
): Promise<UpdateEmployeeResponse> {
  const response = await api.put<UpdateEmployeeResponse>(
    `/api/employees/${id}`,
    payload
  );
  return response.data;
}

/** DELETE /api/employees/:id */
export async function destroyEmployee(id: number): Promise<MessageResponse> {
  const response = await api.delete<MessageResponse>(`/api/employees/${id}`);
  return response.data;
}
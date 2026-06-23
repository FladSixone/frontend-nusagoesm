import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchEmployees,
  fetchEmployee,
  storeEmployee,
  updateEmployee,
  destroyEmployee,
  Employee,
  EmployeePayload,
} from "@/lib/employee";

export const EMPLOYEE_QUERY_KEY = ["employees"];

/** GET /api/employees */
export function useEmployees() {
  return useQuery<Employee[], Error>({
    queryKey: EMPLOYEE_QUERY_KEY,
    queryFn: fetchEmployees,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

/** GET /api/employees/:id */
export function useEmployee(id: number) {
  return useQuery<Employee, Error>({
    queryKey: [...EMPLOYEE_QUERY_KEY, id],
    queryFn: () => fetchEmployee(id),
    enabled: !!id,
  });
}

/** POST /api/employees */
export function useStoreEmployee() {
  const queryClient = useQueryClient();
  return useMutation<{ message: string; data: Employee }, Error, EmployeePayload>({
    mutationFn: storeEmployee,
    onSuccess: () => {
      // Invalidate list so it refetches with the new employee
      queryClient.invalidateQueries({ queryKey: EMPLOYEE_QUERY_KEY });
    },
  });
}

/** PUT /api/employees/:id */
export function useUpdateEmployee(id: number) {
  const queryClient = useQueryClient();
  return useMutation<{ message: string; data: Employee }, Error, EmployeePayload>({
    mutationFn: (payload) => updateEmployee(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EMPLOYEE_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...EMPLOYEE_QUERY_KEY, id] });
    },
  });
}

/** DELETE /api/employees/:id */
export function useDestroyEmployee() {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, Error, number>({
    mutationFn: (id) => destroyEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EMPLOYEE_QUERY_KEY });
    },
  });
}
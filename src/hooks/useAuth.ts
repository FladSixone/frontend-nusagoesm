import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { loginRequest, logoutRequest, fetchUser, LoginCredentials, User } from "@/lib/auth";

// The cache key for the authenticated user
export const USER_QUERY_KEY = ["auth", "user"] as const;

/**
 * Returns the currently authenticated user.
 * - `isLoading`: true on first load
 * - `data`: the User object, or undefined if not logged in
 * - `isError`: true if the user is not authenticated (401)
 */
export function useUser() {
  return useQuery<User>({
    queryKey: USER_QUERY_KEY,
    queryFn: fetchUser,
    retry: false,           // Don't retry on 401
    staleTime: 1000 * 60 * 5, // Consider user data fresh for 5 minutes
  });
}

/**
 * Returns a mutation for logging in.
 * On success, invalidates the user query so the app re-fetches the user
 * and redirects to the dashboard.
 *
 * Usage:
 *   const { mutate: login, isPending, error } = useLogin();
 *   login({ email, password });
 */
export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, Error, LoginCredentials>({
    mutationFn: loginRequest,
    onSuccess: async () => {
      // Refetch the user after successful login
      await queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
      router.push("/admin/dashboard");
    },
  });
}

/**
 * Returns a mutation for logging out.
 * On success, clears the user from the query cache and redirects to /signin.
 *
 * Usage:
 *   const { mutate: logout } = useLogout();
 *   logout();
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, Error, void>({
    mutationFn: logoutRequest,
    onSuccess: () => {
      // Remove the cached user so isAuthenticated becomes false immediately
      queryClient.setQueryData(USER_QUERY_KEY, null);
      queryClient.clear();
      router.push("/signin");
    },
  });
}

/**
 * Convenience hook: returns whether the user is authenticated.
 * Useful for guards in layouts or middleware.
 */
export function useIsAuthenticated() {
  const { data, isLoading } = useUser();
  return { isAuthenticated: !!data, isLoading };
}

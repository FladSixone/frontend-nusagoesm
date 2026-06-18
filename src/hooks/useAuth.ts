import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginRequest, logoutRequest, fetchUser, LoginCredentials, User } from "@/lib/auth";
import Cookies from "js-cookie";

export const USER_QUERY_KEY = ["auth", "user"] as const;

/**
 * Fetches the authenticated user from GET /api/user.
 * The axios interceptor automatically attaches the Bearer token from localStorage.
 * Returns undefined if no token exists or if the token is invalid (401).
 */
export function useUser() {
  return useQuery<User>({
    queryKey: USER_QUERY_KEY,
    queryFn: fetchUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
    // Don't even attempt the request if there's no token in localStorage
    enabled: typeof window !== "undefined" && !!localStorage.getItem("access_token"),
  });
}

/**
 * Login mutation.
 * On success: stores the token, sets the user in cache, redirects to dashboard.
 * On failure: the error is available as `error` from the returned mutation object.
 */
export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<ReturnType<typeof loginRequest> extends Promise<infer T> ? T : never, Error, LoginCredentials>({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      // Laravel returned the user in the login response — set it directly,
      // no need for a separate GET /api/user call
      queryClient.setQueryData(USER_QUERY_KEY, data.user);
      router.push("/admin/dashboard");
    },
  });
}

/**
 * Logout mutation.
 * On success: removes the token, clears the cache, redirects to /signin.
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, Error, void>({
    mutationFn: logoutRequest,
    onSuccess: () => {
      queryClient.clear();
      router.push("/signin");
    },
  });
}

export function useIsAuthenticated() {
  const { data, isLoading } = useUser();
  return { isAuthenticated: !!data, isLoading };
}

//Cookies.set("access_token", response.data.access_token, { expires: 1 });''
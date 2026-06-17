import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * This middleware protects /admin routes by checking if a Laravel session
 * cookie exists. For a hard server-side check, it calls /api/user on your
 * Laravel backend; for a lightweight check it just looks for the session cookie.
 *
 * Using the lightweight approach here — the real auth check happens in useUser().
 */

const PROTECTED_PATHS = ["/employee"];
const PUBLIC_PATHS = ["/signin", "/reset-password"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  // Laravel Sanctum uses a session cookie — its name is typically
  // "laravel_session" (check your Laravel config/session.php → 'cookie').
  const sessionCookie =
    request.cookies.get("laravel_session") ||
    request.cookies.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_NAME || "laravel_session");

  if (isProtected && !sessionCookie) {
    // No session cookie found — redirect to sign-in
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (isPublic && sessionCookie) {
    // Already logged in — redirect away from auth pages
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes except Next.js internals and static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/).*)"],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const PROTECTED = ["/invoices", "/clients", "/company"];

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const isProtected = PROTECTED.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const cookie = getSessionCookie(request);
  if (cookie) {
    return NextResponse.next();
  }

  const login = new URL("/login", request.url);
  login.searchParams.set("callbackURL", `${pathname}${search}`);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/invoices/:path*", "/clients/:path*", "/company/:path*"],
};

import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth(request); // <--- обов'язково передати request

  const isLoggedIn = !!session?.email;

  const protectedRoutes = ["/dashboard", "/quiz", "/upload"];
  const path = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) =>
    path.startsWith(route)
  );

  if (isProtected && !isLoggedIn) {
    const url = new URL("/sign-in", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

//middleware
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl.pathname;

  const publicRoutes = [
    "/login",
    "/api/auth",
  ];

  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

  if (!isLoggedIn && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
});

export const config = {
  matcher: [
    "/",
    "/add-application",
  ],
};
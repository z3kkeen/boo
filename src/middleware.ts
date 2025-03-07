import { betterFetch } from "@better-fetch/fetch";
import { NextRequest, NextResponse } from "next/server";

export default async function authMiddleware(request: NextRequest) {
  const { data: session } = await betterFetch<unknown>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

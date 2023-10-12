import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const allowedRoutes = ["/", "/users", "/rooms", "/logs"];

export default async function middleware(request) {
  if (allowedRoutes.includes(request.nextUrl.pathname)) {
    if (!request.cookies.has("token")) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    console.log("execute homepage!");
    try {
      const token = request.cookies.get("token");

      const verify = await jwtVerify(
        token.value,
        new TextEncoder().encode(process.env.JWT_SECRET_KEY),
      );

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("api_token", verify.payload.api_token);

      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

      response.cookies.set({
        name: "email",
        value: verify.payload.email,
        expires: verify.payload.exp * 1000,
        path: "/",
      });

      response.cookies.set({
        name: "fullname",
        value: verify.payload.fullname,
        expires: verify.payload.exp * 1000,
        path: "/",
      });

      response.cookies.set({
        name: "api_token",
        value: verify.payload.api_token,
        expires: verify.payload.exp * 1000,
        path: "/",
      });

      return response;
    } catch (error) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/auth")) {
    if (request.cookies.has("token")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

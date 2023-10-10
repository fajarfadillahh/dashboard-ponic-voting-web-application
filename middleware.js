import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default async function middleware(request) {
  if (!request.cookies.has("token")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    const token = request.cookies.get("token");

    const verify = await jwtVerify(
      token.value,
      new TextEncoder().encode(process.env.JWT_SECRET_KEY),
    );

    const response = NextResponse.next();

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

export const config = {
  matcher: ["/", "/users", "/rooms", "/logs"],
};

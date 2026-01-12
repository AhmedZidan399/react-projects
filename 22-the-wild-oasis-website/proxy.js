import { NextResponse } from "next/server";
import { auth } from "./app/_lib/auth";

/** 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  return NextResponse.redirect(new URL("/about", request.url));
}
*/

export const proxy = auth;

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/account"],
};

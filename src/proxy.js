import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoute = ["/chackout", "/my-orders", "/cart"];

export async function proxy(req) {
  const token = await getToken({ req , secret: process.env.NEXTAUTH_SECRET});
  const isAuthenticate = Boolean(token);
  const reqPath = req.nextUrl.pathname;
  const isPrivateRoute = privateRoute.some((route) =>
    reqPath.startsWith(route),
);

  if (Boolean(!isAuthenticate && isPrivateRoute)) {
    return NextResponse.redirect(
      new URL(`/login?callback=${reqPath}`, req.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chackout/:path*", "/my-orders/:path*", "/cart/:path*"],
};

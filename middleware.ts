import { auth } from "@/auth";
import {
  apiAuthPrefix,
  authRoutes,
  privateRoutes,
  publicRoutes,
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_LOGIN_ROUTE,
  DEFAULT_ONBOARDING_ROUTE,
} from "@/routes";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const user = req.auth ? req.auth.user : null;
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-url", req.url);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isOnboardingRoute = nextUrl.pathname.startsWith(
    DEFAULT_ONBOARDING_ROUTE
  );
  const isLoginRoute = nextUrl.pathname.startsWith(DEFAULT_LOGIN_ROUTE);

  if (isApiAuthRoute) {
    return;
  }
  if (
    isLoggedIn &&
    !isOnboardingRoute &&
    (!user?.name || !user?.surname || !user?.username)
  ) {
    return Response.redirect(new URL(DEFAULT_ONBOARDING_ROUTE, nextUrl), 302);
  }
  if (user?.name && user?.surname && user?.username && isOnboardingRoute) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl), 302);
  }
  /*   if (isLoggedIn && isLoginRoute) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl), 302);
  } */
  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};

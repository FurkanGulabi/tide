const authRoutes = ["/auth", "/auth/onboarding"];
const publicRoutes = ["/"];
const privateRoutes = ["/dashboard"];
const apiAuthPrefix = "/api/auth";

const DEFAULT_LOGIN_REDIRECT = "/";
const DEFAULT_BASE_PAGE = "/";
const DEFAULT_LOGOUT_REDIRECT = "/";
const DEFAULT_LOGIN_ROUTE = "/auth";
const DEFAULT_ONBOARDING_ROUTE = "/auth/onboarding";

export {
  authRoutes,
  publicRoutes,
  privateRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_LOGOUT_REDIRECT,
  DEFAULT_LOGIN_ROUTE,
  DEFAULT_ONBOARDING_ROUTE,
  DEFAULT_BASE_PAGE,
};

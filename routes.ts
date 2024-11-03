/**
 * @file Defines route constants used across the application for managing public, private, and auth-related routes.
 */

/**
 * @constant {string[]} authRoutes - Defines routes related to authentication and user onboarding.
 * @example
 * ["/auth", "/auth/onboarding"]
 */
const authRoutes: string[] = ["/auth", "/auth/onboarding"];

/**
 * @constant {string[]} publicRoutes - Routes that are publicly accessible without authentication.
 * @example
 * ["/"]
 */
const publicRoutes: string[] = ["/"];

/**
 * @constant {string[]} privateRoutes - Protected routes that require user authentication.
 * @example
 * ["/dashboard"]
 */
const privateRoutes: string[] = ["/dashboard", "/create-post"];

/**
 * @constant {string} apiAuthPrefix - Prefix for API routes related to authentication.
 * @example
 * "/api/auth"
 */
const apiAuthPrefix: string = "/api/auth";

/**
 * @constant {string} DEFAULT_LOGIN_REDIRECT - Default route where users are redirected after logging in.
 * @example
 * "/"
 */
const DEFAULT_LOGIN_REDIRECT: string = "/";

/**
 * @constant {string} DEFAULT_BASE_PAGE - The base or home page of the application.
 * @example
 * "/"
 */
const DEFAULT_BASE_PAGE: string = "/";

/**
 * @constant {string} DEFAULT_LOGOUT_REDIRECT - Route where users are redirected after logging out.
 * @example
 * "/"
 */
const DEFAULT_LOGOUT_REDIRECT: string = "/";

/**
 * @constant {string} DEFAULT_LOGIN_ROUTE - Route for the login page.
 * @example
 * "/auth"
 */
const DEFAULT_LOGIN_ROUTE: string = "/auth";

/**
 * @constant {string} DEFAULT_ONBOARDING_ROUTE - Route for the user onboarding page.
 * @example
 * "/auth/onboarding"
 */
const DEFAULT_ONBOARDING_ROUTE: string = "/auth/onboarding";

// Exporting constants for use across the application
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

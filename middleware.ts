import { auth } from "@/auth";

// Middleware for handling authentication and redirection logic
export default auth((req) => {});

// Middleware config: define the matcher to exclude certain file types (assets, etc.)
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};

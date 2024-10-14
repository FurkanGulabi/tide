import { auth } from "@/auth";
import type { ReactNode } from "react";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider = async ({ children }: SessionProviderProps) => {
  const sesion = await auth();
  return (
    <NextAuthSessionProvider session={sesion}>
      {children}
    </NextAuthSessionProvider>
  );
};

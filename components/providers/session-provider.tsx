import { auth } from "@/auth";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider = async ({ children }: SessionProviderProps) => {
  const sesion = await auth();
  const filteredSession = {
    user: {
      name: sesion?.user.name,
      email: sesion?.user.email,
      image: sesion?.user.image,
      username: sesion?.user.username,
    },
    expires: sesion?.expires ?? "",
  };
  return (
    <NextAuthSessionProvider session={filteredSession}>
      {children}
    </NextAuthSessionProvider>
  );
};

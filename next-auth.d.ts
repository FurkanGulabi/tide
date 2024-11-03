import { type DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      name: string | null | undefined;
      surname: string | null | undefined;
      username: string | null | undefined;
      email: string;
      emailVerified: Date | null | undefined;
      image: string | null | undefined;
      createdAt: Date;
      updatedAt: Date;
    } & DefaultUser;
  }
  interface User extends DefaultUser {
    id: string;
    name: string | null | undefined;
    surname: string | null | undefined;
    username: string | null | undefined;
    email: string;
    emailVerified: Date | null | undefined;
    image: string | null | undefined;
    createdAt: Date;
    updatedAt: Date;
  }
}

export type ExtendedUser = DefaultSession["user"];

import prisma from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import cyrpto from "crypto";
import NextAuth, { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { html, text } from "./lib/auth/EmailUtils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/",
    signOut: "/auth/",
    error: "/auth/",
    verifyRequest: "/auth/",
    newUser: "/auth/onboarding",
  },
  adapter: PrismaAdapter(prisma) as NextAuthConfig["adapter"],
  useSecureCookies: process.env.NODE_ENV === "production",

  providers: [
    GitHub({
      allowDangerousEmailAccountLinking: true,
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      allowDangerousEmailAccountLinking: true,
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Resend({
      from: process.env.RESEND_EMAIL_FROM,
      async generateVerificationToken() {
        const token = cyrpto.randomBytes(32).toString("hex");
        return token;
      },
      normalizeIdentifier(identifier: string) {
        const parts = identifier.toLowerCase().trim().split("@");
        const local = parts[0].trim();

        let domain = parts[1].split(",")[0].trim();
        domain = domain.split(",")[0];

        if (parts.length !== 2) {
          throw new Error(
            "Invalid identifier format. It should contain exactly one '@' symbol."
          );
        }

        return `${local}@${domain}`;
      },
      async sendVerificationRequest(params) {
        const { identifier: to, provider, url } = params;
        const { host } = new URL(url);

        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${provider.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: provider.from,
            to,
            subject: `Sign in to ${host}`,
            html: html({ url, host }),
            text: text({ url, host }),
          }),
        });
        if (!res.ok) {
          throw new Error("Resend error: " + JSON.stringify(await res.json()));
        }
      },
    }),
  ],
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 0,
    generateSessionToken: () => {
      const token = cyrpto.randomBytes(32).toString("hex");
      return token;
    },
  },

  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },

    async signIn() {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        return false;
      }
    },

    async session({ session, user }) {
      // add client side details
      session.user.id = user.id;
      session.user.name = user.name;
      session.user.surname = user.surname;
      session.user.username = user.username;
      session.user.email = user.email;
      session.user.emailVerified = user.emailVerified;
      session.user.image = user.image;
      session.user.createdAt = user.createdAt;
      session.user.updatedAt = user.updatedAt;
      return session;
    },
  },
});

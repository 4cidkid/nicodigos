import { NextAuthConfig, Session } from "next-auth";
import authConstants from "@/constants/auth.constants";
import { googleProvider } from "./google.config";
import { prismaAdapter } from "@/lib/auth/authPrisma";
import { credentialsProvider } from "./credentials.config";
import { v4 } from "uuid";
import { Adapter } from "next-auth/adapters";
export const nextAuthConfig: NextAuthConfig = {
  adapter: prismaAdapter as Adapter,
  providers: [googleProvider, credentialsProvider],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ user }) {
      // Override default jwt callback behavior.
      // Create a session instead and then return that session token for use in the
      // `jwt.encode` callback below.
      if (user.id) {
        const session = await prismaAdapter.createSession?.({
          expires: new Date(Date.now() + authConstants.SESSION_MAX_AGE * 1000),
          sessionToken: v4(),
          userId: user.id,
        });

        return { id: session?.sessionToken };
      }
      return null;
    },
    async session({ session: defaultSession, user }) {
      // Make our own custom session object.
      const session: Session = {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image,
          email: user.email,
          locale: user.locale,
        },
        expires: defaultSession.expires,
      };

      return session;
    },
  },
  jwt: {
    async encode({ token }) {
      // This is the string returned from the `jwt` callback above.
      // It represents the session token that will be set in the browser.
      return token?.id as unknown as string;
    },
    async decode() {
      // Disable default JWT decoding.
      // This method is really only used when using the email provider.
      return null;
    },
  },
  session: {
    strategy: "database",
    maxAge: authConstants.SESSION_MAX_AGE,
    generateSessionToken: () => v4(),
  },
};

import NextAuth from "next-auth";
import { nextAuthConfig } from "./config/auth/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth(nextAuthConfig);
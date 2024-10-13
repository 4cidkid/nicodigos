// next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";
import { Session as NextAuthSession } from "next-auth";
declare module "next-auth" {

  interface User {
    id: PrismUser["id"];
    firstName: PrismUser["firstName"];
    lastName: PrismUser["lastName"];
    image: PrismUser["image"];
    email: PrismUser["email"];
    locale: PrismUser["locale"];
  }

  interface Session extends NextAuthSession {
    user: User;
  }



  interface AdapterUser {
    id: PrismUser["id"];
    firstName: PrismUser["firstName"];
    lastName: PrismUser["lastName"];
    image: PrismUser["image"];
    email: PrismUser["email"];
    locale: PrismUser["locale"];
  }
}

import secrets from "@/secrets";
import Google from "next-auth/providers/google";

export const googleProvider = Google({
  clientId: secrets.GOOGLE_CLIENT_ID,
  clientSecret: secrets.GOOGLE_CLIENT_SECRET,
});

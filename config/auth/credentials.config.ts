import { CustomNextAuthError } from "@/errors/auth.errors";
import { prisma } from "@/lib/prisma/prisma";
import Credentials from "next-auth/providers/credentials";
import { compareSync } from "bcryptjs";

export const credentialsProvider = Credentials({
  type: "credentials",
  id: "credentials",
  name: "credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  authorize: async (credentials) => {
    if (!credentials) {
      throw new CustomNextAuthError("No credentials were provided");
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: credentials.email as string },
          { username: credentials.email as string },
        ],
      },
    });

    if (!user || !user.password) {
      throw new CustomNextAuthError("Your password or email is incorrect");
    }

    const isValid = compareSync(credentials.password as string, user.password);

    if (!isValid) {
      throw new CustomNextAuthError("Your password or email is incorrect");
    }

    return {
      name: user.name,
      username: user.username,
      email: user.email,
      id: user.id,
      locale: user.locale,
    };
  },
});


import { CustomNextAuthError } from "@/errors/auth.errors";
import { prisma } from "@/lib/prisma/prisma";
import Credentials from "next-auth/providers/credentials";
import { compareSync } from "bcryptjs";
import isEmail from "validator/lib/isEmail";
export const credentialsProvider = Credentials({
  type: "credentials",
  id: "credentials",
  name: "credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  authorize: async (credentials) => {
    if (
      !credentials ||
      !credentials.email ||
      !credentials.password ||
      !isEmail(credentials.email as string)
    ) {
      throw new CustomNextAuthError(
        "You need to provide a valid email and password"
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        email: credentials.email as string,
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
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      email: user.email,
      id: user.id,
      locale: user.locale,
    };
  },
});

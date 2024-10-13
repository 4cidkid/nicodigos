"use server";
import { signIn } from "@/auth";
import { CustomNextAuthError } from "@/errors/auth.errors";
import { prisma } from "@/lib/prisma/prisma";
import bcrypt from "bcryptjs";

const submitUserAction = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const hashedPassword = await bcrypt.hash(password as string, 10);

    await prisma.user.create({
      data: {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email,
        password: hashedPassword,
      },
    });

    return { result: "User created", error: null };
  } catch {
    return { result: null, error: "Error trying to create your user" };
  }
};

const loginUserAction = async (formData: FormData) => {
  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });
    return { result: "User logged in", error: null };
  } catch (e) {
    const eIsFromNextAuth =
      e instanceof CustomNextAuthError ? e.message : "There was an error!";
    return { result: null, error: eIsFromNextAuth };
  }
};

export { submitUserAction, loginUserAction };

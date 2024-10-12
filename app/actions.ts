"use server";
import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma/prisma";
import bcrypt from "bcryptjs";

const submitUserAction = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const hashedPassword = await bcrypt.hash(password as string, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return { result: "User created", error: null };
  } catch (e: any) {
    return { result: null, error: e.message };
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
  } catch (e: any) {
    return { result: null, error: e.message };
  }
};

export { submitUserAction, loginUserAction };

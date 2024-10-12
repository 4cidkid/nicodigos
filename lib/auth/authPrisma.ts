import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../prisma/prisma";

export const prismaAdapter = PrismaAdapter(prisma);

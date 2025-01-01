import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient | undefined;
    }
  }
}

let prisma: unknown;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  const globalNodeJS = global as unknown as NodeJS.Global;
  if (!globalNodeJS.prisma) {
    globalNodeJS.prisma = new PrismaClient();
  }
  prisma = globalNodeJS.prisma;
}
export default prisma;
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { PrismaClient } from "../../generated/prisma/client";
import { logger } from "../log/logger";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });

const prismaClient = new PrismaClient({
  adapter,
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "info", "warn", "error"]
      : ["error"],
});
if (process.env.NODE_ENV === "development") {
  logger.success(`🐘 [Prisma & Database] Client initialized successfully`, {
    hasClient: !!prismaClient,
    hasAdapter: !!adapter,
  });
}

export { prismaClient };

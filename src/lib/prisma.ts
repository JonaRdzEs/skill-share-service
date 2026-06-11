import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { envs } from "../constants";

const adapter = new PrismaPg({ connectionString: envs.dbUrl });
const prisma = new PrismaClient({ adapter });

export { prisma };
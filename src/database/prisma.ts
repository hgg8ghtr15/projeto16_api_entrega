// import { PrismaClient } from "@/generated/prisma/client";
import { PrismaClient } from "../generated/prisma/client";
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from "../../env";

const pool = new Pool({ connectionString: env.DATABASE_URL });
const adapter = new PrismaPg(pool as any);

export const prisma = new PrismaClient({
    adapter,
    log: env.NODE_ENV === "development" ? ["query"] : []
});

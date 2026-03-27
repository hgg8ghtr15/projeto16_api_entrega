import { z } from "zod";

const envSchema = z.object({
    DATABASE_URL: z.url(),
    JWT_SECRET: z.string(),
    JWT_EXPIRES_IN: z.string(),
});

export const env = envSchema.parse(process.env);
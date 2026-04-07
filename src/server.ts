import { app } from "@/app";
import { env } from "../env"
import { prisma } from "./database/prisma";

const PORT = env.PORT;

const server = app.listen(PORT, () => {
    console.log(`Server executando em http://localhost:${PORT}`);
});

process.on("SIGTERM", () => {
    server.close(async () => {
        await prisma.$disconnect();
    });
});
import { PrismaClient } from "./src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Tentando limpar tabelas...");
    const dres = await prisma.delivery.deleteMany();
    console.log("Deliveries deletados:", dres.count);
    const ures = await prisma.user.deleteMany();
    console.log("Users deletados:", ures.count);
    console.log("Banco limpo com sucesso!");
  } catch (error) {
    console.error("ERRO NO BANCO:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

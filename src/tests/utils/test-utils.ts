import request from "supertest";
import { app } from "../../app";
import { prisma } from "../../database/prisma";

/**
 * Limpa todas as tabelas do banco de dados na ordem correta.
 */
export async function clearDatabase() {
    await prisma.deliveryLog.deleteMany();
    await prisma.delivery.deleteMany();
    await prisma.user.deleteMany();
}

/**
 * Cria um usuário através da rota /users e atualiza seu cargo se necessário.
 * Retorna o usuário criado.
 */
export async function createUser(
    name = "User Factory",
    email = "factory@example.com",
    password = "password123",
    role: "sale" | "customer" | "admin" = "customer"
) {
    const response = await request(app).post("/users").send({
        name,
        email,
        password,
    });

    if (role !== "customer") {
        await prisma.user.update({
            where: { email },
            data: { role }
        });
    }

    return {
        user: response.body.user,
        email,
        password
    };
}

/**
 * Cria um usuário através da rota /users, atualiza seu cargo diretamente no banco
 * e realiza o login para retornar o token de autenticação.
 */
export async function createAndAuthenticateUser(
    name = "User Factory",
    email = "factory@example.com",
    password = "password123",
    role: "sale" | "customer" | "admin" = "customer"
) {
    // 1. Criar o usuário via API
    await request(app).post("/users").send({
        name,
        email,
        password,
    });

    // 2. Atualizar o cargo no banco se não for o padrão
    if (role !== "customer") {
        await prisma.user.update({
            where: { email },
            data: { role }
        });
    }

    // 3. Fazer login para pegar o token e o usuário final
    const loginResponse = await request(app).post("/sessions").send({
        email,
        password,
    });

    const { token, user } = loginResponse.body;

    return {
        token,
        user,
        email,
        password
    };
}

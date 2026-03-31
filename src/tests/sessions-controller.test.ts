import request from "supertest";
import { app } from "../app";
import { clearDatabase, createUser } from "./utils/test-utils";

describe("Sessions Controller", () => {

    beforeAll(async () => {
        await clearDatabase()
    })

    it("Teste de criação de sessão", async () => {
        const { email, password } = await createUser("Usuário Teste Login", "teste_login@example.com", "password123")

        const response = await request(app).post("/sessions").send({
            email,
            password,
        });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Sessão criada com sucesso");

        // Buscamos dentro de .user porque é assim que o seu controller envia
        expect(response.body.user).toHaveProperty("id");
        expect(response.body.user.name).toBe("Usuário Teste Login");
        expect(response.body.user.email).toBe("teste_login@example.com");
        expect(response.body.user.role).toBe("customer");
        expect(response.body.token).toBeDefined()
        expect(response.body.token).toEqual(expect.any(String))

        // Garantimos que a senha NÃO foi retornada
        expect(response.body.user).not.toHaveProperty("password");
    });

    it("Teste de criação de sessão com email inválido", async () => {
        const response = await request(app).post("/sessions").send({
            email: "teste",
            password: "password123",
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Validation error");
        expect(response.body.issues.properties.email.errors[0]).toBe("O email informado é inválido");
    });

    it("Teste de criação de sessão com senha inválida", async () => {
        const response = await request(app).post("/sessions").send({
            email: "teste@example.com",
            password: "123",
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Validation error");
        expect(response.body.issues.properties.password.errors[0]).toBe("A senha deve ter pelo menos 6 caracteres");
    });
});
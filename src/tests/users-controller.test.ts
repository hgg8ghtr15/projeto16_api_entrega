import request from "supertest";
import { app } from "../app";
import { clearDatabase } from "./utils/test-utils";

describe("Users Controller", () => {
    afterAll(async () => {
        await clearDatabase();
    })

    beforeAll(async () => {
        await clearDatabase();
    })

    it("Teste de criação de usuário", async () => {
        const response = await request(app).post("/users").send({
            name: "Usuário Teste",
            email: "teste@example.com",
            password: "password123",
        });

        expect(response.status).toBe(201);

        // Buscamos dentro de .user porque é assim que o seu controller envia
        expect(response.body.user).toHaveProperty("id");
        expect(response.body.user.name).toBe("Usuário Teste");
        expect(response.body.user.email).toBe("teste@example.com");

        // Garantimos que a senha NÃO foi retornada
        expect(response.body.user).not.toHaveProperty("password");

        // Opcional: Validar a mensagem de sucesso
        expect(response.body.message).toBe("Usuário criado com sucesso");
    });

    it("Teste de criação de usuário com email já cadastrado", async () => {
        const response = await request(app).post("/users").send({
            name: "Usuário Teste",
            email: "teste@example.com",
            password: "password123",
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Email já cadastrado");
    });

    it("Teste validação de e-mail!", async () => {
        const response = await request(app).post("/users").send({
            name: "Usuário Teste",
            email: "teste",
            password: "password123",
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Validation error");
        expect(response.body.issues.properties.email.errors[0]).toBe("O email informado é inválido");
    });

    it("Teste validação nome deve ter pelo menos 3 caracteres", async () => {
        const response = await request(app).post("/users").send({
            name: "Us",
            email: "teste@example.com",
            password: "password123",
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Validation error");
        expect(response.body.issues.properties.name.errors[0]).toBe("O nome deve ter pelo menos 3 caracteres");
    });

    it("Teste validação senha deve ter pelo menos 6 caracteres", async () => {
        const response = await request(app).post("/users").send({
            name: "Usuário Teste",
            email: "teste@example.com",
            password: "123",
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Validation error");
        expect(response.body.issues.properties.password.errors[0]).toBe("A senha deve ter pelo menos 6 caracteres");
    });
});


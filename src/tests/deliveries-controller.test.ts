import request from "supertest";
import { app } from "../app";
import { clearDatabase, createAndAuthenticateUser, createUser } from "./utils/test-utils";

describe("Deliveries Controller", () => {
    let token: string;
    let recipientId: string;

    beforeAll(async () => {
        await clearDatabase();

        const sale = await createAndAuthenticateUser("Admin Sale", "sale@example.com", "password123", "sale");
        token = sale.token;

        const customer = await createUser("Customer Destinatário", "customer@example.com", "password123");
        recipientId = customer.user.id;
    });

    it("Deve ser possível criar uma nova entrega (Sucesso - Role Sale)", async () => {
        const response = await request(app)
            .post("/deliveries")
            .set("Authorization", `Bearer ${token}`)
            .send({
                user_id: recipientId,
                description: "Entrega de Computador Gamer",
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Pedido criado com sucesso");
        expect(response.body.pedido).toHaveProperty("id");
        expect(response.body.pedido.userId).toBe(recipientId);
        expect(response.body.pedido.status).toBe("processing");
    });

    it("Não deve ser possível criar uma entrega se o destinatário não existir", async () => {
        const response = await request(app)
            .post("/deliveries")
            .set("Authorization", `Bearer ${token}`)
            .send({
                user_id: "id-inexistente-12345",
                description: "Esta entrega deve falhar",
            });

        // O controller chama ensureUserExists que lança AppError("Usuario não encontrado", 404)
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Usuario não encontrado");
    });

    it("Deve ser possível listar todas as entregas", async () => {
        const response = await request(app)
            .get("/deliveries")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Pedidos listados com sucesso");
        expect(Array.isArray(response.body.deliveries)).toBe(true);
        
        if (response.body.deliveries.length > 0) {
            expect(response.body.deliveries[0]).toHaveProperty("user");
            expect(response.body.deliveries[0].user).toHaveProperty("name");
            expect(response.body.deliveries[0].user).toHaveProperty("email");
        }
    });

    it("Não deve permitir acesso às rotas de entrega para quem não tem perfil 'sale'", async () => {
        // Criamos um usuário customer e logamos com ele
        await request(app).post("/users").send({
            name: "Apenas Customer",
            email: "only-customer@example.com",
            password: "password123",
        });

        const loginCustomer = await request(app).post("/sessions").send({
            email: "only-customer@example.com",
            password: "password123",
        });
        const customerToken = loginCustomer.body.token;

        const response = await request(app)
            .get("/deliveries")
            .set("Authorization", `Bearer ${customerToken}`);

        // O middleware verifyUserAuthorization lança AppError("Usuário sem permissão!", 400)
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Usuário sem permissão!");
    });
});

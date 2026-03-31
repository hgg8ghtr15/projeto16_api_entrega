import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/database/prisma";
import { clearDatabase, createAndAuthenticateUser, createUser } from "./utils/test-utils";

describe("Deliveries Status Controller", () => {
    let token: string;
    let deliveryId: string;

    beforeAll(async () => {
        await clearDatabase();

        const sale = await createAndAuthenticateUser("Admin Status", "admin-status@example.com", "password123", "sale");
        token = sale.token;

        const customer = await createUser("Destinatário Log", "customer-log@example.com", "password123");
        const recipientId = customer.user.id;

        const deliveryResponse = await request(app)
            .post("/deliveries")
            .set("Authorization", `Bearer ${token}`)
            .send({
                user_id: recipientId,
                description: "Pacote para teste de status",
            });
        
        deliveryId = deliveryResponse.body.pedido.id;
    });

    it("Deve ser possível atualizar o status de uma entrega e gerar um log (Sucesso)", async () => {
        const response = await request(app)
            .patch(`/deliveries/${deliveryId}/status`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                status: "shipped",
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Status atualizado com sucesso");
        expect(response.body.delivery.status).toBe("shipped");

        // Validação direta no banco para o LOG
        const log = await prisma.deliveryLog.findFirst({
            where: {
                deliveryId: deliveryId,
                description: "Status atualizado para shipped"
            }
        });

        expect(log).toBeDefined();
        expect(log?.description).toBe("Status atualizado para shipped");
    });

    it("Não deve ser possível atualizar para um status inválido", async () => {
        const response = await request(app)
            .patch(`/deliveries/${deliveryId}/status`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                status: "waiting", // Status não existe no enum do Zod
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Validation error");
        expect(response.body.issues.properties.status.errors[0]).toBe("Status informado está incorreto.");
    });

    it("Não deve permitir que um usuário 'customer' atualize o status", async () => {
        // Login com o usuário customer criado no beforeAll
        const loginCustomer = await request(app).post("/sessions").send({
            email: "customer-log@example.com",
            password: "password123",
        });
        const customerToken = loginCustomer.body.token;

        const response = await request(app)
            .patch(`/deliveries/${deliveryId}/status`)
            .set("Authorization", `Bearer ${customerToken}`)
            .send({
                status: "delivered",
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Usuário sem permissão!");
    });
});

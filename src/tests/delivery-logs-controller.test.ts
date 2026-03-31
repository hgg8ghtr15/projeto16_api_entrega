import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/database/prisma";
import { clearDatabase, createAndAuthenticateUser } from "./utils/test-utils";

describe("Delivery Logs Controller", () => {
    let saleToken: string;
    let customerToken: string;
    let deliveryProcessingId: string;
    let deliveryShippedId: string;
    let deliveryDeliveredId: string;

    beforeAll(async () => {
        await clearDatabase();

        const sale = await createAndAuthenticateUser("Sale User", "sale-logs@example.com", "password123", "sale");
        saleToken = sale.token;

        const customer = await createAndAuthenticateUser("Customer User", "customer-logs@example.com", "password123", "customer");
        customerToken = customer.token;
        const customerId = customer.user.id;

        // 3. Criar entregas com estados diferentes
        // Processing
        const pRes = await prisma.delivery.create({
            data: { userId: customerId, description: "Entrega Processando", status: "processing" }
        });
        deliveryProcessingId = pRes.id;

        // Shipped
        const sRes = await prisma.delivery.create({
            data: { userId: customerId, description: "Entrega Enviada", status: "shipped" }
        });
        deliveryShippedId = sRes.id;

        // Delivered
        const dRes = await prisma.delivery.create({
            data: { userId: customerId, description: "Entrega Entregue", status: "delivered" }
        });
        deliveryDeliveredId = dRes.id;
    });

    it("Deve ser possível criar um log para uma entrega com status 'shipped' (Sale)", async () => {
        const response = await request(app)
            .post("/delivery-logs")
            .set("Authorization", `Bearer ${saleToken}`)
            .send({
                deliveryId: deliveryShippedId,
                description: "Motorista saiu para entrega",
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Log criado com sucesso");
        expect(response.body.log.description).toBe("Motorista saiu para entrega");
    });

    it("Não deve ser possível criar um log para uma entrega com status 'processing'", async () => {
        const response = await request(app)
            .post("/delivery-logs")
            .set("Authorization", `Bearer ${saleToken}`)
            .send({
                deliveryId: deliveryProcessingId,
                description: "Tentativa de log inválida",
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Produto ainda está em processamento!");
    });

    it("Não deve ser possível criar um log para uma entrega com status 'delivered'", async () => {
        const response = await request(app)
            .post("/delivery-logs")
            .set("Authorization", `Bearer ${saleToken}`)
            .send({
                deliveryId: deliveryDeliveredId,
                description: "Tentativa de log em produto entregue",
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Produto já foi entregue e não pode receber mais Logs!");
    });

    it("Não deve permitir que um 'customer' crie logs", async () => {
        const response = await request(app)
            .post("/delivery-logs")
            .set("Authorization", `Bearer ${customerToken}`)
            .send({
                deliveryId: deliveryShippedId,
                description: "Atacante tentando criar log",
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Usuário sem permissão!");
    });

    it("Deve ser possível listar todos os logs de todas as entregas (Sale)", async () => {
        const response = await request(app)
            .get("/delivery-logs")
            .set("Authorization", `Bearer ${saleToken}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Logs listados com sucesso");
        expect(Array.isArray(response.body.delivery)).toBe(true);
    });

    it("Deve ser possível visualizar os logs de uma entrega específica (Customer)", async () => {
        const response = await request(app)
            .get(`/delivery-logs/${deliveryShippedId}`)
            .set("Authorization", `Bearer ${customerToken}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Log listado com sucesso");
        expect(response.body.log.id).toBe(deliveryShippedId);
        expect(Array.isArray(response.body.log.deliveryLogs)).toBe(true);
    });
});

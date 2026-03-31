import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";
import { AppError } from "@/utils/AppError";

class DeliveryLogsController {

    async create(req: Request, res: Response) {
        const bodySchema = z.object({
            description: z.string(),
            deliveryId: z.string().min(5, "ID da entrega inválido"),
        });

        const { description, deliveryId } = bodySchema.parse(req.body);

        const delivery = await prisma.delivery.findUnique({
            where: {
                id: deliveryId,
            },
        });

        if (!delivery) {
            throw new AppError("Entrega não encontrada", 404);
        }

        if (delivery.status === "processing") {
            throw new AppError("Produto ainda está em processamento!", 400);
        }

        if (delivery.status === "delivered") {
            throw new AppError("Produto já foi entregue e não pode receber mais Logs!", 400);
        }

        const log = await prisma.deliveryLog.create({
            data: {
                description,
                deliveryId,
                createdAt: new Date(),
            },
        });

        return res.json({ message: "Log criado com sucesso", log });
    }

    async index(req: Request, res: Response) {
        const delivery = await prisma.delivery.findMany({
            include: {
                deliveryLogs: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                    }
                }
            },
        });
        return res.json({ message: "Logs listados com sucesso", delivery });
    }

    async show(req: Request, res: Response) {
        const paramsSchema = z.object({
            id: z.string().min(5, "ID da entrega inválido"),
        });

        const { id } = paramsSchema.parse(req.params);

        const log = await prisma.delivery.findUnique({
            where: {
                id,
            },
            include: {
                deliveryLogs: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                    }
                }
            },
        });
        return res.json({ message: "Log listado com sucesso", log });
    }
}

export { DeliveryLogsController };
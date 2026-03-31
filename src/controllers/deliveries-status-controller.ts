import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { z } from "zod";

class DeliveriesStatusController {
    async update(req: Request, res: Response) {
        const paramsSchema = z.object({
            id: z.string()
        });

        const bodySchema = z.object({
            status: z.enum(["processing", "shipped", "delivered"], "Status informado está incorreto."),
        });

        const { id } = paramsSchema.parse(req.params);
        const { status } = bodySchema.parse(req.body);

        const delivery = await prisma.delivery.update({
            data: {
                status,
            },
            where: {
                id,
            },
        });

        return res.json({ message: "Status atualizado com sucesso", delivery });
    }
}

export { DeliveriesStatusController };
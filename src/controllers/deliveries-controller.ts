import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";
import { ensureUserExists } from "./users-controllers";


class DeliveriesController {
  async create(req: Request, res: Response) {

    const bodySchema = z.object({
      user_id: z.string(),
      description: z.string(),
    })

    const { user_id, description } = bodySchema.parse(req.body)

    await ensureUserExists(user_id);

    const pedido = await prisma.delivery.create({
      data: {
        userId: user_id,
        description,
      }
    })

    return res.json({ message: "Pedido criado com sucesso", pedido })
  }

  async index(req: Request, res: Response) {
    const deliveries = await prisma.delivery.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    return res.json({ message: "Pedidos listados com sucesso", deliveries })
  }
}

export { DeliveriesController };
import { Request, Response } from "express";
import { z } from "zod";
import { hash } from "bcrypt";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

class UsersController {
    async create(req: Request, res: Response) {

        const bodySchema = z.object({
            name: z.string().trim().min(3, "O nome deve ter pelo menos 3 caracteres"),
            email: z.email("O email informado é inválido"),
            password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
        });
        const { name, email, password } = bodySchema.parse(req.body);

        const userExiste = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (userExiste) {
            throw new AppError("Email já cadastrado", 400);
        }

        const hashedPassword = await hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        })

        const { password: _, ...userWithoutPassword } = user;
        
        return res.status(201).json({ message: "Usuário criado com sucesso", user: userWithoutPassword });
    }

    async index(req: Request, res: Response) {

        return res.status(201).json({ message: "Usuarios listado com Sucesso" });
    }
}

export { UsersController };

import { Request, Response } from "express";
import { z } from "zod";
import { hash } from "bcrypt";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

async function ensureUserExists(id: string) {
    const user = await prisma.user.findUnique({
        where: { id }
    });

    if (!user) {
        throw new AppError("Usuario não encontrado", 404);
    }

    return user;
}

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
        const users = await prisma.user.findMany();

        const usersWithoutPassword = users.map(({ password: _, ...user }) => user);

        return res.status(200).json({ message: "Usuarios listado com Sucesso", users: usersWithoutPassword });
    }

    async editPerfil(req: Request, res: Response) {
        const id = req.params.id as string;

        const bodySchema = z.object({
            role: z.enum(["sale", "customer", "admin"], "Perfil inválido"),
        });

        const { role } = bodySchema.parse(req.body);

        await ensureUserExists(id);

        const user = await prisma.user.update({
            where: {
                id
            },
            data: {
                role
            }
        })

        const { password: _, ...userWithoutPassword } = user;

        return res.status(200).json({ message: "Usuario atualizado com sucesso", user: userWithoutPassword });
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id as string;

        await ensureUserExists(id);

        await prisma.user.delete({
            where: {
                id
            }
        })

        return res.status(200).json({ message: "Usuario deletado com sucesso" });
    }
}

export { UsersController };

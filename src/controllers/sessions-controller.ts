import { Request, Response } from "express";
import { z } from "zod"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { auth } from "@/config/auth";

class SessionsController {
  async create(req: Request, res: Response) {

    const bodySchema = z.object({
      email: z.email("O email informado é inválido"),
      password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    });

    const { email, password } = bodySchema.parse(req.body);
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })
    if (!user) {
      throw new AppError("Usuário ou senha não encontrados.", 404);
    }

    const senhaValida = await compare(password, user.password);

    if (!senhaValida) {
      throw new AppError("Usuário ou senha não encontrados.", 404);
    }

    const { secret, expiresIn } = auth.jwt;

    const token = sign({ role: user.role ?? "customer" }, secret, {
      subject: user.id,
      expiresIn: expiresIn as any
    })

    const { password: _, ...userWithoutPassword } = user;
    return res.status(201).json({ token, user: userWithoutPassword });
  }
}

export { SessionsController };
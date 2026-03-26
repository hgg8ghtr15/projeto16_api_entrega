import { Request, Response } from "express";

class UsersController {
    async create(req: Request, res: Response) {

        const { name, email, password } = req.body;

        return res.status(201).json({ message: "Usuário criado com sucesso", user: { name, email, password } });
    }

    async index(req: Request, res: Response) {

        return res.status(201).json({ message: "Usuarios listado com Sucesso" });
    }
}

export { UsersController };

import e, { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { auth } from "@/config/auth";
import { AppError } from "@/utils/AppError";

interface TokenPayload {
    sub: string;
    role: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token não informado", 401);
    }

    const [, token] = authHeader.split(" ");


    try {
        const { role, sub: user_id } = verify(token, auth.jwt.secret) as TokenPayload;

        req.user = {
            id: user_id,
            role
        }

        next();

    } catch {
        throw new AppError("Token inválido", 401);
    }
}


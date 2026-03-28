import { AppError } from "@/utils/AppError"
import { NextFunction, Request, Response } from "express"

function verifyUserAuthorization(role: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!request.user) {
      throw new AppError("Usuário sem permissão!")
    }

    if (!role.includes(request.user.role)) {
      throw new AppError("Usuário sem permissão!")
    }

    return next()
  }
}

export { verifyUserAuthorization }
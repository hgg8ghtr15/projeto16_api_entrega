import { Router } from "express";

import { UsersController } from "@/controllers/users-controllers";

const userRoutes = Router();
const usersController = new UsersController();

userRoutes.post("/", usersController.create);
userRoutes.get("/", usersController.index);
userRoutes.put("/:id", usersController.editPerfil);
userRoutes.delete("/:id", usersController.delete);

export { userRoutes };

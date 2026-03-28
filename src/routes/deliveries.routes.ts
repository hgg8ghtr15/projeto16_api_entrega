import { Router } from "express";

import { DeliveriesController } from "@/controllers/deliveries-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const deliveriesController = new DeliveriesController()
const deliveriesRoutes = Router()

deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["sale"]))
deliveriesRoutes.post("/", deliveriesController.create)

export { deliveriesRoutes }
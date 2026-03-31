import { Router } from "express";

import { DeliveryLogsController } from "@/controllers/delivery-logs-controller";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const deliveryLogsRoutes = Router();
const deliveryLogsController = new DeliveryLogsController();


deliveryLogsRoutes.use(ensureAuthenticated, verifyUserAuthorization(["sale"]))
deliveryLogsRoutes.post(
    "/",
    deliveryLogsController.create);


deliveryLogsRoutes.get(
    "/:id",
    ensureAuthenticated,
    verifyUserAuthorization(["sale", "customer"]),
    deliveryLogsController.show);

deliveryLogsRoutes.get(
    "/",
    ensureAuthenticated,
    verifyUserAuthorization(["sale", "customer"]),
    deliveryLogsController.index);

export { deliveryLogsRoutes };
import { Router } from "express";

import { userRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { deliveriesRoutes } from "./deliveries.routes"
import { deliveryLogsRoutes } from "./delivery-logs-routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/sessions", sessionsRoutes);
router.use("/deliveries", deliveriesRoutes);
router.use("/delivery-logs", deliveryLogsRoutes);

export { router };


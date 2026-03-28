import { Router } from "express";

import { userRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { deliveriesRoutes } from "./deliveries.routes"

const router = Router();

router.use("/users", userRoutes);
router.use("/sessions", sessionsRoutes);
router.use("/deliveries", deliveriesRoutes);

export { router };


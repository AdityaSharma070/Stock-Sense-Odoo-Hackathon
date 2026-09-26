import { Router } from "express";
import {
  getDeliveries,
  createDelivery,
  getDeliveryById,
  validateDelivery,
} from "../controllers/delivery.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/role.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getDeliveries);
router.route("/").post(createDelivery);
router.route("/:id").get(getDeliveryById);
router.route("/:id/validate").put(verifyRole("manager"), validateDelivery);

export default router;
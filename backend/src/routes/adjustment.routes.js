import { Router } from "express";
import {
  getAdjustments,
  createAdjustment,
  getAdjustmentById,
} from "../controllers/adjustment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/role.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getAdjustments);
router.route("/").post(verifyRole("manager"), createAdjustment);
router.route("/:id").get(getAdjustmentById);

export default router;
import { Router } from "express";
import {
  getWarehouses,
  createWarehouse,
  updateWarehouse,
} from "../controllers/warehouse.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/role.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getWarehouses);
router.route("/").post(verifyRole("manager"), createWarehouse);
router.route("/:id").put(verifyRole("manager"), updateWarehouse);

export default router;
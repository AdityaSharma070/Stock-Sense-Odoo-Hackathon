import { Router } from "express";
import {
  getLocations,
  createLocation,
  updateLocation,
} from "../controllers/location.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/role.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getLocations);
router.route("/").post(verifyRole("manager"), createLocation);
router.route("/:id").put(verifyRole("manager"), updateLocation);

export default router;
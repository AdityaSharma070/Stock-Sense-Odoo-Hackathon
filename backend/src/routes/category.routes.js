import { Router } from "express";
import {
  getCategories,
  createCategory,
} from "../controllers/category.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/role.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getCategories);
router.route("/").post(verifyRole("manager"), createCategory);

export default router;
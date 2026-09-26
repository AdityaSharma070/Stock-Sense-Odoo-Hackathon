import { Router } from "express";
import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  getProductStock,
} from "../controllers/product.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/role.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getProducts);
router.route("/").post(verifyRole("manager"), createProduct);
router.route("/:id").get(getProductById);
router.route("/:id").put(verifyRole("manager"), updateProduct);
router.route("/:id/stock").get(getProductStock);

export default router;
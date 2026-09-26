import { Router } from "express";
import {
  getReceipts,
  createReceipt,
  getReceiptById,
  validateReceipt,
} from "../controllers/receipt.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/role.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getReceipts);
router.route("/").post(createReceipt);
router.route("/:id").get(getReceiptById);
router.route("/:id/validate").put(verifyRole("manager"), validateReceipt);

export default router;
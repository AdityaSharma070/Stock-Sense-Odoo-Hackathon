import { Router } from "express";
import { getMoveHistory } from "../controllers/moveHistory.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getMoveHistory);

export default router;
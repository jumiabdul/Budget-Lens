import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { createOrder, verifyPayment } from "../controllers/paymentController.js";

const router = Router();

router.post("/create-order", authenticateToken, createOrder);
router.post("/verify-payment", authenticateToken, verifyPayment);

export default router;
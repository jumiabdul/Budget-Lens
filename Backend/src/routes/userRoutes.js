import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { changePassword, getUser, loginUser, logoutUser, registerUser } from "../controllers/authController.js";

const router = Router();

//Sign-up User
router.post("/register-user", registerUser);

//Login User
router.post("/login-user", loginUser);

// Get User
router.get("/get-user", authenticateToken, getUser);

router.post("/logout-user", authenticateToken, logoutUser);
router.put("/change-password", authenticateToken, changePassword);


export default router;
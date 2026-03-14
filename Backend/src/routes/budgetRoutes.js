import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { addBudget, deleteAllBudgets, deleteBudget, editBudget, getAllBudgets } from "../controllers/budgetController.js";

const router = Router();

//Get all budgets of logged in user
router.get("/get-all-budgets", authenticateToken, getAllBudgets);

//Adding budget
router.post("/add-budget", authenticateToken, addBudget);

//Editing budget details
router.put("/edit-budget/:id", authenticateToken, editBudget);

//Deleting budget
router.delete("/delete-budget/:id", authenticateToken, deleteBudget);

//Deleting all budgets
router.delete("/delete-all", authenticateToken, deleteAllBudgets);

export default router;
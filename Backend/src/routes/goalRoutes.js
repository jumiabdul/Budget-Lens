import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { goalSchema } from "../validators/goalValidator.js";
import { getAllGoals, addGoal, editGoal, deleteGoal, addMoneyToGoal, deleteAllGoals } from "../controllers/goalController.js";

const router = Router();

//Get all goals of logged in user
router.get("/get-all-goals", authenticateToken, getAllGoals);

//Adding goal
router.post("/add-goal", authenticateToken, validate(goalSchema), addGoal);

//Editing goal details
router.put("/edit-goal/:id", authenticateToken, validate(goalSchema), editGoal);

//Adding money to goal
router.put("/add-money/:id", authenticateToken, validate(addMoneySchema), addMoneyToGoal);

//Deleting goal
router.delete("/delete-goal/:id", authenticateToken, deleteGoal);

//Deleting all goals
router.delete("/delete-all", authenticateToken, deleteAllGoals);

export default router;

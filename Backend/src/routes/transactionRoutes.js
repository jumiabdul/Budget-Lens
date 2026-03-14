import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { addTransaction, deleteAllTransactions, deleteTransaction, editTransaction, getAllTransactions } from "../controllers/transactionController.js";

const router = Router();

//Get all transactions of logged in user
router.get("/get-all-transactions", authenticateToken, getAllTransactions);

//Adding transaction
router.post("/add-transaction", authenticateToken, addTransaction);

//Editing transaction details
router.put("/edit-transaction/:id", authenticateToken, editTransaction);

//Deleting transaction
router.delete("/delete-transaction/:id", authenticateToken, deleteTransaction);

//Deleting all transactions
router.delete("/delete-all", authenticateToken, deleteAllTransactions);

export default router;
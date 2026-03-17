import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { transactionSchema } from "../validators/transactionValidator.js";
import { addTransaction, deleteAllTransactions, deleteTransaction, editTransaction, getAllTransactions } from "../controllers/transactionController.js";

const router = Router();

//Get all transactions of logged in user
router.get("/get-all-transactions", authenticateToken, getAllTransactions);

//Adding transaction
router.post("/add-transaction", authenticateToken, validate(transactionSchema), addTransaction);

//Editing transaction details
router.put("/edit-transaction/:id", authenticateToken, validate(transactionSchema), editTransaction);

//Deleting transaction
router.delete("/delete-transaction/:id", authenticateToken, deleteTransaction);

//Deleting all transactions
router.delete("/delete-all", authenticateToken, deleteAllTransactions);

export default router;
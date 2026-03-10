import { Router } from "express";
import budgetModel from "../models/budgetModel.js"
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();

//Get all budgets of logged in user
router.get("/get-all-budgets", authenticateToken, async (req, res, next) => {
    try {
        const budgets = await budgetModel.find({ userId: req.user._id });
        res.status(200).json({ message: "All budgets fetched successfully", data: budgets, success: true })
    } catch (error) {
        next(error);
    }
});

//Adding budget
router.post("/add-budget", authenticateToken, async (req, res, next) => {
    const { category, amount, month, year } = req.body;
    //console.log({ category, amount, month, year });
    try {
        if (!category || !amount || !month || !year) {
            return res.status(400).json({ message: "All fields are required", success: false })
        }

        const budget = await budgetModel.create({
            category, amount, month, year,
            userId: req.user._id
        });
        res.status(201).json({ data: budget, message: "Budget created successfully...!!", success: true });

    } catch (error) {
        next(error);
    }
});

//Editing budget details
router.put("/edit-budget/:id", authenticateToken, async (req, res, next) => {
    try {
        const { category, amount, month, year } = req.body;
        const { id } = req.params;

        if (!category && !amount && !month && !year) {
            return res.status(400).json({ message: "No changes provided", success: false });
        }

        const budgetData = await budgetModel.findOneAndUpdate(
            { _id: id, userId: req.user._id },
            { category, amount, month, year },
            { returnDocument: "after" }
        );

        if (!budgetData) {
            return res.status(404).json({ message: "Budget not found", success: false });
        }
        res.json({ data: budgetData, message: "Budget updated successfully", success: true });

    } catch (error) {
        next(error);
    }
});

//Deleting budget
router.delete("/delete-budget/:id", authenticateToken, async (req, res, next) => {
    try {
        const budget = await budgetModel.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

        if (!budget) {
            return res.status(404).json({ message: "Budget not found", success: false });
        }
        res.json({ message: "Budget deleted successfully", success: true });

    } catch (error) {
        next(error);
    }
});

//Deleting all budgets
router.delete("/delete-all", authenticateToken, async (req, res, next) => {
    try {
        await budgetModel.deleteMany({ userId: req.user._id });
        res.json({ success: true, message: "All budgets deleted" });
    } catch (error) {
        next(error);
    }
});

export default router;
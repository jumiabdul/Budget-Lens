import budgetModel from "../models/budgetModel.js"

// Get All
export const getAllBudgets = async (req, res, next) => {
    try {
        const budgets = await budgetModel.find({ userId: req.user._id });
        res.status(200).json({ message: "All budgets fetched successfully", data: budgets, success: true })
    } catch (error) {
        next(error);
    }
}

// Add
export const addBudget = async (req, res, next) => {
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
}

// Edit
export const editBudget = async (req, res, next) => {
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
}

// Delete
export const deleteBudget = async (req, res, next) => {
    try {
        const budget = await budgetModel.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

        if (!budget) {
            return res.status(404).json({ message: "Budget not found", success: false });
        }
        res.json({ message: "Budget deleted successfully", success: true });

    } catch (error) {
        next(error);
    }
}

// Delete All
export const deleteAllBudgets = async (req, res, next) => {
    try {
        await budgetModel.deleteMany({ userId: req.user._id });
        res.json({ success: true, message: "All budgets deleted" });
    } catch (error) {
        next(error);
    }
}
import goalModel from "../models/goalModel.js"
import transactionModel from "../models/transactionModel.js";

// Get all
export const getAllGoals = async (req, res, next) => {
    try {
        const goals = await goalModel.find({ userId: req.user._id });
        res.status(200).json({ message: "All goals fetched successfully", data: goals, success: true })
    } catch (error) {
        next(error);
    }
};

// Add
export const addGoal = async (req, res, next) => {
    try {
        const { title, targetAmount, savedAmount, deadline, icon, category } = req.body;

        if (!title || !targetAmount || !savedAmount || !deadline) {
            return res.status(400).json({ message: "All fields are required", success: false })
        }

        const goal = await goalModel.create({
            title, targetAmount,
            savedAmount: savedAmount || 0,
            deadline, icon, category,
            userId: req.user._id
        });
        res.status(201).json({ data: goal, message: "Goal created successfully...!!", success: true });
    } catch (error) {
        next(error);
    }
};

// Edit
export const editGoal = async (req, res, next) => {
    try {
        const { title, targetAmount, savedAmount, deadline, icon, category } = req.body;
        const { id } = req.params;

        if (!title && !targetAmount && !savedAmount && !deadline && !icon && !category) {
            return res.status(400).json({ message: "No changes provided", success: false });
        }

        const goalData = await goalModel.findOneAndUpdate(
            { _id: id, userId: req.user._id },
            { title, targetAmount, savedAmount, deadline, icon, category },
            { returnDocument: "after" }
        );

        if (!goalData) {
            return res.status(404).json({ message: "Goal not found", success: false });
        }
        res.json({ data: goalData, message: "Goal updated successfully", success: true });
    } catch (error) {
        next(error);
    }
};

// Delete
export const deleteGoal = async (req, res, next) => {
    try {
        const goal = await goalModel.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

        if (!goal) {
            return res.status(404).json({ message: "Goal not found", success: false });
        }
        res.json({ message: "Goal deleted successfully", success: true });
    } catch (error) {
        next(error);
    }
};

// Add money to goal 
export const addMoneyToGoal = async (req, res, next) => {
    const { id } = req.params;
    const { amount } = req.body;
    try {
        if (!amount || Number(amount) <= 0) {
            return res.status(400).json({ message: "Valid amount is required", success: false });
        }

        const goal = await goalModel.findOne({ _id: id, userId: req.user._id });
        if (!goal) {
            return res.status(404).json({ message: "Goal not found", success: false });
        }

        // Update goal progress
        goal.savedAmount = Math.min(
            goal.savedAmount + Number(amount),
            goal.targetAmount // can't exceed target
        );
        await goal.save();

        // Create expense transaction
        const transaction = await transactionModel.create({
            userId: req.user._id,
            type: "expense",
            category: "Savings",
            amount: Number(amount),  // Negative because it's money going out
            description: `Saved towards "${goal.title}"`,
            date: new Date(),
            goalId: id  // Link to goal
        });

        return res.json({ data: { goal, transaction }, message: "Amount added and transaction recorded!", success: true });
    } catch (error) {
        next(error);
    }
};

// Delete All
export const deleteAllGoals = async (req, res, next) => {
    try {
        await goalModel.deleteMany({ userId: req.user._id });
        res.json({ success: true, message: "All Goals deleted" });
    } catch (error) {
        next(error);
    }
}


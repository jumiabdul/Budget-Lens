import transactionModel from "../models/transactionModel.js"

// Get All
export const getAllTransactions = async (req, res, next) => {
    try {
        const transactions = await transactionModel.find({ userId: req.user._id });
        res.status(200).json({ message: "All transactions fetched successfully", data: transactions, success: true })
    } catch (error) {
        next(error);
    }
}

// Add
export const addTransaction = async (req, res, next) => {
    const { type, category, amount, date, mode, description } = req.body;
    //console.log({ type, category, amount, date, mode, description});
    try {
        if (!type || !category || !amount || !date || !mode) {
            return res.status(400).json({ message: "All fields are required", success: false })
        }

        const transaction = await transactionModel.create({
            type, category, amount, date, mode, description,
            userId: req.user._id
        });
        res.status(201).json({ data: transaction, message: "Transaction created successfully...!!", success: true });

    } catch (error) {
        next(error);
    }
}

// Edit
export const editTransaction = async (req, res, next) => {
    try {
        const { type, category, amount, date, mode, description } = req.body;
        const { id } = req.params;

        if (!type && !category && !amount && !date && !mode && !description) {
            return res.status(400).json({ message: "No changes provided", success: false });
        }

        const transactionData = await transactionModel.findOneAndUpdate(
            { _id: id, userId: req.user._id },
            { type, category, amount, date, mode, description },
            { returnDocument: "after" }
        );

        if (!transactionData) {
            return res.status(404).json({ message: "Transaction not found", success: false });
        }
        res.json({ data: transactionData, message: "Transaction updated successfully", success: true });

    } catch (error) {
        next(error);
    }
}

// Delete
export const deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await transactionModel.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

        if (!transaction) {
            return res.status(404).json({ message: "Task not found", success: false });
        }
        res.json({ message: "Transaction deleted successfully", success: true });

    } catch (error) {
        next(error);
    }
}

// Delete All
export const deleteAllTransactions = async (req, res, next) => {
    try {
        await transactionModel.deleteMany({ userId: req.user._id });
        res.json({ success: true, message: "All transactions deleted" });
    } catch (error) {
        next(error);
    }
}
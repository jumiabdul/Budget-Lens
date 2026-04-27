import Joi from "joi";

export const transactionSchema = Joi.object({

    type: Joi.string().valid("income", "expense").required()
        .messages({
            "any.only": "Type must be income or expense",
            "any.required": "Type is required"
        }),

    category: Joi.string().valid(
        "Food", "Housing", "Savings", "Utilities", "Transport",
        "Healthcare", "Education", "Shopping", "Entertainment", "Miscellaneous",
        "Salary", "Investment", "Business", "Others"
    ).required()
        .messages({
            "any.only": "Invalid category",
            "any.required": "Category is required"
        }),

    amount: Joi.number().positive().max(10000000).required()
        .messages({
            "number.positive": "Amount must be positive",
            "number.max": "Amount is too large",
            "any.required": "Amount is required"
        }),

    date: Joi.date().required()
        .messages({ "any.required": "Date is required" }),

    mode: Joi.string().valid("Cash", "Card", "UPI", "NetBanking", "Cheque").required()
        .messages({
            "any.only": "Invalid payment mode",
            "any.required": "Mode is required"
        }),

    description: Joi.string().max(200).allow("").optional()
        .messages({ "string.max": "Note cannot exceed 200 characters" }),
});

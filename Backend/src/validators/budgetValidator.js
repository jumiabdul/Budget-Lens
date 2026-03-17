import Joi from "joi";

export const budgetSchema = Joi.object({

    category: Joi.string().valid(
        "Food", "Housing", "Savings", "Utilities", "Transport",
        "Healthcare", "Education", "Shopping", "Entertainment", "Miscellaneous"
    ).required()
        .messages({
            "any.only": "Invalid category",
            "any.required": "Category is required"
        }),

    amount: Joi.number().positive().max(10000000).required()
        .messages({
            "number.positive": "Amount must be positive",
            "any.required": "Amount is required"
        }),

    month: Joi.string().valid(
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ).optional()
        .messages({ "any.only": "Invalid month" }),

    year: Joi.string().pattern(/^[0-9]{4}$/).optional()
        .messages({ "string.pattern.base": "Invalid year format" }),
});

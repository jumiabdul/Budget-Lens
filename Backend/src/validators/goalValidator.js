import Joi from "joi";

export const goalSchema = Joi.object({
    title: Joi.string().min(2).max(100).required()
        .messages({
            "string.min": "Title must be at least 2 characters",
            "string.max": "Title cannot exceed 100 characters",
            "any.required": "Title is required"
        }),
    targetAmount: Joi.number().positive().max(100000000).required()
        .messages({
            "number.base": "Target amount must be a number",
            "number.positive": "Target amount must be positive",
            "number.max": "Target amount is too large",
            "any.required": "Target amount is required"
        }),
    savedAmount: Joi.number().min(0).optional()
        .messages({
            "number.min": "Saved amount cannot be negative"
        }),
    deadline: Joi.date().optional().allow("", null),
    category: Joi.string().max(50).optional().allow("", null),
    icon: Joi.string().max(10).optional().allow("", null),
});

export const addMoneySchema = Joi.object({
    amount: Joi.number().positive().required()
        .messages({
            "number.base": "Amount must be a number",
            "number.positive": "Amount must be positive",
            "any.required": "Amount is required"
        }),
});
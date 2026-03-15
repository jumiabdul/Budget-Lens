import mongoose, { Schema } from "mongoose";

const budgetSchema = new Schema({
    category: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    month: {
        type: String,
        required: true
    },

    year: {
        type: String,
        required: true,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
    { timestamps: true }
);

// Indexes
budgetSchema.index({ userId: 1 });                        // filter by user
budgetSchema.index({ userId: 1, month: 1, year: 1 });     // filter by month/year
budgetSchema.index({ userId: 1, category: 1 });           // filter by category

const budgetModel = mongoose.model("Budget", budgetSchema);

export default budgetModel;

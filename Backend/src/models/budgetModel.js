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

const budgetModel = mongoose.model("Budget", budgetSchema);

export default budgetModel;

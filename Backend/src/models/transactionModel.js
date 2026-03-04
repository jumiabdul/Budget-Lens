import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true
    },

    category: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    mode: {
        type: String,
        required: true,
        default: "Cash"
    },

    description: {
        type: String,
        default: ""
    },

    recurring: {
        type: Boolean,
        required: false
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
    { timestamps: true }
);

const transactionModel = mongoose.model("Transaction", transactionSchema);

export default transactionModel;

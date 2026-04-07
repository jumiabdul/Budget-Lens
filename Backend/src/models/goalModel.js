import mongoose, { Schema } from "mongoose";

const goalSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    targetAmount: {
        type: Number,
        required: true
    },
    savedAmount: {
        type: Number,
        default: 0
    },
    deadline: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: "🎯"
    },
    category: {
        type: String,
        default: "General"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
},
    { timestamps: true }
);

const goalModel = mongoose.model("Goal", goalSchema);

export default goalModel;

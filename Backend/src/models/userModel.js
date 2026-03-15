import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true, //unique handles index automatically
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});


const userModel = mongoose.model("User", userSchema);

export default userModel;

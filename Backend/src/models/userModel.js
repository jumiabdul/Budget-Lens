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
    
    // Admin Fields
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    // Active Status
    isActive: {
        type: Boolean,
        default: true
    },

    deactivatedAt: {
        type: Date,
        default: null
    },

    deactivationReason: {
        type: String,
        default: null
    },

    // Activity Tracking
    lastLogin: {
        type: Date,
        default: null
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }

});

const userModel = mongoose.model("User", userSchema);

export default userModel;

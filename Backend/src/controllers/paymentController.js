import Razorpay from "razorpay";
import crypto from "crypto";
import userModel from "../models/userModel.js";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order
export const createOrder = async (req, res, next) => {
    try {
        const options = {
            amount: 49900, // ₹499 in paise
            currency: "INR",
            receipt: `receipt_${req.user._id}`,
        };

        const order = await razorpay.orders.create(options);
        return res.json({
            success: true,
            order,
            key: process.env.RAZORPAY_KEY_ID,
            user: {
                name: req.user.name,
                email: req.user.email,
            }
        });
    } catch (error) {
        next(error);
    }
};

// Verify payment
export const verifyPayment = async (req, res, next) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Verify signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Invalid payment signature", success: false });
        }

        // Update user to premium
        await userModel.findByIdAndUpdate(req.user._id, {
            isPremium: true,
            premiumSince: new Date(),
        });

        return res.json({ success: true, message: "Payment verified! You are now Premium 🎉" });
    } catch (error) {
        next(error);
    }
};
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const authenticateToken = async (req, res, next) => {

    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: "No token provided", success: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);

        // Look up user by ID from token payload
        const user = await userModel.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        req.user = user; // attach full user document
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token not valid", success: false });
    }
};

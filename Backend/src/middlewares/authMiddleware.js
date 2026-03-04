import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const authenticateToken = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(400).json({ message: "Invalid token!!", success: false });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Look up user by ID from token payload
        const user = await userModel.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        req.user = user; // attach full user document
        next();
    } catch (err) {
        return res.status(403).json({ message: "Token not valid", success: false });
    }
};

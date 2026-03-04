import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const URI = process.env.MONGODB_URI;

export async function dbConnect() {
    try {
        await mongoose.connect(URI)
        console.log("Database connected successfully..!!")
    } catch (error) {
        console.error("Database connection failed due to:", error.message);
        process.exit(1);
    }
}
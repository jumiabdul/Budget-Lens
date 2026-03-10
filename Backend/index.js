import express from "express";
import userRoutes from "./src/routes/userRoutes.js";
import transactionRoutes from "./src/routes/transactionRoutes.js"
import budgetRoutes from "./src/routes/budgetRoutes.js"
import { dbConnect } from "./config/db.js";
import dotenv from "dotenv"
import cors from "cors"
import handleGenericErrors from "./src/middlewares/errorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
        //  methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

dbConnect();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("Budget-Lens Backend API is running...");
});

app.use(handleGenericErrors);

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
})

export default app;
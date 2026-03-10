import { Router } from "express";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { authenticateToken } from "../middlewares/authMiddleware.js";
import validator from "validator"

const router = Router();

//Sign-up User
router.post("/register-user", async (req, res, next) => {
    const { name, email, password } = req.body;
    console.log({ email, password, name });

    try {
        //validation
        if (!email || !password || !name) {
            return res.status(400).json({ message: "All fields are required", success: false })
        }
        if (!validator.isEmail(email)) {
            throw new Error("Email not valid...!!")
        }
        if (!validator.isStrongPassword(password)) {
            throw new Error("Strong Password required");
        }

        //check if user already exists
        const isAlreadyExisting = await userModel.exists({ email })
        if (isAlreadyExisting) {
            return res.status(400).json({ message: "User already exists", success: false })
        }

        //Hash the password
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt)

        //save user with hashed password
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword
        });

        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, { expiresIn: process.env.JWT_EXPIRE, });

        return res.json({ success: true, user, accessToken, message: "Registration Successful", });

    } catch (error) {
        next(error);
    }
});

//Login User
router.post("/login-user", async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password)

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password are required", success: false });
        }

        const userInfo = await userModel.findOne({ email })

        if (!userInfo) {
            return res.status(400).json({ message: "User not found!!", success: false })
        }

        const validPassword = await bcrypt.compare(password, userInfo.password);

        if (!validPassword) {
            return res.status(400).json({ message: "Invalid Credentials", success: false });
        }

        const accessToken = jwt.sign({ id: userInfo._id }, process.env.JWT_TOKEN, { expiresIn: process.env.JWT_EXPIRE, });

        return res.json({ success: true, message: "Login Successful", email, accessToken, });

    } catch (error) {
        next(error);
    }
});

// Get User
router.get("/get-user", authenticateToken, async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(400).json({ message: "User not found!!", success: false })
        }
        return res.json({ user, message: "User found successfully..!!", success: true });
    } catch (error) {
        next(error);
    }
});

export default router;
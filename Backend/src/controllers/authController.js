import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import validator from "validator";

// Register
export const registerUser = async (req, res, next) => {
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
            throw new Error("Password must contain a smallcase, an uppercase, a symbol and a number");
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

        res.cookie("token", accessToken, {
            httpOnly: true, // Prevents client-side JavaScript from reading the cookie
            secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
            maxAge: 3600000 // Cookie expires in 1 hour (in milliseconds)

        });

        return res.json({ success: true, user, accessToken, message: "Registration Successful", });

    } catch (error) {
        next(error);
    }
}

// Login
export const loginUser = async (req, res, next) => {
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

        res.cookie("token", accessToken, {
            httpOnly: true, // Prevents client-side JavaScript from reading the cookie
            secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
            maxAge: 3600000 // Cookie expires in 1 hour (in milliseconds)

        });

        return res.json({ success: true, message: "Login Successful", email, accessToken, });

    } catch (error) {
        next(error);
    }
}

// Get User
export const getUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(400).json({ message: "User not found!!", success: false })
        }
        return res.json({ user, message: "User found successfully..!!", success: true });
    } catch (error) {
        next(error);
    }
}

// Logout
export const logoutUser = (req, res) => {
    res.clearCookie("token", cookieOptions);
    return res.json({ success: true, message: "Logged out successfully" });
};

// Change Password
export const changePassword = async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;
    try {
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect", success: false });
        }

        if (!validator.isStrongPassword(newPassword)) {
            return res.status(400).json({ message: "New password must be strong", success: false });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        await userModel.findByIdAndUpdate(req.user._id, { password: hashedPassword });

        return res.json({ success: true, message: "Password changed successfully" });
    } catch (error) {
        next(error);
    }
};




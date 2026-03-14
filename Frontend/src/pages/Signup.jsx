import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast"

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agree, setAgree] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const newErrors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!name.trim()) {
            newErrors.name = "Full name is required";
        } else if (name.length < 3) {
            newErrors.name = "Name must be atleast 3 characters";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (emailRegex.test(email) === false) {
            newErrors.email = "Please provide proper valid email";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        } else if (password.length < 8) {
            newErrors.password = "Password must be atleast 8 characters";
        }

        if (confirmPassword !== password) {
            newErrors.confirmPassword = "Password do not match";
        }

        if (!agree) {
            newErrors.agree = "You must agree to terms and conditions before signup";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return

        try {
            setLoading(true);
            await axiosInstance.post("/users/register-user", { name, email, password });
            toast.success("Account created successfully! 🎉");

            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setAgree(false);
            setErrors({});
            navigate("/")

        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f0c29] via-[#1a1240] to-[#0a0f2c] px-4">

            <form
                onSubmit={handleRegister}
                className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 space-y-6 text-white">

                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold">
                        Create Account
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Manage your wealth in the dark.
                    </p>
                </div>

                {/* API Error */}
                {errors.api && (
                    <p className="text-red-400 text-sm text-center bg-red-500/10 rounded-xl p-3 mb-4">
                        {errors.api}
                    </p>
                )}

                {/* Full Name */}
                <div>
                    <label className="text-sm text-gray-300 block mb-1">
                        Full Name
                    </label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    />
                    {errors.name && (
                        <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="text-sm text-gray-300 block mb-1">
                        Email Address
                    </label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="name@example.com"
                        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    />
                    {errors.email && (
                        <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="text-sm text-gray-300 block mb-1">
                        Password
                    </label>
                    <div className="relative">

                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition text-sm">
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>

                    {errors.password && (
                        <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="text-sm text-gray-300 block mb-1">
                        Confirm Password
                    </label>
                    <div className="relative">

                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type={showConfirm ? "text" : "password"}
                            placeholder="Re-enter your password"
                            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition text-sm">
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>

                    {errors.confirmPassword && (
                        <p className="text-red-400 text-xs mt-1">
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>

                {/* Terms */}
                <div className="flex items-center space-x-2 text-sm">
                    <input
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        type="checkbox"
                        className="accent-emerald-400"
                    />
                    <label className="text-gray-300">
                        I agree to the terms and conditions
                    </label>
                </div>
                {
                    errors.agree && (
                        <p className="text-red-400 text-xs">{errors.agree}</p>
                    )
                }

                {/* Button */}
                <button
                    disabled={!agree || loading}
                    type="submit"
                    className="w-full py-3 rounded-xl font-semibold bg-linear-to-r from-[#00f5c4] to-[#8b5cf6] text-black transform hover:scale-105 cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-emerald-500/30 disabled:opacity-50" >
                    {loading ? "Creating account..." : "Sign Up →"}
                </button>

                {/* Login link */}
                <p className="text-center text-gray-400 text-sm">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/")}
                        className="text-emerald-400 cursor-pointer hover:underline" >
                        Sign in
                    </span>
                </p>
            </form >
        </div >
    );
}

export default Signup;
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in successfully!!")
        } catch (error) {
            console.log(error.message);
        }
        alert(`Login Successfull!\n Email : ${email}`)

        setEmail("");
        setPassword("");
        setErrors({});
        navigate("/dashboard")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f0c29] via-[#1a1240] to-[#0a0f2c] px-4">

            <div className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 text-white">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold">
                        Welcome Back
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">
                        Manage your wealth in the dark.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

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
                            <p className="text-red-400 text-xs mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm text-gray-300 block mb-1">
                            Password
                        </label>

                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Enter your password"
                            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                        />

                        {errors.password && (
                            <p className="text-red-400 text-xs mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl font-semibold bg-linear-to-r from-[#00f5c4] to-[#8b5cf6] text-black transform hover:scale-105 cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-emerald-500/30" >
                        Sign In →
                    </button>

                    {/* Create Account */}
                    <p className="text-center text-gray-400 text-sm">
                        Don't have an account?{" "}
                        <span
                            onClick={() => navigate("/signup")}
                            className="text-emerald-400 cursor-pointer hover:underline"
                        >
                            Create one
                        </span>
                    </p>

                </form>
            </div>
        </div>
    );
}

export default Login;
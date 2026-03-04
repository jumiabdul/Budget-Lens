import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore/lite";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agree, setAgree] = useState(false);
    const [errors, setErrors] = useState({});

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
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            console.log(user)
            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    fullName: name,
                });
            }
            console.log("User Registered Successfully !!")
        } catch (error) {
            console.log(error.message);
        }

        alert(`Signup Successfull!\n Email : ${email}`)

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAgree(false);
        setErrors({});
        navigate("/")
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
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Enter your password"
                        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    />
                    {errors.password && (
                        <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="text-sm text-gray-300 block mb-1">
                        Confirm Password
                    </label>
                    <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        placeholder="Re-enter your password"
                        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    />
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
                {errors.agree && (
                    <p className="text-red-400 text-xs">{errors.agree}</p>
                )}

                {/* Button */}
                <button
                    disabled={!agree}
                    type="submit"
                    className="w-full py-3 rounded-xl font-semibold bg-linear-to-r from-[#00f5c4] to-[#8b5cf6] text-black transform hover:scale-105 cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-emerald-500/30 disabled:opacity-50" >
                    Sign Up →
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
            </form>
        </div>
    );

}

export default Signup;
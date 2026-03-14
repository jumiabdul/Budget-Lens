import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { resetTransactions } from "../store/slices/transactionSlice";
import { resetBudgets } from "../store/slices/budgetSlice";
import toast from "react-hot-toast"

export default function Profile() {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    // Change password states
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passLoading, setPassLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Fetch user from MongoDB
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axiosInstance.get("/users/get-user");
                setUserDetails(res.data.user);
            } catch (err) {
                toast.error("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("All fields are required!"); return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!"); return;
        }
        if (newPassword === currentPassword) {
            toast.error("New password must be different!"); return;
        }
        try {
            setPassLoading(true);
            const res = await axiosInstance.put("/users/change-password", {
                currentPassword,
                newPassword,
            });
            toast.success(res.data.message || "Password changed! 🔐");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setShowForm(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to change password");
        } finally {
            setPassLoading(false);
        }
    };

    // Logout
    const handleLogout = async () => {
        try {
            await axiosInstance.post("/users/logout-user"); // clears cookie
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            localStorage.removeItem("token");
            dispatch(resetTransactions());
            dispatch(resetBudgets());
            toast.success("Logged out successfully!");
            navigate("/");
        }
    }

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f0c29]">
            <p className="text-gray-400"> 🔄 Loading...</p>
        </div>
    );

    return (
        <div className="min-h-screen flex justify-center items-center p-4 bg-linear-to-br from-[#0f0c29] via-[#1a1240] to-[#0a0f2c]">
            <div className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 text-white">
                <h1 className="text-3xl text-center font-bold bg-linear-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                    Profile</h1>

                {/* API Error */}
                {errors.api && (
                    <p className="text-red-400 text-sm text-center bg-red-500/10 rounded-xl p-3 mb-4">
                        {errors.api}
                    </p>
                )}

                {userDetails && (
                    <div>
                        <div className="space-y-6">
                            <div className="mt-5 flex justify-around items-center">
                                <span className="text-md text-gray-400 font-bold mr-3 ">Name</span>
                                <span className="text-md text-gray-400 ">{userDetails.name}</span>
                            </div>
                            <div className="flex justify-around items-center">
                                <span className="text-md text-gray-400 font-bold mr-3 ">Email address</span>
                                <span className="text-md text-gray-400 ">{userDetails.email}</span>
                            </div>
                        </div>

                        <div className="flex justify-around items-center">

                            <button type="submit"
                                onClick={() => setShowForm(!showForm)}
                                className=" mt-7 w-1/2 py-3 rounded-xl font-semibold bg-linear-to-r from-[#00f5c4] to-[#8b5cf6] text-black transform hover:scale-105 cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-emerald-500/30">
                                {showForm ? "Cancel" : "Change Password 🔐"}
                            </button>


                            <button type="submit" onClick={handleLogout}
                                className=" mt-7 w-1/3 py-3 rounded-xl font-semibold bg-linear-to-r from-[#00f5c4] to-[#8b5cf6] text-black transform hover:scale-105 cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-emerald-500/30">
                                Log Out 🚪
                            </button>

                        </div>
                    </div>
                )}
            </div>
            
            {/* Change Password Form */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="bg-[#1a1333] border border-purple-700/40 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl space-y-4 text-white">

                        {/* Modal Header */}
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold bg-linear-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                                Change Password 🔐
                            </h2>
                            <button onClick={() => setShowForm(false)}
                                className="text-gray-400 hover:text-white text-xl transition">✕</button>
                        </div>

                        {/* Current Password */}
                        <div>
                            <label className="text-sm text-gray-400 mb-1 block">Current Password</label>

                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Enter current password"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="text-sm text-gray-400 mb-1 block">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="text-sm text-gray-400 mb-1 block">Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        <p className="text-xs text-gray-500">
                            💡 8+ chars, uppercase, number and symbol required
                        </p>

                        <button
                            onClick={handleChangePassword}
                            disabled={passLoading}
                            className="w-full py-3 rounded-xl font-semibold bg-linear-to-r from-purple-500 to-indigo-500 text-white hover:scale-105 transition-all duration-300 disabled:opacity-50">
                            {passLoading ? "Changing..." : "Confirm Change 🔐"}
                        </button>

                    </div >
                </div>
            )
            }

        </div >
    )
}
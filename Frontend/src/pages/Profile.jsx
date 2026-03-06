import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { resetTransactions } from "../store/slices/transactionSlice";
import { resetBudgets } from "../store/slices/budgetSlice";

export default function Profile() {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Fetch user from MongoDB
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axiosInstance.get("/users/get-user");
                setUserDetails(res.data.user);
            } catch (err) {
                setErrors("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(resetTransactions());
        dispatch(resetBudgets());
        navigate("/");
    };

    return (
        <div className="min-h-screen flex justify-center items-center p-4 bg-linear-to-br from-[#0f0c29] via-[#1a1240] to-[#0a0f2c]">
            <div className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 text-white">
                <h1 className="text-3xl text-center font-bold bg-linear-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                    Profile</h1>

                {/* Error */}
                {errors && (
                    <p className="text-red-400 text-sm text-center bg-red-500/10 rounded-xl p-3">
                        {errors}
                    </p>
                )}

                {userDetails ? (
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
                                className=" mt-7 w-1/2 py-3 rounded-xl font-semibold bg-linear-to-r from-[#00f5c4] to-[#8b5cf6] text-black transform hover:scale-105 cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-emerald-500/30">
                                Change Password
                            </button>

                            <button type="submit" onClick={handleLogout}
                                className=" mt-7 w-1/3 py-3 rounded-xl font-semibold bg-linear-to-r from-[#00f5c4] to-[#8b5cf6] text-black transform hover:scale-105 cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-emerald-500/30">
                                Log Out
                            </button>

                        </div>
                    </div>
                ) : (<p className="mt-5 text-gray-400 text-center font-bold">Loading....</p>)}
            </div>
        </div >
    )
}
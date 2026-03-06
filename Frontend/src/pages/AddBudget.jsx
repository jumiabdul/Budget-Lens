import { useState } from "react"
import { useDispatch } from "react-redux"
import { addBudget } from "../store/slices/budgetSlice"
//import { v4 as uuidv4 } from "uuid"
import axiosInstance from "../utils/axiosInstance.js";
import { useNavigate } from "react-router-dom"

export default function AddBudget() {
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [errors, setErrors] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors("");
        try {
            setLoading(true);
            const newBudget = {
                // id: uuidv4(),
                amount: Number(amount),
                category,
                month,
                year,
            }

            // save to MongoDB
            const response = await axiosInstance.post("/budgets/add-budget", newBudget);

            // update Redux with response from backend
            dispatch(addBudget(response.data.data));
            setCategory("");
            setAmount("");
            setMonth("");
            setYear("");
            navigate("/budget-planner");

        } catch (error) {
            setErrors(error.response?.data?.message || "Failed to save budget");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f0c29] via-[#1a1240] to-[#0a0f2c] px-4">

            {/*Form to add budget */}
            <form onSubmit={handleSubmit}
                className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 space-y-6 text-white">

                {/* Header */}
                <h1 className="text-3xl text-center font-bold">
                    Add Budget
                </h1>

                {/* Error display */}
                {errors && (
                    <p className="text-red-400 text-sm text-center bg-red-500/10 rounded-xl p-3">
                        {errors}
                    </p>
                )}

                {/*Category*/}
                <div>
                    <label className="text-sm text-gray-300 block mb-1">
                        Category</label>
                    <select value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition">
                        <option value="" className="bg-gray-900 text-white">Select Category</option>
                        <option value="Food" className="bg-gray-900 text-white">🍕 Food</option>
                        <option value="Housing" className="bg-gray-900 text-white">🏠 Housing</option>
                        <option value="Savings" className="bg-gray-900 text-white">💰 Savings</option>
                        <option value="Utilities" className="bg-gray-900 text-white">💡 Utilities</option>
                        <option value="Transport" className="bg-gray-900 text-white">🚗 Transport</option>
                        <option value="Healthcare" className="bg-gray-900 text-white">❤️ Healthcare</option>
                        <option value="Education" className="bg-gray-900 text-white">📚 Education</option>
                        <option value="Shopping" className="bg-gray-900 text-white">🛒 Shopping</option>
                        <option value="Entertainment" className="bg-gray-900 text-white">🎬 Entertainment</option>
                        <option value="Miscellaneous" className="bg-gray-900 text-white">💸 Miscellaneous</option>
                    </select>
                </div>

                {/*Month field*/}
                <div>
                    <label className="text-sm text-gray-300 block mb-1">
                        Month</label>
                    <select value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition">
                        <option value="" className="bg-gray-900 text-white">Select Month</option>
                        <option value="January" className="bg-gray-900 text-white">January</option>
                        <option value="February" className="bg-gray-900 text-white">February</option>
                        <option value="March" className="bg-gray-900 text-white">March</option>
                        <option value="April" className="bg-gray-900 text-white">April</option>
                        <option value="May" className="bg-gray-900 text-white">May</option>
                        <option value="June" className="bg-gray-900 text-white">June</option>
                        <option value="July" className="bg-gray-900 text-white">July</option>
                        <option value="August" className="bg-gray-900 text-white">August</option>
                        <option value="September" className="bg-gray-900 text-white">September</option>
                        <option value="October" className="bg-gray-900 text-white">October</option>
                        <option value="November" className="bg-gray-900 text-white">November</option>
                        <option value="December" className="bg-gray-900 text-white">December</option>
                    </select>
                </div>

                {/*Year field*/}
                <div>
                    <label className="text-sm text-gray-300 block mb-1">
                        Year</label>
                    <select value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition">
                        <option value="" className="bg-gray-900 text-white">Select Year</option>
                        <option value="2024" className="bg-gray-900 text-white">2024</option>
                        <option value="2025" className="bg-gray-900 text-white">2025</option>
                        <option value="2026" className="bg-gray-900 text-white">2026</option>
                    </select>
                </div>

                {/*Amount field */}
                <div>
                    <label className="text-sm text-gray-300 block mb-1">
                        Amount</label>
                    <input required value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        type="number"
                        placeholder="₹0.00"
                        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    />
                </div>

                {/*Save Button */}
                <button type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-semibold bg-linear-to-r from-[#00f5c4] to-[#8b5cf6] text-black transform hover:scale-105 cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-emerald-500/30 disabled:opacity-50" >
                    {loading ? "Saving..." : "Save Budget →"}
                </button>
                
            </form >
        </div >
    )
}
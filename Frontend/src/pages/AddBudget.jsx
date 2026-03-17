import { useState } from "react"
import { useDispatch } from "react-redux"
import { addBudget } from "../store/slices/budgetSlice"
import axiosInstance from "../utils/axiosInstance.js";
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const QUICK_AMOUNTS = [1000, 5000, 10000, 25000];
const currentYear = new Date().getFullYear();
const YEARS = [
    (currentYear - 1).toString(),
    currentYear.toString(),
    (currentYear + 1).toString(),
    (currentYear + 2).toString(),
];

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
                amount: Number(amount),
                category,
                month,
                year,
            }

            // save to MongoDB
            const response = await axiosInstance.post("/api/budgets/add-budget", newBudget);

            // update Redux with response from backend
            dispatch(addBudget(response.data.data));
            toast.success("Budget created! 📊");

            setCategory("");
            setAmount("");
            setMonth("");
            setYear("");
            navigate("/budget-planner");

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to save budget");
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
                <div className="flex items-center gap-3 mb-2">
                    <button type="button" onClick={() => navigate(-1)}
                        className="text-gray-400 hover:text-white transition text-sm">
                        ← Back
                    </button>
                </div>
                <div className="text-center">
                    <h1 className="text-3xl text-center font-bold">
                        Add Budget
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">Set spending limits by category.</p>
                </div>
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
                        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition">
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
                        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition">
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
                        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition">
                        <option value="" className="bg-gray-900 text-white">Select Year</option>
                        {YEARS.map(y => (
                            <option key={y} value={y} className="bg-gray-900 text-white">{y}</option>
                        ))}
                    </select>
                </div>

                {/*Amount field */}
                <div>
                    <label className="text-sm text-gray-300 block mb-1">
                        Amount</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                        <input required value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            type="number"
                            placeholder="0.00"
                            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 pl-8 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                        />
                    </div>
                    {/* Quick amounts */}
                    <div className="flex gap-2 mt-2">
                        {QUICK_AMOUNTS.map(q => (
                            <button key={q} type="button" onClick={() => setAmount(q.toString())}
                                className="flex-1 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-purple-500/20 hover:text-purple-300 hover:border-purple-500/30 transition">
                                ₹{q >= 1000 ? `${q / 1000}k` : q}
                            </button>
                        ))}
                    </div>
                </div>

                {/*Save Button */}
                <button type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-semibold bg-linear-to-r from-purple-600 to-indigo-500 text-black transform hover:scale-105 cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-purple-500/30 disabled:opacity-50" >
                    {loading ? "Saving..." : "Save Budget →"}
                </button>

            </form >
        </div >
    )
}
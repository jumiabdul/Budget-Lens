import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTransaction } from "../store/slices/transactionSlice"
import axiosInstance from "../utils/axiosInstance.js";
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const QUICK_AMOUNTS = [500, 1000, 5000, 10000];
const MODES = [
    { value: "Cash", label: "Cash", icon: "💵" },
    { value: "Card", label: "Card", icon: "💳" },
    { value: "UPI", label: "UPI", icon: "📱" },
    { value: "NetBanking", label: "Net Banking", icon: "🌐" },
    { value: "Cheque", label: "Cheque", icon: "📝" },
];

export default function AddExpense() {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");
    const [mode, setMode] = useState("Cash");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");
    const [errors, setErrors] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors("");
        try {
            setLoading(true);
            const newExpense = {
                amount: Number(amount),
                category,
                date,
                mode,
                note,
                type: "expense",
            }

            const response = await axiosInstance.post("/api/transactions/add-transaction", newExpense);

            dispatch(addTransaction(response.data.data));
            toast.success("Expense saved! 💸");

            setAmount("");
            setCategory("Food");
            setMode("Cash");
            setDate("");
            setNote("");
            navigate("/dashboard");

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to save expense");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f0c29] via-[#1a1240] to-[#0a0f2c] px-4 py-8">

            {/*Form to add expense*/}
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 space-y-6 text-white">

                {/* Header */}
                <div className="flex items-center gap-3 mb-2">
                    <button type="button" onClick={() => navigate(-1)}
                        className="text-gray-400 hover:text-white transition text-sm">
                        ← Back
                    </button>
                </div>

                <div className="text-center">
                    <h1 className="text-3xl font-bold">
                        Add Expense
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Track your spending smartly.
                    </p>
                </div>

                {/* Error display */}
                {errors && (
                    <p className="text-red-400 text-sm text-center bg-red-500/10 rounded-xl p-3">
                        {errors}
                    </p>
                )}

                {/* Amount */}
                <div>
                    <label className="text-sm text-gray-300 block mb-1">
                        Amount
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                        <input
                            type="number"
                            placeholder="0.00"
                            required
                            value={amount}
                            onChange={(e) => { setAmount(e.target.value); setErrors(p => ({ ...p, amount: "" })); }}
                            className={`w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 pl-8 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 transition${errors.amount ? "border-red-500" : "border-white/20"}`}
                        />
                    </div>
                    {/* Quick amounts */}
                    <div className="flex gap-2 mt-2">
                        {QUICK_AMOUNTS.map(q => (
                            <button key={q} type="button" onClick={() => setAmount(q.toString())}
                                className="flex-1 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30 transition">
                                ₹{q >= 1000 ? `${q / 1000}k` : q}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Category */}
                <div>
                    <label className="text-sm text-gray-300 block mb-1">
                        Category
                    </label>
                    <select
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-400 transition" >
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

                {/* Mode */}
                <div>
                    <label className="text-sm text-gray-300 block mb-1">
                        Mode of Transaction
                    </label>
                    <div className="flex gap-2 flex-wrap">
                        {MODES.map(m => (
                            <button key={m.value} type="button" onClick={() => setMode(m.value)}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs transition ${mode === m.value
                                    ? "bg-red-500/20 border-red-500/50 text-red-300"
                                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                                    }`}>
                                {m.icon} {m.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Date */}
                <div>
                    <label className="text-sm text-gray-300 block mb-1">
                        Date
                    </label>
                    <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]} // Block future dates
                        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                    />
                    <p className="text-xs text-gray-400 mt-1">Cannot select future dates</p>
                </div>

                {/* Note */}
                <div>
                    <label className="text-sm text-gray-300 block mb-1">
                        Note (Optional)
                    </label>
                    <input
                        type="text"
                        placeholder="Add a note..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-semibold bg-linear-to-r from-red-700 to-pink-400 text-white transform hover:scale-105 cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-red-500/30 disabled:opacity-50">
                    {loading ? "Saving..." : "Save Expense →"}
                </button>

            </form>
        </div>
    );
}
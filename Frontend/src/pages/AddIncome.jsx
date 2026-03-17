import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTransaction } from "../store/slices/transactionSlice"
import axiosInstance from "../utils/axiosInstance.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"

const CATEGORIES = [
    { value: "Salary", label: "Salary", icon: "💼" },
    { value: "Investment", label: "Investment", icon: "📈" },
    { value: "Business", label: "Business", icon: "🏪" },
    { value: "Others", label: "Others", icon: "🎁" },
];

const MODES = [
    { value: "Cash", label: "Cash", icon: "💵" },
    { value: "Card", label: "Card", icon: "💳" },
    { value: "UPI", label: "UPI", icon: "📱" },
    { value: "NetBanking", label: "Net Banking", icon: "🌐" },
    { value: "Cheque", label: "Cheque", icon: "📝" },
];

const QUICK_AMOUNTS = [1000, 5000, 10000, 50000];

export default function AddIncome() {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Salary");
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
            const newIncome = {
                //id: uuidv4(),
                amount: Number(amount),
                category,
                date,
                mode,
                note,
                type: "income",
            }

            const response = await axiosInstance.post("/api/transactions/add-transaction", newIncome);

            dispatch(addTransaction(response.data.data));
            toast.success("Income saved! 💰");

            setAmount("");
            setCategory("Salary");
            setMode("Cash");
            setDate("");
            setNote("");
            navigate("/dashboard");

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to save income");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f0c29] via-[#1a1240] to-[#0a0f2c] px-4 py-8">

            {/*Form to add income */}
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
                    <h1 className="text-3xl font-bold">
                        Add Income
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Track your earnings wisely.
                    </p>
                </div>

                {/* Error display */}
                {errors && (
                    <p className="text-red-400 text-sm text-center bg-red-500/10 rounded-xl p-3">
                        {errors}
                    </p>
                )}

                {/*Amount field */}
                <div>
                    <label className="text-sm text-gray-300 block mb-1">
                        Amount</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                        <input type="number"
                            placeholder="0.00"
                            required
                            value={amount}
                            onChange={(e) => { setAmount(e.target.value); setErrors(p => ({ ...p, amount: "" })); }}
                            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 pl-8 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" />
                    </div>
                    {/* Quick amounts */}
                    <div className="flex gap-2 mt-2">
                        {QUICK_AMOUNTS.map(q => (
                            <button key={q} type="button" onClick={() => setAmount(q.toString())}
                                className="flex-1 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-emerald-500/20 hover:text-emerald-300 hover:border-emerald-500/30 transition">
                                ₹{q >= 1000 ? `${q / 1000}k` : q}
                            </button>
                        ))}
                    </div>
                </div>


                {/*Category*/}
                <div>
                    <label className="text-sm text-gray-300 block mb-1">
                        Category</label>
                    <div className="grid grid-cols-4 gap-2">
                        {CATEGORIES.map(c => (
                            <button key={c.value} type="button" onClick={() => setCategory(c.value)}
                                className={`flex flex-col items-center gap-1 py-3 rounded-xl border text-xs transition ${category === c.value
                                    ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                                    }`}>
                                <span className="text-lg">{c.icon}</span>
                                <span className="text-[10px]">{c.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/*Mode of Transaction*/}
                <div>
                    <label className="text-sm text-gray-300 block mb-1">
                        Mode of Transaction</label>
                    <div className="flex gap-2 flex-wrap">
                        {MODES.map(m => (
                            <button key={m.value} type="button" onClick={() => setMode(m.value)}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs transition ${mode === m.value
                                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                                    }`}>
                                {m.icon} {m.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/*Date field*/}
                <div>
                    <label className="text-sm text-gray-300 block mb-1">
                        Date</label>
                    <input type="date"
                        placeholder=""
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    />
                </div>

                {/*Notes field */}
                <div>
                    <label className="text-sm text-gray-300 block mb-1">
                        Note(Optional)</label>
                    <input type="text"
                        placeholder="Add a note about this income"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    />
                </div>

                {/*Save Button */}
                <button type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-semibold bg-linear-to-r from-emerald-400 to-teal-600 text-black transform hover:scale-105 cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-emerald-500/30 disabled:opacity-50">
                    {loading ? "Saving..." : "Save Income →"}
                </button>

            </form>
        </div>
    )
}
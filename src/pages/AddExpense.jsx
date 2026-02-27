import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTransaction } from "../store/slices/transactionSlice"
import { v4 as uuidv4 } from "uuid"

export default function AddExpense() {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");
    const [mode, setMode] = useState("Cash");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newExpense = {
            id: uuidv4(),
            amount: Number(amount),
            category,
            date,
            mode,
            note,
            type: "expense",
        }
        dispatch(addTransaction(newExpense));
        setAmount("");
        setCategory("Food");
        setMode("Cash");
        setDate("");
        setNote("");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f0c29] via-[#1a1240] to-[#0a0f2c] px-4">

            {/*Form to add expense*/}
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 space-y-6 text-white">

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold">
                        Add Expense
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Track your spending smartly.
                    </p>
                </div>

                {/* Amount */}
                <div>
                    <label className="text-sm text-gray-300 block mb-1">
                        Amount
                    </label>
                    <input
                        type="number"
                        placeholder="₹ 0.00"
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    />
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
                        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" >
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
                    <select
                        required
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" >
                        <option value="Cash" className="bg-gray-900 text-white">💵 Cash</option>
                        <option value="Card" className="bg-gray-900 text-white">💳 Credit / Debit Card</option>
                        <option value="UPI" className="bg-gray-900 text-white">📱 UPI</option>
                        <option value="NetBanking" className="bg-gray-900 text-white">🌐 Net Banking</option>
                        <option value="Cheque" className="bg-gray-900 text-white">📝 Cheque</option>
                    </select>
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
                        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    />
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
                        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-semibold bg-linear-to-r from-[#00f5c4] to-[#8b5cf6] text-black transform hover:scale-105 cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-emerald-500/30">
                    Save Expense →
                </button>

            </form>
        </div>
    );
}
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
        <div className="p-4 bg-linear-to-br from-indigo-100 to-purple-100">

            {/*Form to add expenses */}
            <form onSubmit={handleSubmit}
                className=" bg-white rounded-2xl shadow-xl p-8 w-full mb-4 max-w-md mx-auto text-center space-y-6 border border-gray-100">
                <div className="space-y-1">
                    <h1 className="text-2xl text-pink-600 font-bold">Add Expense</h1>
                </div>

                {/*Amount field */}
                <div>
                    <label className="text-sm text-left font-medium text-gray-700 block">Amount</label>
                    <input type="number" placeholder="₹0.00" required value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>

                {/*Category*/}
                <div>
                    <label className="text-sm text-left font-medium text-gray-700 block">Category</label>
                    <select required value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400" >
                        <option value="Food">🍕 Food</option>
                        <option value="Housing">🏠 Housing</option>
                        <option value="Savings">💰 Savings</option>
                        <option value="Utilities">💡 Utilities</option>
                        <option value="Transport">🚗 Transport</option>
                        <option value="Healthcare">❤️ Healthcare</option>
                        <option value="Education">📚 Education</option>
                        <option value="Shopping">🛒 Shopping</option>
                        <option value="Entertainment">🎬 Entertainment</option>
                        <option value="Miscellaneous">💸 Miscellaneous</option>

                    </select>
                </div>

                {/*Mode of Transaction*/}
                <div>
                    <label className="text-sm text-left font-medium text-gray-700 block">Mode of Transaction</label>
                    <select required value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400" >
                        <option value="Cash">💵 Cash</option>
                        <option value="Card">💳 Credit / Debit Card</option>
                        <option value="UPI">📱 UPI (Gpay, PhonePe, Paytm)</option>
                        <option value="NetBanking">🌐 Net Banking</option>
                        <option value="Cheque">📝 Cheque</option>
                    </select>
                </div>

                {/*Date field*/}
                <div>
                    <label className="text-sm text-left font-medium text-gray-700 block">Date</label>
                    <input type="date" placeholder="" required value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>

                {/*Notes field */}
                <div>
                    <label className="text-sm text-left font-medium text-gray-700 block">Note(Optional)</label>
                    <input type="text" placeholder="Add a note about this expense" value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>

                {/*Save Button */}
                <button type="submit"
                    className="w-full px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-md font-semibold hover:opacity-90">
                    Save Expense
                </button>
            </form>
        </div>
    )
}
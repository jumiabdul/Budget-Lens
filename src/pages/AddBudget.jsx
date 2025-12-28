import { useState } from "react"
import { useDispatch } from "react-redux"
import { setBudget } from "../store/slices/budgetSlice"
import { v4 as uuidv4 } from "uuid"

export default function AddBudget() {
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [month, setMonth] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBudget = {
            id: uuidv4(),
            amount: Number(amount),
            category,
            month,
        }
        dispatch(setBudget(newBudget));
        setCategory("");
        setAmount("");
        setMonth("");

    }

    return (
        <div className="min-h-screen p-4 bg-linear-to-br from-indigo-100 to-purple-100">
           
            {/*Form to add budget */}
            <form onSubmit={handleSubmit}
                className=" bg-white rounded-2xl shadow-xl p-8 w-full mb-4 max-w-md mx-auto text-center space-y-6 border border-gray-100">
                <div className="space-y-1">
                    <h1 className="text-2xl text-pink-600 font-bold">Add Budget</h1>
                </div>

                {/*Category*/}
                <div>
                    <label className="text-sm text-left font-medium text-gray-700 block">Category</label>
                    <select required value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400" >
                        <option value="">Select Category</option>
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

                {/*Month field*/}
                <div>
                    <label className="text-sm text-left font-medium text-gray-700 block">Category</label>
                    <select required value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400" >
                        <option value="">Select Month</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                </div>

                {/*Amount field */}
                <div>
                    <label className="text-sm text-left font-medium text-gray-700 block">Amount</label>
                    <input required value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        type="number" placeholder="₹0.00"
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>

                {/*Save Button */}
                <button type="submit"
                    className="w-full px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-md font-semibold hover:opacity-90">
                    Save Budget
                </button>

            </form>
        </div>
    )
}
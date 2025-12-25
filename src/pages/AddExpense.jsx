
export default function AddExpense() {
    return (
        <div className="p-4 bg-linear-to-br from-indigo-100 to-purple-100">

            {/*Form to add expenses */}
            <form className=" bg-white rounded-2xl shadow-xl p-8 w-full mb-4 max-w-md mx-auto text-center space-y-6 border border-gray-100">
                <div className="space-y-1">
                    <h1 className="text-2xl text-pink-600 font-bold">Add Expense</h1>
                </div>

                {/*Amount field */}
                <div>
                    <label className="text-sm text-left font-medium text-gray-700 block">Amount</label>
                    <input type="number" placeholder="₹0.00"
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>

                {/*Category*/}
                <div>
                    <label className="text-sm text-left font-medium text-gray-700 block">Category</label>
                    <input type="text" placeholder="Food" required
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>

                {/*Mode of Transaction*/}
                <div>
                    <label className="text-sm text-left font-medium text-gray-700 block">Mode of Transaction</label>
                    <input type="text" placeholder="Gpay" required
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>

                {/*Date field*/}
                <div>
                    <label className="text-sm text-left font-medium text-gray-700 block">Date</label>
                    <input type="date" placeholder="" required
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>

                {/*Notes field */}
                <div>
                    <label className="text-sm text-left font-medium text-gray-700 block">Note(Optional)</label>
                    <input type="text" placeholder="Add a note about this expense"
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
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react";
import { deleteTransaction } from "../store/slices/transactionSlice"

export default function Transactions() {
    const transactions = useSelector((state) => state.transactions);
    const dispatch = useDispatch();

    const [searchCategory, setSearchCategory] = useState("");
    const [filterMonth, setFilterMonth] = useState("");
    const [filterYear, setFilterYear] = useState("");

    const handleDelete = (id) => {
        dispatch(deleteTransaction(id));
    }

    const handleClearFilters = () => {
        setSearchCategory("");
        setFilterMonth("");
        setFilterYear("");
    }

    const filteredTransactions = transactions.filter((t) => {
        const onlyMonth = new Date(t.date).toLocaleString("default", { month: "long" });
        const onlyYear = new Date(t.date).getFullYear().toString();

        const matchCategory = searchCategory
            ? t.category.toLowerCase().includes(searchCategory.toLowerCase()) : true;

        const matchMonth = filterMonth ? onlyMonth === filterMonth : true;
        const matchYear = filterYear ? onlyYear === filterYear : true;

        return matchCategory && matchMonth && matchYear;
    }
    )

    return (
        <div className="min-h-screen bg-linear-to-br from-indigo-100 to-purple-100">
            <div className="space-y-6 p-4">
                <h1 className="text-2xl text-center text-pink-600 font-bold">Transaction History</h1>

                {/*Seaching and Filtering of transactions */}
                <div className="flex items-center justify-around mt-5 bg-white rounded-xl shadow-md p-4">

                    {/*Seaching by category */}
                    <input value={searchCategory}
                        onChange={(e) => setSearchCategory(e.target.value)}
                        type="text" placeholder="Search for transactions by categories..."
                        className="mt-1 w-1/3 rounded-xl border border-gray-300 px-4 py-2 text-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" />

                    {/*Filtering by month  */}
                    <select value={filterMonth}
                        onChange={(e) => setFilterMonth(e.target.value)}
                        className="border-2 border-blue-950 p-2 rounded">
                        <option className="text-purple-600 font-bold" value="">Select Month</option>
                        <option className="text-purple-600 font-bold" value="January">January</option>
                        <option className="text-purple-600 font-bold" value="February">February</option>
                        <option className="text-purple-600 font-bold" value="March">March</option>
                        <option className="text-purple-600 font-bold" value="April">April</option>
                        <option className="text-purple-600 font-bold" value="May">May</option>
                        <option className="text-purple-600 font-bold" value="June">June</option>
                        <option className="text-purple-600 font-bold" value="July">July</option>
                        <option className="text-purple-600 font-bold" value="August">August</option>
                        <option className="text-purple-600 font-bold" value="September">September</option>
                        <option className="text-purple-600 font-bold" value="October">October</option>
                        <option className="text-purple-600 font-bold" value="November">November</option>
                        <option className="text-purple-600 font-bold" value="December">December</option>
                    </select>

                    {/*Filtering by year */}
                    <select value={filterYear}
                        onChange={(e) => setFilterYear(e.target.value)}
                        className="border-2 border-blue-950 p-2 rounded">
                        <option value="">Select Year</option>
                        {[... new Set(transactions.map((t) => new Date(t.date).getFullYear()))]
                            .map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))
                        }
                    </select>

                    <button onClick={handleClearFilters}
                        className="px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-md font-semibold hover:opacity-90 ">
                        Clear Filter</button>

                </div>
                {/*Table showing transactions */}
                <div className="bg-white rounded-xl shadow-md p-4">
                    <table className="mt-5 w-full ">
                        <thead>
                            <tr className="mt-5 border-2 border-purple-900 ">
                                <th className="p-3">Date </th>
                                <th>Category </th>
                                <th>Description </th>
                                <th>Amount </th>
                                <th>Mode of Transaction </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.slice().reverse().map((t) => (
                                <tr key={t.id} className=" text-center border border-purple-600">
                                    <td className="py-2 px-5">{t.date}</td>
                                    <td >{t.category}</td>
                                    <td >{t.note}</td>
                                    <td className={`text-sm ${t.type === "income" ? "text-green-600" : "text-red-600"}`} >
                                        {t.type === "income" ? "+" : "-"}{t.amount}</td>
                                    <td >{t.mode}</td>
                                    <td>
                                        <button className="mr-2 hover:cursor-pointer">✎</button>
                                        <button onClick={() => handleDelete(t.id)}
                                            className=" hover:cursor-pointer">🗑️</button>
                                    </td>
                                </tr>
                            ))}
                            {filteredTransactions.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-gray-600 text-center">No Transactions Found</td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}
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

        <div className="min-h-screen bg-linear-to-br from-[#0f0c29] via-[#1a1333] to-[#0f0c29] text-gray-200 px-4 sm:px-8 py-8">

            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold 
                        bg-linear-to-r from-purple-400 to-emerald-400 
                        bg-clip-text text-transparent text-center">
                        Transaction History
                    </h1>
                    <p className="text-gray-400 mt-1 text-center">
                        Track and manage your financial records
                    </p>
                </div>

                {/* Filter Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-6 shadow-xl">

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                        {/* Search */}
                        <input
                            value={searchCategory}
                            onChange={(e) => setSearchCategory(e.target.value)}
                            type="text"
                            placeholder="Search by category..."
                            className="rounded-xl bg-[#0F0F25] border border-purple-500/30 px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        {/* Month */}
                        <select
                            value={filterMonth}
                            onChange={(e) => setFilterMonth(e.target.value)}
                            className="rounded-xl bg-[#0F0F25] border border-indigo-500/30 px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" >
                            <option value="">Select Month</option>
                            {[
                                "January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"
                            ].map((month) => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </select>

                        {/* Year */}
                        <select
                            value={filterYear}
                            onChange={(e) => setFilterYear(e.target.value)}
                            className="rounded-xl bg-[#0F0F25] border border-emerald-500/30 px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                            <option value="">Select Year</option>
                            {[...new Set(transactions.map((t) =>
                                new Date(t.date).getFullYear()
                            ))].map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>

                        {/* Clear */}
                        <button
                            onClick={handleClearFilters}
                            className="bg-linear-to-r  from-[#00f5c4] to-[#8b5cf6] text-black font-semibold rounded-xl py-2 hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-600/30" >
                            Clear Filter
                        </button>
                    </div>
                </div>

                {/* Table displaying transactions */}
                <div className="bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-6 shadow-xl overflow-x-auto">

                    <table className="w-full text-sm">

                        <thead>
                            <tr className="border-b border-purple-500/30 text-gray-300">
                                <th className="p-3 text-left">Date</th>
                                <th className="text-left">Category</th>
                                <th className="text-left">Description</th>
                                <th className="text-left">Amount</th>
                                <th className="text-left">Mode</th>
                                <th className="text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredTransactions.slice().reverse().map((t) => (
                                <tr
                                    key={t.id}
                                    className="border-b border-purple-900/20 hover:bg-purple-900/10 transition-all">
                                    <td className="p-3">
                                        {new Date(t.date).toLocaleDateString("en-IN")}
                                    </td>

                                    <td>{t.category}</td>
                                    <td>{t.note}</td>

                                    <td className={`font-semibold ${t.type === "income"
                                        ? "text-emerald-400"
                                        : "text-pink-400"
                                        }`}>
                                        {t.type === "income" ? "+" : "-"}₹ {t.amount}
                                    </td>

                                    <td>{t.mode}</td>

                                    <td>
                                        <button
                                            onClick={() => handleDelete(t.id)}
                                            className="text-red-400 hover:text-red-300 transition duration-200">
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredTransactions.length === 0 && (
                                <tr>
                                    <td colSpan="6"
                                        className="text-center py-6 text-gray-400" >
                                        No Transactions Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}

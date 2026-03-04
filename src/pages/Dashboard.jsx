import { useSelector } from "react-redux";
import DoughnutChart from "../components/DoughnutChart";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const transactions = useSelector((state) => state.transactions);

    const income = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;
    const navigate = useNavigate();
    const isNegative = balance < 0;

    return (
        <div className="min-h-screen bg-linear-to-br from-[#0f0c29] via-[#141033] to-[#0b0720] text-gray-200">

            {/* Main Content */}
            <div className="px-4 sm:px-6 md:px-10 py-6 space-y-8">

                {/*Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    {/* Balance */}
                    <div className={`bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-6 shadow-xl 
                        ${isNegative
                            ? "border-red-500/40 shadow-md"
                            : "border-purple-500/30 shadow-md"
                        }`}>
                        <p className="text-xs text-gray-400">Total Balance</p>
                        <p className={`text-2xl sm:text-3xl font-bold mt-2 ${isNegative ? "text-red-400" : "text-indigo-400"}`}>
                            ₹{balance.toLocaleString("en-IN")}
                        </p>
                    </div>

                    {/* Income */}
                    <div className="bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-6 shadow-xl">
                        <p className="text-xs text-gray-400">Income</p>
                        <p className="text-2xl sm:text-3xl font-bold text-emerald-400 mt-2">
                            ₹{income.toLocaleString("en-IN")}
                        </p>
                    </div>

                    {/* Expense */}
                    <div className="bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-6 shadow-xl">
                        <p className="text-xs text-gray-400">Expenses</p>
                        <p className="text-2xl sm:text-3xl font-bold text-red-400 mt-2">
                            ₹{expense.toLocaleString("en-IN")}
                        </p>
                    </div>
                </div>

                {/* Grid Left Section */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                    {/* Chart Section */}
                    <div className="xl:col-span-2 overflow-hidden bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-base sm:text-lg font-semibold text-gray-200">
                                Spending Categories
                            </h2>
                            <span className="text-xs text-gray-500">This month</span>
                        </div>

                        <div className="flex-1 h-80 sm:h-87.5">
                            <DoughnutChart />
                        </div>
                    </div>

                    {/*Grid Right Section */}
                    <div className="space-y-6">

                        {/* Quick Actions */}
                        <div className="bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-6 shadow-xl">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-200 mb-5">
                                Quick Actions
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                                <button
                                    onClick={() => navigate("/add-expense")}
                                    className="py-3 rounded-xl bg-red-500 hover:bg-red-600 hover:scale-105 transition text-sm font-medium" >
                                    Add Expense
                                </button>

                                <button
                                    onClick={() => navigate("/add-income")}
                                    className="py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 hover:scale-105 transition text-sm font-medium">
                                    Add Income
                                </button>

                                <button
                                    onClick={() => navigate("/reports")}
                                    className="py-3 rounded-xl bg-linear-to-r from-indigo-500 to-teal-500 text-black font-semibold hover:scale-105 transition text-sm" >
                                    Reports
                                </button>

                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-6 shadow-xl">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-base sm:text-lg font-semibold text-gray-200">
                                    Recent Activity
                                </h4>

                                <button
                                    onClick={() => navigate("/transactions")}
                                    className="text-xs px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition" >
                                    View All
                                </button>
                            </div>

                            <ul className="space-y-3">
                                {transactions.slice(-5).reverse().map((t) => (
                                    <li
                                        key={t.id}
                                        className="flex items-center justify-between border-b border-white/10 pb-2"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-gray-300">
                                                {t.category}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {t.date}
                                            </p>
                                        </div>

                                        <p className={`text-sm font-semibold ${t.type === "income"
                                            ? "text-emerald-400"
                                            : "text-red-400"
                                            }`}>
                                            {t.type === "income" ? "+" : "-"}₹
                                            {t.amount.toLocaleString("en-IN")}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

            {/* Mobile sticky action bar*/}
            <div className="fixed bottom-0 left-0 right-0 bg-[#0f0c29]/90 backdrop-blur-xl border-t border-purple-500/20 p-3 flex justify-around sm:hidden">

                <button
                    onClick={() => navigate("/add-expense")}
                    className="text-red-400 font-semibold"
                >
                    Expense
                </button>

                <button
                    onClick={() => navigate("/add-income")}
                    className="text-emerald-400 font-semibold"
                >
                    Income
                </button>

                <button
                    onClick={() => navigate("/reports")}
                    className="text-purple-400 font-semibold"
                >
                    Reports
                </button>

            </div>

            {/* Extra padding for mobile bottom bar */}
            <div className="h-16 sm:hidden"></div>

        </div>
    );
}
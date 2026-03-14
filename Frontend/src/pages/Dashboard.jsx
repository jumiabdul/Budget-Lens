import { useSelector, useDispatch } from "react-redux";
import DoughnutChart from "../components/DoughnutChart";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setTransactions } from "../store/slices/transactionSlice";
import { setBudgets } from "../store/slices/budgetSlice";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast"

export default function Dashboard() {
    const transactions = useSelector((state) => state.transactions);
    const budgets = useSelector((state) => state.budgets);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isNewUser = transactions.length === 0;

    // Load data from MongoDB on startup
    useEffect(() => {
        const loadData = async () => {
            try {
                const txRes = await axiosInstance.get("/transactions/get-all-transactions");
                dispatch(setTransactions(txRes.data.data));

                const budgetRes = await axiosInstance.get("/budgets/get-all-budgets");
                dispatch(setBudgets(budgetRes.data.data));
            } catch (error) {
                toast.error("Failed to load data. Please refresh !!");
            }
        };
        loadData();
    }, [dispatch]);

    const income = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;
    const isNegative = balance < 0;
    const savingsRate = income > 0 ? Math.round(((income - expense) / income) * 100) : 0;
    const totalBudget = budgets.reduce((s, b) => s + Number(b.amount), 0);
    const budgetUsedPct = totalBudget > 0 ? Math.round((expense / totalBudget) * 100) : 0;

    // Health Score 
    let healthScore = 50;
    if (savingsRate >= 30) healthScore = 90;
    else if (savingsRate >= 20) healthScore = 78;
    else if (savingsRate >= 10) healthScore = 62;
    else if (savingsRate >= 0) healthScore = 45;
    else healthScore = 25;

    const healthLabel = healthScore >= 80 ? "Excellent 🎉"
        : healthScore >= 65 ? "Good 👍"
            : healthScore >= 45 ? "Fair ⚠️"
                : "Poor 🔴";
    const healthColor = healthScore >= 80 ? "text-emerald-400"
        : healthScore >= 65 ? "text-indigo-400"
            : healthScore >= 45 ? "text-yellow-400"
                : "text-red-400";
    const healthBar = healthScore >= 80 ? "bg-emerald-400"
        : healthScore >= 65 ? "bg-indigo-400"
            : healthScore >= 45 ? "bg-yellow-400"
                : "bg-red-400";

    // Top category 
    const categoryTotals = transactions
        .filter(t => t.type === "expense")
        .reduce((obj, t) => { obj[t.category] = (obj[t.category] || 0) + Number(t.amount); return obj; }, {});
    const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

    // Avg daily expense
    const expenseOnly = transactions.filter(t => t.type === "expense");
    const avgDaily = expenseOnly.length > 0
        ? Math.round(expense / Math.max(new Set(expenseOnly.map(t => t.date?.split("T")[0])).size, 1))
        : 0;

    return (
        <div className="min-h-screen bg-linear-to-br from-[#0f0c29] via-[#141033] to-[#0b0720] text-gray-200">

            {/* Header */}
            <div>
                <h1 className="text-2xl p-1 text-center font-bold text-white">
                    {isNewUser
                        ? `Welcome to Budget Lens ! 👋`
                        : `Welcome back ! 👋`}
                </h1>
                <p className="text-gray-500 text-center text-sm ">
                    {isNewUser
                        ? "Start by adding your first transaction to see your financial overview."
                        : "Here's your financial overview."}
                </p>
            </div>

            {/* Main Content */}
            <div className="px-4 sm:px-6 md:px-10 py-6 space-y-8">

                {/*Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    {/* Balance */}
                    <div className={`bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-5 shadow-xl 
                        ${isNegative
                            ? "border-red-500/40 shadow-md"
                            : "border-purple-500/30 shadow-md"
                        }`}>
                        <p className="text-xs text-gray-400">Total Balance</p>
                        <p className={`text-xl sm:text-2xl font-bold mt-2 ${isNegative ? "text-red-400" : "text-indigo-400"}`}>
                            ₹{balance.toLocaleString("en-IN")}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-1">
                            {isNewUser ? "No transactions yet" : balance >= 0 ? "✅ Positive balance" : "⚠️ Negative balance"}
                        </p>
                    </div>

                    {/* Income */}
                    <div className="bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-6 shadow-xl">
                        <p className="text-xs text-gray-400">Income</p>
                        <p className="text-xl sm:text-2xl font-bold text-emerald-400 mt-2">
                            ₹{income.toLocaleString("en-IN")}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-1">
                            {isNewUser ? "No income added yet" : `${transactions.filter(t => t.type === "income").length} transactions`}
                        </p>
                    </div>

                    {/* Expense */}
                    <div className="bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-6 shadow-xl">
                        <p className="text-xs text-gray-400">Expenses</p>
                        <p className="text-xl sm:text-2xl font-bold text-red-400 mt-2">
                            ₹{expense.toLocaleString("en-IN")}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-1">
                            {isNewUser ? "No expenses added yet" : `${transactions.filter(t => t.type === "expense").length} transactions`}
                        </p>
                    </div>
                </div>

                {/* Grid Left Section */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 space-y-8">

                        {/* Chart Section */}
                        <div className=" overflow-hidden bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-6 shadow-xl">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-base sm:text-lg font-semibold text-gray-200">
                                    Spending Categories
                                </h2>
                                <span className="text-xs text-gray-500">This month</span>
                            </div>
                            {isNewUser ? (
                                <div className="h-48 flex flex-col items-center justify-center text-center space-y-3">
                                    <div className="text-4xl">🍩</div>
                                    <p className="text-sm text-gray-400 font-medium">No spending data yet</p>
                                    <p className="text-xs text-gray-600">Add expenses to see category breakdown</p>
                                    <button onClick={() => navigate("/add-expense")}
                                        className="text-xs px-4 py-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/20 hover:bg-red-500/30 transition">
                                        + Add First Expense
                                    </button>
                                </div>
                            ) : (
                                <div className="flex-1 h-72 sm:h-87.5">
                                    <DoughnutChart />
                                </div>
                            )}
                        </div>

                        {/* Stats Strip */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/5 border border-purple-900/30 rounded-2xl p-3">
                                <p className="text-sm text-gray-500 mb-1">💰 Savings</p>
                                <p className={`text-base font-bold ${isNewUser ? "text-gray-500" : balance >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                                    {isNewUser ? "—" : `₹${Math.abs(balance).toLocaleString("en-IN")}`}
                                </p>
                            </div>
                            <div className="bg-white/5 border border-purple-900/30 rounded-2xl p-3">
                                <p className="text-sm text-gray-500 mb-1">📊 Transactions</p>
                                <p className={`text-base font-bold ${isNewUser ? "text-gray-500" : "text-purple-400"}`}>
                                    {isNewUser ? "—" : transactions.length}
                                </p>
                            </div>
                            <div className="bg-white/5 border border-purple-900/30 rounded-2xl p-3">
                                <p className="text-sm text-gray-500 mb-1">🔥 Top Category</p>
                                <p className={`text-base font-bold truncate ${isNewUser ? "text-gray-500" : "text-orange-400"}`}>
                                    {isNewUser ? "—" : topCategory}
                                </p>
                            </div>
                            <div className="bg-white/5 border border-purple-900/30 rounded-2xl p-3">
                                <p className="text-sm text-gray-500 mb-1">💡 Avg Daily</p>
                                <p className={`text-base font-bold ${isNewUser ? "text-gray-500" : "text-pink-400"}`}>
                                    {isNewUser ? "—" : `₹${avgDaily.toLocaleString("en-IN")}`}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/*Grid Right Section */}
                    <div className="space-y-4">

                        {/* Health Score */}
                        <div className="bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-6 shadow-xl text-center">
                            <h3 className="text-sm font-semibold text-gray-200 mb-4">Financial Health</h3>
                            {isNewUser ? (
                                <div className="py-4 space-y-2">
                                    <div className="text-4xl">📊</div>
                                    <p className="text-xs text-gray-500 mt-2">Add transactions to see your health score</p>
                                </div>
                            ) : (
                                <>
                                    {/* Score circle */}
                                    <div className="relative w-24 h-24 mx-auto mb-3">
                                        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="40" fill="none" stroke="#374151" strokeWidth="10" />
                                            <circle cx="50" cy="50" r="40" fill="none"
                                                stroke={healthScore >= 80 ? "#34d399" : healthScore >= 65 ? "#818cf8" : healthScore >= 45 ? "#fbbf24" : "#f87171"}
                                                strokeWidth="10"
                                                strokeDasharray={`${(healthScore / 100) * 251.2} 251.2`}
                                                strokeLinecap="round" />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className={`text-2xl font-bold ${healthColor}`}>{healthScore}</span>
                                            <span className="text-[9px] text-gray-500">/ 100</span>
                                        </div>
                                    </div>

                                    <p className={`text-sm font-bold ${healthColor} mb-3`}>{healthLabel}</p>

                                    <div className="space-y-2 text-left">
                                        <div className="flex justify-between text-xs text-gray-400">
                                            <span>Savings Rate</span>
                                            <span className={savingsRate >= 20 ? "text-emerald-400" : "text-yellow-400"}>{savingsRate}%</span>
                                        </div>
                                        <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full ${savingsRate >= 20 ? "bg-emerald-400" : "bg-yellow-400"}`}
                                                style={{ width: `${Math.max(0, Math.min(savingsRate, 100))}%` }} />
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                                            <span>Budget Used</span>
                                            <span className={budgetUsedPct >= 100 ? "text-red-400" : budgetUsedPct >= 80 ? "text-yellow-400" : "text-emerald-400"}>
                                                {budgetUsedPct}%
                                            </span>
                                        </div>
                                        <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full ${budgetUsedPct >= 100 ? "bg-red-400" : budgetUsedPct >= 80 ? "bg-yellow-400" : "bg-emerald-400"}`}
                                                style={{ width: `${Math.min(budgetUsedPct, 100)}%` }} />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div className="hidden sm:block bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-6 shadow-xl">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-200 mb-5">
                                Quick Actions
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                                <button
                                    onClick={() => navigate("/add-expense")}
                                    className="py-3 rounded-xl bg-red-500 hover:bg-red-600 hover:scale-105 transition text-sm font-medium" >
                                    + Expense
                                </button>

                                <button
                                    onClick={() => navigate("/add-income")}
                                    className="py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 hover:scale-105 transition text-sm font-medium">
                                    + Income
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
                                {!isNewUser && (
                                    <button
                                        onClick={() => navigate("/transactions")}
                                        className="text-xs px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition" >
                                        View All
                                    </button>
                                )}
                            </div>

                            {isNewUser ? (
                                <div className="text-center py-4 space-y-3">
                                    <div className="text-3xl">🧾</div>
                                    <p className="text-xs text-gray-500">No transactions yet</p>
                                </div>
                            ) : (
                                <ul className="space-y-3">
                                    {transactions.slice(-5).reverse().map((t) => (
                                        <li
                                            key={t._id}
                                            className="flex items-center justify-between border-b border-white/10 pb-2"
                                        >
                                            <div>
                                                <p className="text-sm font-medium text-gray-300">
                                                    {t.category}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(t.date).toLocaleDateString("en-IN", {
                                                        day: "2-digit", month: "short", year: "numeric"
                                                    })
                                                    }
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
                            )}
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
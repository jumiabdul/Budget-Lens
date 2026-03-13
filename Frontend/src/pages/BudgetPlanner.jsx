import { useSelector } from "react-redux";
import React, { useState } from "react";
import BudgetChart from "../components/BudgetChart";
import ProgressBars from "../components/ProgressBars";
import { useNavigate } from "react-router-dom";

export default function BudgetPlanner() {
    const budgets = useSelector((state) => state.budgets);
    const transactions = useSelector((state) => state.transactions);

    const [viewMode, setViewMode] = useState("monthly");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    const navigate = useNavigate();

    // Summary calculations 
    const filteredBudgets = viewMode === "monthly"
        ? budgets.filter(b => !selectedMonth || b.month === selectedMonth)
        : budgets.filter(b => !selectedYear || b.year === selectedYear);

    const filteredExpenses = transactions.filter((t) => {
        if (t.type !== "expense") return false;
        if (viewMode === "monthly") {
            const month = new Date(t.date).toLocaleString("default", { month: "long" });
            return !selectedMonth || month === selectedMonth;
        } else {
            const year = new Date(t.date).getFullYear().toString();
            return !selectedYear || year === selectedYear;
        }
    });

    const totalBudget = filteredBudgets.reduce((s, b) => s + Number(b.amount), 0);
    const totalSpent = filteredExpenses.reduce((s, t) => s + Number(t.amount), 0);
    const remaining = totalBudget - totalSpent;
    const budgetUsedPct = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

    function generateSavingTips(budgets, transactions, viewMode, selectedMonth, selectedYear) {
        const expenseOnly = transactions.filter((t) => t.type === "expense");

        const categoryTotals = expenseOnly.reduce((obj, t) => {
            const dateObj = new Date(t.date);
            const onlyMonth = dateObj.toLocaleString("default", { month: "long" });
            const onlyYear = dateObj.getFullYear().toString();

            const monthMatch = !selectedMonth || onlyMonth === selectedMonth;
            const yearMatch = !selectedYear || onlyYear === selectedYear;

            if (viewMode === "monthly" ? monthMatch : yearMatch) {
                obj[t.category] = (obj[t.category] || 0) + Number(t.amount);
            }
            return obj;
        }, {});

        const tips = [];

        for (const [category, amount] of Object.entries(categoryTotals)) {
            const budget =
                budgets.find((b) =>
                    b.category === category &&
                    (viewMode === "monthly"
                        ? !selectedMonth || b.month === selectedMonth
                        : true) &&
                    (viewMode === "yearly"
                        ? !selectedYear || b.year === selectedYear
                        : true)
                )?.amount || 0;

            const percentage = budget ? Math.round((amount / budget) * 100) : 0;
            const remaining = budget - amount;

            if (budget && amount > budget) {
                // 🔴 Overspent
                tips.push({
                    level: "danger",
                    icon: "🔴",
                    message: `Overspent on ${category} by ₹${amount - budget} (${percentage}% of budget used). Consider reducing this category.`,
                });
            } else if (budget && percentage >= 80) {
                // 🟡 Near limit
                tips.push({
                    level: "warning",
                    icon: "🟡",
                    message: `${category} is at ${percentage}% of your budget. Only ₹${remaining} remaining — spend carefully!`,
                });
            } else if (budget && amount > 0) {
                // 🟢 Under budget
                tips.push({
                    level: "success",
                    icon: "🟢",
                    message: `${category} looks good! ₹${remaining} remaining (${100 - percentage}% of budget left).`,
                });
            } else if (amount > 0) {
                // 💡 No budget set
                tips.push({
                    level: "info",
                    icon: "💡",
                    message: `${category} spending is ₹${amount}. No budget set — saving 10% gives ₹${Math.round(amount * 0.1)}.`,
                });
            }
        }

        // Sort: danger → warning → success → info
        const order = { danger: 0, warning: 1, success: 2, info: 3 };
        tips.sort((a, b) => order[a.level] - order[b.level]);

        return tips.length
            ? tips
            : [{ level: "success", icon: "🎉", message: `Great job 🎉 No overspending detected this ${viewMode}.` }];
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-[#0f0c29] via-[#1a1333] to-[#0f0c29] text-gray-200 px-4 sm:px-8 py-8">
            <div className="space-y-4">

                {/* Header */}
                <div className="relative flex items-center justify-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold bg-linear-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent tracking-wide">
                            Budget Planner
                        </h1>
                        <p className="text-gray-400 text-center text-sm ">Track and manage your spending limits</p>
                    </div>
                    <button
                        onClick={() => navigate("/add-budget")}
                        className="absolute right-0 px-5 py-2 bg-linear-to-r from-purple-600 to-emerald-400 rounded-lg font-semibold shadow-lg hover:scale-105 transition" >
                        + New Budget
                    </button>
                </div>

                {/* Toggle & Filters Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-5 shadow-xl">

                    <div className="flex flex-col md:flex-row justify-between gap-4">

                        {/* Toggle */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setViewMode("monthly")}
                                className={`px-5 py-2 rounded-lg font-medium transition ${viewMode === "monthly"
                                    ? "bg-purple-600 text-white shadow-lg"
                                    : "bg-gray-800 text-gray-400"
                                    }`}
                            >
                                Monthly
                            </button>

                            <button
                                onClick={() => setViewMode("yearly")}
                                className={`px-5 py-2 rounded-lg font-medium transition ${viewMode === "yearly"
                                    ? "bg-purple-600 text-white shadow-lg"
                                    : "bg-gray-800 text-gray-400"
                                    }`}
                            >
                                Yearly
                            </button>
                        </div>

                        {/* Filters */}
                        <div className="flex gap-4">
                            {viewMode === "monthly" && (
                                <select
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    className="bg-gray-900 border border-purple-700 rounded-lg px-4 py-2 text-gray-200 focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="">Select Month</option>
                                    {[
                                        "January", "February", "March", "April", "May", "June",
                                        "July", "August", "September", "October", "November", "December"
                                    ].map((m) => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
                            )}

                            {viewMode === "yearly" && (
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="bg-gray-900 border border-purple-700 rounded-lg px-4 py-2 text-gray-200 focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="">Select Year</option>
                                    {["2024", "2025", "2026", "2027"].map((y) => (
                                        <option key={y} value={y}>{y}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    <div className="bg-white/5 border border-purple-900/30 rounded-2xl p-4">
                        <p className="text-[11px] text-gray-500 mb-1">Total Budget</p>
                        <p className="text-xl font-bold text-purple-400">₹{totalBudget.toLocaleString("en-IN")}</p>
                        <p className="text-[10px] text-gray-500 mt-1">{filteredBudgets.length} categories</p>
                    </div>

                    <div className="bg-white/5 border border-purple-900/30 rounded-2xl p-4">
                        <p className="text-[11px] text-gray-500 mb-1">Total Spent</p>
                        <p className="text-xl font-bold text-pink-400">₹{totalSpent.toLocaleString("en-IN")}</p>
                        <p className="text-[10px] text-gray-500 mt-1">{budgetUsedPct}% of budget used</p>
                    </div>

                    <div className="bg-white/5 border border-purple-900/30 rounded-2xl p-4">
                        <p className="text-[11px] text-gray-500 mb-1">Remaining</p>
                        <p className={`text-xl font-bold ${remaining >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                            {remaining >= 0 ? "+" : ""}₹{Math.abs(remaining).toLocaleString("en-IN")}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-1">
                            {remaining >= 0 ? "✅ Under budget" : "⚠️ Over budget"}
                        </p>
                    </div>

                    <div className="bg-white/5 border border-purple-900/30 rounded-2xl p-4">
                        <p className="text-[11px] text-gray-500 mb-1">Budget Used</p>
                        <p className={`text-xl font-bold ${budgetUsedPct >= 100 ? "text-red-400" : budgetUsedPct >= 80 ? "text-yellow-400" : "text-emerald-400"}`}>
                            {budgetUsedPct}%
                        </p>
                        <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all ${budgetUsedPct >= 100 ? "bg-red-400" : budgetUsedPct >= 80 ? "bg-yellow-400" : "bg-emerald-400"}`}
                                style={{ width: `${Math.min(budgetUsedPct, 100)}%` }} />
                        </div>
                    </div>
                </div>

                {/* Empty state */}
                {filteredBudgets.length === 0 ? (
                    <div className="bg-white/5 border border-purple-900/30 rounded-2xl p-16 text-center">
                        <div className="text-5xl mb-4">💰</div>
                        <h3 className="text-lg font-bold text-gray-300 mb-2">No budgets yet</h3>
                        <p className="text-gray-500 text-sm mb-6">Create your first budget to start tracking</p>
                        <button onClick={() => navigate("/add-budget")}
                            className="px-6 py-2.5 bg-linear-to-r from-purple-600 to-emerald-400 rounded-xl font-semibold text-sm hover:scale-105 transition">
                            + New Budget
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Charts Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-6 shadow-xl">
                                <h2 className="text-md font-semibold text-gray-200 mb-1">
                                    Budget Goal
                                </h2>
                                <p className="text-[11px] text-gray-500 mb-4">How budget is split by category</p>
                                <BudgetChart
                                    budgets={budgets}
                                    selectedMonth={selectedMonth}
                                    selectedYear={selectedYear}
                                    viewMode={viewMode}
                                />
                            </div>

                            <div className="bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-6 shadow-xl">
                                <h2 className="text-md font-semibold text-gray-200 mb-1">
                                    Allocation by Category
                                </h2>
                                <p className="text-[11px] text-gray-500 mb-4">Spending progress per category</p>
                                <ProgressBars
                                    budgets={budgets}
                                    transactions={transactions}
                                    selectedMonth={selectedMonth}
                                    selectedYear={selectedYear}
                                    viewMode={viewMode}
                                />
                            </div>
                        </div>

                        {/* Saving Suggestions */}
                        <div className="bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-6 shadow-xl">

                            <div className="flex items-center gap-3 mb-4">
                                <h2 className="text-md font-semibold text-gray-200 ">
                                    Smart Saving Suggestions
                                </h2>
                                <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                                    AI Powered
                                </span>
                            </div>

                            <ul className="space-y-3">
                                {generateSavingTips(budgets, transactions, viewMode, selectedMonth, selectedYear).map((tip, i) => (
                                    <li
                                        key={i}
                                        className="bg-gray-900/60 p-3 rounded-lg border border-purple-800 text-gray-300 text-sm"
                                        style={{
                                            borderLeft: `4px solid ${tip.level === "danger" ? "#ef4444" :
                                                tip.level === "warning" ? "#f59e0b" :
                                                    tip.level === "success" ? "#10b981" : "#6366f1"
                                                }`,
                                            borderTop: "1px solid rgba(139, 92, 246, 0.2)",
                                            borderRight: "1px solid rgba(139, 92, 246, 0.2)",
                                            borderBottom: "1px solid rgba(139, 92, 246, 0.2)",
                                        }}
                                    >
                                        {tip.icon} {tip.message}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}


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
        <div className="min-h-screen bg-linear-to-br from-[#0f0c29] via-[#1a1333] to-[#0f0c29] text-gray-200 p-6 space-y-8">

            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold bg-linear-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent tracking-wide">
                    Budget Planner
                </h1>

                <button
                    onClick={() => navigate("/add-budget")}
                    className="px-5 py-2 bg-linear-to-r from-purple-600 to-emerald-400 rounded-lg font-semibold shadow-lg hover:scale-105 transition" >
                    + New Budget
                </button>
            </div>

            {/* Toggle & Filters Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-6 shadow-xl">

                <div className="flex flex-col md:flex-row justify-between gap-6">

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

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-6 shadow-xl">
                    <h2 className="text-xl font-semibold text-gray-200 mb-4">
                        Budget Goal
                    </h2>
                    <BudgetChart
                        budgets={budgets}
                        selectedMonth={selectedMonth}
                        selectedYear={selectedYear}
                        viewMode={viewMode}
                    />
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-6 shadow-xl">
                    <h2 className="text-xl font-semibold text-gray-200 mb-4">
                        Allocation by Category
                    </h2>
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
                <h2 className="text-xl font-semibold text-gray-200 mb-4">
                    Smart Saving Suggestions
                </h2>

                <ul className="space-y-3">
                    {generateSavingTips(budgets, transactions, viewMode, selectedMonth, selectedYear).map((tip, i) => (
                        <li
                            key={i}
                            className="bg-gray-900/60 p-3 rounded-lg border border-purple-800 text-gray-300"
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
        </div>
    );
}



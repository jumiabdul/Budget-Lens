import BarChart from "../components/BarChart";
import DoughnutChart from "../components/DoughnutChart";
import LineChart from "../components/LineChart";
import { CSVLink } from "react-csv";
import { useRef, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useSelector } from "react-redux";
import { getCurrentMonthYear } from "../utils/dateFilter.js";

export default function Reports() {
    const transactions = useSelector((state) => state.transactions);
    const budgets = useSelector((state) => state.budgets);

    const { month: defaultMonth, year: defaultYear } = getCurrentMonthYear();

    // Filter states
    const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
    const [selectedYear, setSelectedYear] = useState(defaultYear.toString());

    //refs for chart
    const doughnutRef = useRef(null);
    const lineRef = useRef(null);
    const barRef = useRef(null);

    // Get current date info
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth(); // 0-11
    const currentYearValue = currentDate.getFullYear();

    // All months
    const allMonths = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Get available months based on selected year
    const getAvailableMonths = () => {
        if (!selectedYear) return allMonths;

        if (parseInt(selectedYear) === currentYearValue) {
            // For current year, only show months up to current month
            return allMonths.slice(0, currentMonthIndex + 1);
        } else if (parseInt(selectedYear) < currentYearValue) {
            // For past years, show all months
            return allMonths;
        } else {
            // For future years, show no months (shouldn't happen with year filter)
            return [];
        }
    };

    // Get available years (only past and current years from transactions)
    const getAvailableYears = () => {
        const years = [...new Set(transactions.map(t => new Date(t.date).getFullYear()))];
        // Filter to only include current year and past years
        return years.filter(y => y <= currentYearValue).sort((a, b) => b - a);
    };

    // Filter transactions based on selected month/year
    const filteredTransactions = transactions.filter((t) => {
        const transactionDate = new Date(t.date);
        const transactionMonth = transactionDate.toLocaleString("default", { month: "long" });
        const transactionYear = transactionDate.getFullYear();

        const matchMonth = selectedMonth ? transactionMonth === selectedMonth : true;
        const matchYear = selectedYear ? transactionYear === parseInt(selectedYear) : true;

        return matchMonth && matchYear;
    });

    //totals
    const totalIncome = filteredTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpense = filteredTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const netSavings = totalIncome - totalExpense;
    const savingsRate = totalIncome > 0 ? Math.round((netSavings / totalIncome) * 100) : 0;

    //group transactions by category
    const expenseOnly = filteredTransactions.filter((t) => t.type === "expense");

    const categoryTotals = expenseOnly.reduce((obj, t) => {
        obj[t.category] = (obj[t.category] || 0) + Number(t.amount);
        return obj;
    }, {});

    const categories = Object.entries(categoryTotals).map(([name, amount]) => ({ name, amount })).sort((a, b) => b.amount - a.amount);

    const topCategory = categories[0]?.name || "—";
    const topAmount = categories[0]?.amount || 0;
    const avgDailyExp = expenseOnly.length > 0
        ? Math.round(totalExpense / Math.max(new Set(expenseOnly.map(t => t.date.split("T")[0])).size, 1))
        : 0;

    //PDF Exporting
    const exportPDF = () => {
        const doc = new jsPDF();

        const periodText = selectedMonth && selectedYear
            ? `${selectedMonth} ${selectedYear}`
            : selectedYear
                ? selectedYear
                : selectedMonth
                    ? selectedMonth
                    : "All Time";

        //title
        doc.setFontSize(22)
        doc.setTextColor(233, 30, 99);
        doc.text("Budget Lens Report", 14, 20)

        doc.setFontSize(14)
        doc.setTextColor(63, 81, 181);
        doc.text(`Financial Summary - ${periodText}`, 14, 30)

        //summary
        doc.setFontSize(12)
        doc.setTextColor(0, 0, 0);
        doc.text(`Total Income : INR ${totalIncome} `, 14, 45)
        doc.text(`Total Expenses : INR ${totalExpense} `, 14, 55)
        doc.setTextColor(34, 197, 94);
        doc.text(`Savings : INR ${totalIncome - totalExpense} `, 14, 65)

        //category breakdown table
        autoTable(doc, {
            head: [["Category", "Amount"]],
            body: categories.map(c => [c.name, c.amount]),
            startY: 80,
            styles: { fontSize: 10, cellPadding: 4 },
            headStyles: { fillColor: [99, 102, 241], textColor: [255, 255, 255], fontStyle: "bold" },
            alternateRowStyles: { fillColor: [250, 250, 250] }
        });

        //charts as images
        //console.log("Doughnut ref:", doughnutRef.current);
        //console.log("Bar ref:", barRef.current);
        //console.log("Line ref:", lineRef.current);
        if (doughnutRef.current && doughnutRef.current.canvas) {
            const imgData = doughnutRef.current.canvas.toDataURL("image/png");
            doc.addImage(imgData, "PNG", 14, doc.lastAutoTable.finalY + 20, 60, 80)
        }

        if (barRef.current && barRef.current.canvas) {
            const imgData = barRef.current.canvas.toDataURL("image/png");
            doc.addImage(imgData, "PNG", 110, doc.lastAutoTable.finalY + 20, 60, 80)
        }
        if (lineRef.current && lineRef.current.canvas) {
            const imgData = lineRef.current.canvas.toDataURL("image/png");
            doc.addImage(imgData, "PNG", 14, doc.lastAutoTable.finalY + 120, 150, 60)
        }

        //footer
        doc.setFontSize(10)
        doc.setTextColor(150);
        doc.text("Generated by Budget Lens", 14, 290)

        doc.save("Report.pdf")
    }

    //CSV Data
    const csvData = filteredTransactions.map((t) => ({
        Date: new Date(t.date).toLocaleDateString("en-IN"),
        Type: t.type,
        Category: t.category,
        Description: t.description,
        Amount:
            t.type === "income"
                ? `+${t.amount}`
                : `-${t.amount}`,
        Mode: t.mode,
    }));

    return (
        <div className="min-h-screen px-4 sm:px-8 py-8 bg-linear-to-br from-[#0f0c29] via-[#1a1333] to-[#0f0c29] text-gray-300">

            <div className="space-y-4">

                {/* Title */}
                <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-center gap-4 mb-6">

                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-center bg-linear-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                            Reports & Analytics
                        </h1>
                        <p className="text-gray-400 text-center text-sm mt-1">Detailed insights into your finances</p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 justify-center lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">

                        <CSVLink
                            data={csvData}
                            filename="Transactions.csv"
                            className="px-5 py-2 rounded-lg font-medium bg-linear-to-r from-purple-600 to-indigo-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-600/30">
                            Download CSV
                        </CSVLink>

                        <button
                            onClick={exportPDF}
                            className="px-5 py-2 rounded-lg font-medium bg-linear-to-r from-emerald-400 to-teal-500 text-black hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-500/30">
                            Export PDF
                        </button>
                    </div>
                </div>

                {/* Filter Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-5 shadow-xl">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">

                        {/* Year Filter */}
                        <select
                            value={selectedYear}
                            onChange={(e) => {
                                setSelectedYear(e.target.value);
                                setSelectedMonth(""); // Reset month when year changes
                            }}
                            className="w-full sm:w-auto bg-gray-900 border border-purple-700 rounded-lg px-4 py-2 text-gray-200 text-sm focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">All Years</option>
                            {getAvailableYears().map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>

                        {/* Month Filter */}
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            disabled={!selectedYear}
                            className="w-full sm:w-auto bg-gray-900 border border-purple-700 rounded-lg px-4 py-2 text-gray-200 text-sm focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <option value="">All Months</option>
                            {getAvailableMonths().map((m) => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>

                        {/* Clear Filter */}
                        {(selectedMonth || selectedYear) && (
                            <button
                                onClick={() => {
                                    setSelectedMonth("");
                                    setSelectedYear("");
                                }}
                                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-medium transition"
                            >
                                Clear Filters
                            </button>
                        )}

                        {/* Active Filter Indicator */}
                        {(selectedMonth || selectedYear) && (
                            <span className="text-xs text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                                Filtered: {selectedMonth || "All"} {selectedYear || "All"}
                            </span>
                        )}
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    <div className="bg-white/5 border border-purple-900/30 rounded-2xl p-4">
                        <p className="text-[11px] text-gray-500 mb-1">Total Income</p>
                        <p className="text-xl font-bold text-emerald-400">₹{totalIncome.toLocaleString("en-IN")}</p>
                        <p className="text-[10px] text-gray-500 mt-1">{filteredTransactions.filter(t => t.type === "income").length} transactions</p>
                    </div>

                    <div className="bg-white/5 border border-purple-900/30 rounded-2xl p-4">
                        <p className="text-[11px] text-gray-500 mb-1">Total Expenses</p>
                        <p className="text-xl font-bold text-pink-400">₹{totalExpense.toLocaleString("en-IN")}</p>
                        <p className="text-[10px] text-gray-500 mt-1">{filteredTransactions.filter(t => t.type === "expense").length} transactions</p>
                    </div>

                    <div className="bg-white/5 border border-purple-900/30 rounded-2xl p-4">
                        <p className="text-[11px] text-gray-500 mb-1">Net Savings</p>
                        <p className={`text-xl font-bold ${netSavings >= 0 ? "text-indigo-400" : "text-red-400"}`}>
                            {netSavings >= 0 ? "+" : ""}₹{Math.abs(netSavings).toLocaleString("en-IN")}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-1">{netSavings >= 0 ? "✅ Positive savings" : "⚠️ Overspending"}</p>
                    </div>

                    <div className="bg-white/5 border border-purple-900/30 rounded-2xl p-4">
                        <p className="text-[11px] text-gray-500 mb-1">Savings Rate</p>
                        <p className={`text-xl font-bold ${savingsRate >= 20 ? "text-emerald-400" : savingsRate >= 0 ? "text-yellow-400" : "text-red-400"}`}>
                            {savingsRate}%
                        </p>
                        <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all ${savingsRate >= 20 ? "bg-emerald-400" : savingsRate >= 0 ? "bg-yellow-400" : "bg-red-400"}`}
                                style={{ width: `${Math.max(0, Math.min(savingsRate, 100))}%` }} />
                        </div>
                    </div>

                </div>

                {/* Insights Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div className="bg-white/5 border border-purple-900/30 rounded-2xl p-4">
                        <p className="text-[11px] text-gray-500 mb-1">🔥 Top Spending Category</p>
                        <p className="text-lg font-bold text-orange-400">{topCategory}</p>
                        <p className="text-[10px] text-gray-500 mt-1">₹{topAmount.toLocaleString("en-IN")} spent</p>
                    </div>

                    <div className="bg-white/5 border border-purple-900/30 rounded-2xl p-4">
                        <p className="text-[11px] text-gray-500 mb-1">📊 Total Transactions</p>
                        <p className="text-lg font-bold text-purple-400">{filteredTransactions.length}</p>
                        <p className="text-[10px] text-gray-500 mt-1">this selected period</p>
                    </div>

                    <div className="bg-white/5 border border-purple-900/30 rounded-2xl p-4">
                        <p className="text-[11px] text-gray-500 mb-1">💡 Avg Daily Expense</p>
                        <p className="text-lg font-bold text-pink-400">₹{avgDailyExp.toLocaleString("en-IN")}</p>
                        <p className="text-[10px] text-gray-500 mt-1">per day (approx)</p>
                    </div>

                </div>

                {/* Empty state */}
                {filteredTransactions.length === 0 ? (
                    <div className="bg-white/5 border border-purple-900/30 rounded-2xl p-12 text-center">
                        <div className="text-5xl mb-3">📊</div>
                        <p className="font-semibold text-gray-300">No data for displaying Reports</p>
                        <p className="text-xs text-gray-500 mt-1">Add some transactions to see your reports</p>
                    </div>
                ) : (
                    <>
                        {/* CHART GRID */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* Doughnut Chart */}
                            <div className="bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-6 shadow-xl">

                                <h2 className="text-md font-semibold mb-1 text-gray-200">
                                    Spending Breakdown
                                </h2>
                                <p className="text-[11px] text-gray-500 mb-4">Expenses by category</p>

                                <div className="h-92">
                                    <DoughnutChart ref={doughnutRef} transactions={filteredTransactions} />
                                </div>
                            </div>

                            {/* Bar Chart */}
                            <div className="bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-6 shadow-xl">

                                <h2 className="text-md font-semibold mb-1 text-gray-200">
                                    Income vs Expense
                                </h2>
                                <p className="text-[11px] text-gray-500 mb-4">Weekly Comparison</p>

                                <div className="h-92">
                                    <BarChart ref={barRef} transactions={filteredTransactions} />
                                </div>
                            </div>
                        </div>

                        {/* Line Chart */}
                        <div className="mt-8 bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-6 shadow-xl">

                            <h2 className="text-md font-semibold mb-1 text-gray-200">
                                Spending Trend
                            </h2>
                            <p className="text-[11px] text-gray-500 mb-4">Over time</p>

                            <div className="h-92">
                                <LineChart ref={lineRef} transactions={filteredTransactions} />
                            </div>
                        </div>

                        {/*  Category Breakdown Table */}
                        {categories.length > 0 && (
                            <div className="bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-6 shadow-xl">

                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-md font-semibold text-gray-200">Category Breakdown</h2>
                                        <p className="text-[11px] text-gray-500 mt-0.5">Expenses sorted by amount</p>
                                    </div>

                                    <span className="text-[11px] text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-purple-900/20">
                                        {categories.length} categories
                                    </span>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-purple-500/20 text-gray-400 text-xs uppercase tracking-wider">
                                                <th className="pb-3 text-left w-1/3">Category</th>
                                                <th className="pb-3 text-left w-1/4">Amount Spent</th>
                                                <th className="pb-3 text-left w-1/6">% of Total</th>
                                                <th className="pb-3 text-left w-1/4">Share</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categories.map((c) => {
                                                const pct = totalExpense > 0 ? Math.round((c.amount / totalExpense) * 100) : 0;
                                                return (
                                                    <tr key={c.name} className="border-b border-purple-900/15 hover:bg-purple-900/10 transition-all">
                                                        <td className="py-3 font-semibold text-gray-200 w-1/3">{c.name}</td>
                                                        <td className="py-3 font-bold text-pink-400 w-1/4">₹{c.amount.toLocaleString("en-IN")}</td>
                                                        <td className="py-3 text-gray-400 text-xs w-1/6">{pct}%</td>
                                                        <td className="py-3 w-1/4">
                                                            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden w-36">
                                                                <div className="h-full rounded-full bg-linear-to-r from-purple-500 to-pink-500"
                                                                    style={{ width: `${pct}%` }} />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
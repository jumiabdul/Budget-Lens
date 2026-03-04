import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { useRef, useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BudgetChart({ budgets, selectedMonth, selectedYear, viewMode }) {
    const transactions = useSelector((state) => state.transactions);
    const chartRef = useRef(null);
    const [gradient, setGradient] = useState(null);

    // Filtered Budget
    let filteredBudgets = [];

    if (viewMode === "monthly") {
        filteredBudgets = budgets.filter(
            (b) =>
                (!selectedMonth || b.month === selectedMonth)
            // && (!selectedYear || b.year === selectedYear)
        );
    } else if (viewMode === "yearly") {
        filteredBudgets = budgets.filter(
            (b) => !selectedYear || b.year === selectedYear
        );
    }

    const budgetObj = filteredBudgets.reduce((acc, b) => {
        acc[b.category] = (acc[b.category] || 0) + b.amount;
        return acc;
    }, {});

    // Filetered Transactions
    let filteredTransactions = [];

    if (viewMode === "monthly") {
        filteredTransactions = transactions.filter((t) => {
            const onlyMonth = new Date(t.date).toLocaleString("default", {
                month: "long",
            });
            //  const onlyYear = new Date(t.date).getFullYear().toString();
            return (
                (!selectedMonth || onlyMonth === selectedMonth) &&
                // (!selectedYear || onlyYear === selectedYear) &&
                t.type === "expense"
            );
        });
    } else if (viewMode === "yearly") {
        filteredTransactions = transactions.filter((t) => {
            const onlyYear = new Date(t.date).getFullYear().toString();
            return (
                (!selectedYear || onlyYear === selectedYear) &&
                t.type === "expense"
            );
        });
    }

    const categoryTotals = filteredTransactions.reduce((obj, t) => {
        obj[t.category] = (obj[t.category] || 0) + Number(t.amount);
        return obj;
    }, {});

    const totalBudget = Object.values(budgetObj).reduce(
        (a, b) => a + b,
        0
    );
    const totalExpense = Object.values(categoryTotals).reduce(
        (a, b) => a + b,
        0
    );

    const totalRemaining = totalBudget - totalExpense;

    const isOverspent = totalExpense > totalBudget;

    // Create Gradient
    useEffect(() => {
        if (!chartRef.current) return;

        const chart = chartRef.current;
        const ctx = chart.ctx;

        const grad = ctx.createLinearGradient(0, 0, 0, 250);

        if (isOverspent) {
            //Red gradient
            grad.addColorStop(0, "#ef4444");
            grad.addColorStop(1, "#7f1d1d");
        } else {
            //Indigo gradient
            grad.addColorStop(0, "#6366f1");
            grad.addColorStop(1, "#4f46e5");
        }
        setGradient(grad);
        chart.update();
    }, [totalBudget, totalExpense, isOverspent]);

    const data = {
        labels: ["Remaining Budget", "Expenses"],
        datasets: [
            {
                data: [
                    totalRemaining > 0 ? totalRemaining : 0,
                    totalExpense
                ],
                backgroundColor: [
                    gradient ?? (isOverspent ? "#ef4444" : "#6366f1"),
                    isOverspent ? "#ef4444" : "#475569",
                ],
                borderColor: "#141625",
                borderWidth: 3,
                hoverOffset: 12,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "78%",
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: "#94a3b8",
                    font: { size: 13, weight: "500" },
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `₹${context.raw.toLocaleString("en-IN")}`;
                    },
                },
            },
        },
    };

    if (filteredBudgets.length === 0) {
        return (
            <p className="text-gray-400">
                No budget data {viewMode === "monthly" ? selectedMonth : selectedYear}
            </p>
        );
    }

    return (
        <div className="w-full h-72 rounded-2xl p-4">
            <Doughnut ref={chartRef} data={data} options={options} />
        </div>
    );
}
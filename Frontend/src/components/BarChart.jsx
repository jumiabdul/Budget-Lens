import { useSelector } from "react-redux";
import React, { forwardRef } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

// function to get week number from date
function getWeek(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    return Math.ceil(day / 7);
}

const BarChart = forwardRef((props, ref) => {
    const transactions = useSelector((state) => state.transactions);

    // group transactions by week
    const weeklyTotals = transactions.reduce((obj, t) => {
        const week = `Week ${getWeek(t.date)}`;

        if (!obj[week]) obj[week] = { income: 0, expense: 0 };

        if (t.type === "income") {
            obj[week].income += Number(t.amount);
        } else {
            obj[week].expense += Number(t.amount);
        }
        return obj;
    }, {});

    // calculate balance data
    let balance = 0;
    const weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
    const expenseData = [];
    const balanceData = [];

    weeks.forEach((week) => {
        const income = weeklyTotals[week]?.income || 0;
        const expense = weeklyTotals[week]?.expense || 0;

        balance = balance + income - expense;

        expenseData.push(expense);
        balanceData.push(balance);
    });

    const data = {
        labels: weeks,
        datasets: [
            {
                label: "Balance",
                data: balanceData,
                backgroundColor: "rgba(99, 102, 241, 0.85)", // Indigo
                borderRadius: 12,
                barThickness: 28,
            },
            {
                label: "Expenses",
                data: expenseData,
                backgroundColor: "rgba(20, 184, 166, 0.85)", // Teal
                borderRadius: 12,
                barThickness: 28,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: 10,
        },
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: "#cbd5e1",
                    font: {
                        size: 13,
                    },
                },
            },
            tooltip: {
                backgroundColor: "#1e293b",
                titleColor: "#ffffff",
                bodyColor: "#e2e8f0",
                borderColor: "rgba(255,255,255,0.1)",
                borderWidth: 1,
                callbacks: {
                    label: function (context) {
                        return `₹ ${context.raw}`;
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    color: "rgba(255,255,255,0.04)",
                },
                ticks: {
                    color: "#94a3b8",
                },
            },
            y: {
                grid: {
                    color: "rgba(255,255,255,0.05)",
                },
                ticks: {
                    color: "#94a3b8",
                    callback: function (value) {
                        return `₹ ${value}`;
                    },
                },
            },
        },
    };

    return (
        <div className="w-full h-64 sm:h-72 md:h-96 mt-5 bg-[#0f0c29]/60 backdrop-blur-lg rounded-2xl p-4 border border-purple-500/20 shadow-lg">
            <Bar ref={ref} data={data} options={options} />
        </div>
    );
});

export default BarChart;
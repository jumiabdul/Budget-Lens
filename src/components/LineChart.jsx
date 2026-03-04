import { useSelector } from "react-redux";
import React, { forwardRef } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Filler
);

// function to get week number
function getWeek(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    return Math.ceil(day / 7);
}

const LineChart = forwardRef((props, ref) => {
    const transactions = useSelector((state) => state.transactions);

    const weeklyTotals = transactions.reduce((obj, t) => {
        const week = `Week ${getWeek(t.date)}`;

        if (!obj[week]) obj[week] = { income: 0, expense: 0 };

        if (t.type === "income")
            obj[week].income += Number(t.amount);
        else
            obj[week].expense += Number(t.amount);

        return obj;
    }, {});

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
                borderColor: "#6366f1",
                backgroundColor: "rgba(99,102,241,0.08)",
                pointBackgroundColor: "#6366f1",
                pointBorderColor: "#0B0B1A",
                pointRadius: 5,
                pointHoverRadius: 7,
                borderWidth: 3,
                tension: 0.4,
                fill: true,
            },
            {
                label: "Expense",
                data: expenseData,
                borderColor: "#14b8a6",
                backgroundColor: "rgba(20,184,166,0.12)",
                pointBackgroundColor: "#14b8a6",
                pointBorderColor: "#0B0B1A",
                pointRadius: 5,
                pointHoverRadius: 7,
                borderWidth: 3,
                tension: 0.4,
                fill: true,
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
                    color: "#94a3b8",
                    font: { size: 13 },
                },
            },
            tooltip: {
                backgroundColor: "#0f172a",
                titleColor: "#ffffff",
                bodyColor: "#e2e8f0",
                borderColor: "#7c3aed",
                borderWidth: 1,
                callbacks: {
                    label: function (context) {
                        return `₹ ${context.raw}`;
                    },
                },
            },
        },
        animation: {
            duration: 2000,
            easing: "easeOutQuart",
        },
        scales: {
            x: {
                grid: {
                    color: "rgba(148, 163, 184, 0.05)",
                },
                ticks: {
                    color: "#64748b",
                },
            },
            y: {
                grid: {
                    color: "rgba(148,163,184,0.08)",
                },
                ticks: {
                    color: "#64748b",
                    callback: function (value) {
                        return `₹ ${value}`;
                    },
                },
            },
        },
    };

    return (
        <div className="w-full h-64 sm:h-72 md:h-96 mt-5 bg-[#0f0c29]/60 backdrop-blur-lg rounded-2xl p-4 border border-purple-500/20 shadow-lg">
            <Line ref={ref} data={data} options={options} />
        </div>
    );
});

export default LineChart;
import { useSelector } from "react-redux";
import React, { forwardRef } from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const DoughnutChart = forwardRef((props, ref) => {
    const transactions = useSelector((state) => state.transactions);

    // Group transactions by category (expense only)
    const expenseOnly = transactions.filter((t) => t.type === "expense");

    const categoryTotals = expenseOnly.reduce((obj, t) => {
        obj[t.category] = (obj[t.category] || 0) + Number(t.amount);
        return obj;
    }, {});

    const labels = Object.keys(categoryTotals);
    const values = Object.values(categoryTotals);

    const data = {
        labels: labels,
        datasets: [
            {
                data: values,
                backgroundColor: [
                    "rgba(99, 102, 241, 0.8)",
                    "rgba(20, 184, 166, 0.8)",
                    "rgba(148, 163, 184, 0.8)",
                    "rgba(71, 85, 105, 0.8)",
                    "rgba(129, 140, 248, 0.8)",
                    "rgba(45, 212, 191, 0.8)",
                    "rgba(100, 116, 139, 0.8)",
                    "rgba(79, 70, 229, 0.8)",
                ],
                borderColor: "rgba(255,255,255,0.08)",
                borderWidth: 2,
                hoverOffset: 10,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "72%",
        layout: {
            padding: {
                top: 20,
                bottom: 20,
                left: 20,
                right: 20,
            },
        },
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: "#e5e7eb",
                    font: {
                        size: 12,
                    },
                    padding: 10,
                    boxWidth: 12,
                },
            },
            tooltip: {
                backgroundColor: "#111827",
                titleColor: "#ffffff",
                bodyColor: "#d1d5db",
                borderColor: "#7c3aed",
                borderWidth: 1,
                callbacks: {
                    label: function (context) {
                        return `₹ ${context.raw}`;
                    },
                },
            },
        },
    };

    return (
        <div className=" relative w-full h-full sm:h-72 md:h-96 mt-5 bg-[#0f0c29]/60 backdrop-blur-lg rounded-2xl p-4 border border-purple-500/20 shadow-lg overflow-hidden">
            <Doughnut ref={ref} data={data} options={options} />
        </div>
    );
});

export default DoughnutChart;
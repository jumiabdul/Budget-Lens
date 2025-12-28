import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement, Tooltip, Legend,
} from "chart.js";

ChartJS.register(
    ArcElement, Tooltip, Legend
);

export default function BudgetChart({ budgets = [], selectedMonth }) {
    const transactions = useSelector((state) => state.transactions);

    //filter budgets for selected month
    const monthBudgets = budgets.filter((b) => b.month === selectedMonth);

    //convert array to object
    const budgetObj = monthBudgets.reduce((acc, b) => {
        acc[b.category] = b.amount;
        return acc;
    }, {});

    //filter transactions for that month
    const monthTransactions = transactions.filter((t) => {
        const onlyMonth = new Date(t.date).toLocaleString("default", { month: "long" });
        return onlyMonth === selectedMonth && t.type === "expense";
    }
    );

    //calculate expenses by category
    const categoryTotals = monthTransactions.reduce((obj, t) => {
        obj[t.category] = (obj[t.category] || 0) + Number(t.amount);
        return obj;
    }, {});

    //remaining budget per category
    const remainingByCategory = Object.keys(budgetObj).reduce((obj, cat) => {
        const planned = budgetObj[cat] || 0;
        const spent = categoryTotals[cat] || 0;
        obj[cat] = planned - spent;
        return obj;
    }, {});

    //totals
    const totalBudget = Object.values(budgetObj).reduce((a, b) => a + b, 0)
    const totalExpense = Object.values(categoryTotals).reduce((a, b) => a + b, 0)
    const totalRemaining = totalBudget - totalExpense;

    const data = {
        labels: ["Remaining Budget", "Expenses"],
        datasets: [
            {
                data: [totalRemaining, totalExpense],
                backgroundColor: [
                    "#00A86B",
                    "#8B0000",],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    font: { size: 14 },
                    color: "#333"
                },
            },
        },
    }

    if (monthBudgets.length === 0) {
        return <p className="text-gray-500">No budget data {selectedMonth}</p>
    }
    return (
        <div className="w-full h-64 sm:h-72 md:h-96">
            <Doughnut data={data} options={options} />
        </div>
    )
}




import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement, Tooltip, Legend,
} from "chart.js";

ChartJS.register(
    ArcElement, Tooltip, Legend
);

export default function BudgetChart({ budgets, selectedMonth, selectedYear, viewMode }) {
    const transactions = useSelector((state) => state.transactions);

    //filter budgets by viewmode
    let filteredBudgets = []

    if (viewMode == "monthly") {
        filteredBudgets = budgets.filter((b) =>
            (!selectedMonth || b.month === selectedMonth) &&
            (!selectedYear || b.year === selectedYear));

    } else if (viewMode == "yearly") {
        filteredBudgets = budgets.filter((b) =>
            !selectedYear || b.year === selectedYear);
    }

    //convert budget array to object
    const budgetObj = filteredBudgets.reduce((acc, b) => {
        acc[b.category] = b.amount;
        return acc;
    }, {});

    //filter transactions based on viewmode
    let filteredTransactions = [];
    if (viewMode === "monthly") {
        filteredTransactions = transactions.filter((t) => {
            const onlyMonth = new Date(t.date).toLocaleString("default", { month: "long" });
            const onlyYear = new Date(t.date).getFullYear().toString();
            return (
                (!selectedMonth || onlyMonth === selectedMonth) &&
                (!selectedYear || onlyYear === selectedYear) && t.type === "expense"
            )
        }
        )
    } else if (viewMode === "yearly") {
        filteredTransactions = transactions.filter((t) => {
            const onlyYear = new Date(t.date).getFullYear().toString();
            return (!selectedYear || onlyYear === selectedYear) && t.type === "expense"
        })
    }

    //calculate expenses by category
    const categoryTotals = filteredTransactions.reduce((obj, t) => {
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

    if (filteredBudgets.length === 0) {
        return <p className="text-gray-500">No budget data {viewMode === "monthly" ? selectedMonth : selectedYear}</p>
    }
    return (
        <div className="w-full h-64 sm:h-72 md:h-96">
            <Doughnut data={data} options={options} />
        </div>
    )
}




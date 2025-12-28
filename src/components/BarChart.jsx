import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale, LinearScale, BarElement, Tooltip, Legend,
} from "chart.js"

ChartJS.register(
    CategoryScale, LinearScale, BarElement, Tooltip, Legend
)

//function to get week number from date
function getWeek(dateString) {
    const date = new Date(dateString)
    const day = date.getDate()
    return Math.ceil(day / 7)
}

export default function BarChart() {
    const transactions = useSelector((state) => state.transactions);

    //group transactions by week
    const weeklyTotals = transactions.reduce((obj, t) => {
        const week = `Week ${getWeek(t.date)}`

        if (!obj[week]) obj[week] = { income: 0, expense: 0 };
        if (t.type === "income")
            obj[week].income += Number(t.amount)
        else
            obj[week].expense += Number(t.amount)

        return obj;
    }, {});

    // calculate balance data
    let balance = 0
    const weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
    const expenseData = []
    const balanceData = []

    weeks.forEach((week) => {
        const income = weeklyTotals[week]?.income || 0
        const expense = weeklyTotals[week]?.expense || 0

        balance = balance + income - expense;

        expenseData.push(expense)
        balanceData.push(balance)
    })

    const data = {
        labels: weeks,
        datasets: [
            {
                label: "Income",
                data: balanceData,
                backgroundColor: "#006400",
            },
            {
                label: "Expenses",
                data: expenseData,
                backgroundColor: "#8B0000",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
            },
        },
        scales: {
            y: {
                Ticks: {
                    callback: (value) => `₹${value}`
                }
            }
        }
    };

    return (
        <div className="w-full h-64 sm:h-72 md:h-96 mt-5">
            <Bar data={data} options={options} />
        </div>
    )
}

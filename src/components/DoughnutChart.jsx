import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement, Tooltip, Legend,
} from "chart.js"

ChartJS.register(
    ArcElement, Tooltip, Legend
)

export default function DoughnutChart() {
    const transactions = useSelector((state) => state.transactions);

    //group transactions by category
    const expenseOnly = transactions.filter((t) => t.type === "expense");

    const categoryTotals = expenseOnly.reduce((obj, t) => {
        obj[t.category] = (obj[t.category] || 0) + Number(t.amount);
        return obj;
    }, {});

    const data = {
        labels: Object.keys(categoryTotals),
        datasets: [
            {
                data: Object.values(categoryTotals),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                    "#00A86B",
                    "#C71585",
                    "#FFD700",
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
}
    

return (
    <div className="w-full h-64 sm:h-72 md:h-96">
        <Doughnut data={data} options={options}   />
    </div>
)

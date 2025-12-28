import BarChart from "../components/BarChart";
import DoughnutChart from "../components/DoughnutChart";
import LineChart from "../components/LineChart";

export default function Reports() {
    return (
        <div className="min-h-screen space-y-6 p-6 bg-linear-to-br from-indigo-100 to-purple-100">

            <h1 className=" text-2xl text-center text-pink-600 font-bold mb-2">Reports and Analytics</h1>
            <div className="flex space-x-5 items-end justify-end">
                <button className="px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-md font-semibold hover:opacity-90">Download CSV</button>
                <button className="px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-md font-semibold hover:opacity-90">Download PDF</button>
            </div>
            
            <div className="text-md text-purple-900 font-semibold">Monthly View</div>

            <div className="mt-3 flex space-x-5">
                
                {/*Doughnut Chart that shows expenses*/}
                <div className="bg-white w-1/2 rounded-xl shadow p-4">
                    <h2 className="text-lg font-semibold">Spending Breakdown</h2>
                    <DoughnutChart />
                </div>

                {/*Bar Chart that compare expense and income*/}
                <div className="bg-white w-1/2 rounded-xl shadow p-4">
                    <h2 className="text-lg font-semibold">Income v/s Expense</h2>
                    <BarChart />
                </div>
            </div>

            {/*Line Chart that shows Spending and Earning*/}
            <div className="bg-white rounded-xl shadow p-4">
                <h2 className="text-lg font-semibold">Spending as Graph</h2>
                <LineChart />
            </div>

        </div>
    )
}
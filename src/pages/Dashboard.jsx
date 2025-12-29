import { useSelector } from "react-redux"
import AddIncome from "./AddIncome"
import AddExpense from "./AddExpense"
import DoughnutChart from "../components/DoughnutChart";
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
    const transactions = useSelector((state) => state.transactions)

    const income = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expense;

    const navigate = useNavigate();

    return (

        <div className="min-h-screen space-y-6 p-6 bg-linear-to-br from-indigo-100 to-purple-100">

            {/*Summary Cards*/}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl shadow p-4">
                    <p className="text-sm text-gray-500">Total Balance</p>
                    <p className="text-2xl font-bold mt-2">₹{balance}</p>
                </div>
                <div className="bg-white rounded-xl shadow p-4">
                    <p className="text-sm text-gray-500">Income</p>
                    <p className="text-2xl font-bold text-green-500 mt-2">₹{income}</p>
                </div>
                <div className="bg-white rounded-xl shadow p-4">
                    <p className="text-sm text-gray-500">Expenses</p>
                    <p className="text-2xl font-bold text-red-500 mt-2">₹{expense}</p>
                </div>
            </div>

            {/*Left content*/}
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                <div className="space-y-6">

                    {/*Spending Categories*/}
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Spending Categories</h2>
                            <p className="text-sm text-gray-500">This month</p>
                        </div>
                        <DoughnutChart />
                    </div>
                </div>

                {/*Right Content*/}
                <div className="space-y-6" >

                    {/*Quick actions*/}
                    <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                        <div className="flex flex-wrap gap-4">
                            <button onClick={()=>navigate("/add-expense")}
                            className="w-40 py-3 px-3 rounded-2xl bg-red-500 text-white font-medium hover:bg-red-700 hover:cursor-pointer">
                                Add Expense
                            </button>
                            <button onClick={()=>navigate("/add-income")}
                            className="w-40 py-3 px-3 rounded-2xl bg-green-500 text-white font-medium hover:bg-green-700 hover:cursor-pointer">
                                Add Income
                            </button>
                            <button onClick={()=>navigate("/reports")}
                            className="w-40 py-3 px-3 rounded-2xl bg-purple-500 text-white font-medium hover:bg-purple-700 hover:cursor-pointer">
                                View Reports
                            </button>
                        </div>
                    </div>

                    {/*Recent Activity*/}
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex items-center justify-between">
                            <h4 className="text-md text-black font-semibold">Recent Activity</h4>
                            <button onClick={()=>navigate("/transactions")}
                            className=" py-1 px-3 rounded-2xl bg-violet-500 text-white font-medium hover:bg-violet-700 hover:cursor-pointer">
                                View Transactions
                            </button>
                        </div>
                        <ul className="mt-3 space-y-3">
                            {transactions.slice(-5).reverse().map((t) => (
                                <li key={t.id} className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium">{t.category}</p>
                                        <p className="text-xs text-gray-600">{t.date}</p>
                                    </div>
                                    <p className={`text-sm ${t.type === "income" ? "text-green-600" : "text-red-600"}`}>
                                        {t.type === "income" ? "+" : "-"}₹{t.amount}</p>

                                </li>
                            )
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
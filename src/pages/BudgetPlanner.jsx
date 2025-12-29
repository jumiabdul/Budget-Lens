import { useSelector } from "react-redux";
import React, { useState } from "react";
import BudgetChart from "../components/BudgetChart";
import ProgressBars from "../components/ProgressBars";
import { useNavigate } from "react-router-dom"


export default function BudgetPlanner() {
    const budgets = useSelector((state) => state.budgets)
    const transactions = useSelector((state) => state.transactions);

    const [selectedMonth, setSelectedMonth] = useState("");

    function generateSavingTips(budgets, transactions, selectedMonth) {
        const expenseOnly = transactions.filter((t) => t.type === "expense");

        const categoryTotals = expenseOnly.reduce((obj, t) => {
            const onlyMonth = new Date(t.date).toLocaleString("default", { month: "long" });
            if (!selectedMonth || onlyMonth === selectedMonth) {
                obj[t.category] = (obj[t.category] || 0) + Number(t.amount);
            }
            return obj;
        }, {});

        const tips=[];

        for (const [category, amount] of Object.entries(categoryTotals)) {
            const budget = budgets.find((b) => b.category === category &&
                (!selectedMonth || b.month === selectedMonth))?.amount || 0;

            if (budget && amount > budget) {
                tips.push(`You overspent on ${category} by ${amount - budget}. Cutting back here could improve savings.`)
            }
            else if (amount > 0) {
                tips.push(`Your ${category} spending is ${amount}. Reducing it by 10% saves ₹${Math.round(amount * 0.1)}.`)
            }
        }
        return tips.length ? tips : ["Great job !! No Overspending detected this month."]
    }


    const navigate = useNavigate();

    return (
        <div className="min-h-screen space-y-6 p-6 bg-linear-to-br from-indigo-100 to-purple-100">
            <h1 className=" text-2xl text-center text-pink-600 font-bold mb-2">Budget Planner</h1>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-around mt-5 bg-white rounded-xl shadow-md p-4 gap-4">
                {/*Month field*/}
                <div className="w-full sm:w-1/2">
                    <label className="text-sm text-left font-medium text-gray-700 block">Category</label>
                    <select required value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400" >
                        <option value="">Select Month</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                </div>

                <button onClick={() => navigate("/add-budget")}
                    className="px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-md font-semibold hover:opacity-90 hover:cursor-pointer ">Set Budget</button>
            </div>

            <div className="mt-3 flex space-x-5">

                {/*Budget Chart*/}
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 w-full gap-5">
                    <div className="bg-white rounded-xl shadow p-4 w-full">
                        <h2 className="text-lg font-semibold">Budget Goal</h2>
                        <BudgetChart budgets={budgets} selectedMonth={selectedMonth} />
                    </div>

                    {/*Progressbar of each categories*/}
                    <div className="bg-white rounded-xl shadow p-4 w-full">
                        <h2 className="text-lg font-semibold">Budget Allocation by Category</h2>
                        <ProgressBars budgets={budgets} transactions={transactions} selectedMonth={selectedMonth} />
                    </div>
                </div>
            </div>

            {/*Saving Suggestion*/}
            <div className="bg-white rounded-xl shadow p-4">
                <h2 className="text-lg font-semibold">Saving Suggestion</h2>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                    {generateSavingTips(budgets,transactions,selectedMonth).map((tip,i)=>(
                    <li key={i} className="text-md text-gray-700">{tip}</li>
                    ))}
                </ul>
            </div>
        </div >

    )
}
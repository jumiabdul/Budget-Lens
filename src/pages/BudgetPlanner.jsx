import { useSelector } from "react-redux";
import React, { useState } from "react";
import BudgetChart from "../components/BudgetChart";
import ProgressBars from "../components/ProgressBars";

export default function BudgetPlanner() {
    const budgets = useSelector((state) => state.budgets)
    const transactions = useSelector((state) => state.transactions);

    const [selectedMonth, setSelectedMonth] = useState("");

    return (
        <div className="min-h-screen space-y-6 p-6 bg-linear-to-br from-indigo-100 to-purple-100">
            <h1 className=" text-2xl text-center text-pink-600 font-bold mb-2">Budget Planner</h1>

            <div className="flex items-center justify-around mt-5 bg-white rounded-xl shadow-md p-4">
                {/*Month field*/}
                <div>
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

                <button className="px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-md font-semibold hover:opacity-90 ">Set Budget</button>
            </div>

            <div className="mt-3 flex space-x-5">

                {/*Budget Chart*/}
                <div className="bg-white w-1/2 rounded-xl shadow p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Budget Goal</h2>
                        <button className="px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-md font-semibold hover:opacity-90 ">Edit Budget</button>
                    </div>
                    <BudgetChart budgets={budgets} selectedMonth={selectedMonth} />
                </div>

                {/*Progressbar of each categories*/}
                <div className="bg-white w-1/2 rounded-xl shadow p-4">
                    <h2 className="text-lg font-semibold">Budget Allocation by Category</h2>
                    <ProgressBars budgets={budgets} transactions={transactions} selectedMonth={selectedMonth} />
                </div>
            </div>

            {/*Saving Suggestion*/}
            <div className="bg-white rounded-xl shadow p-4">
                <h2 className="text-lg font-semibold">Saving Suggestion</h2>
            </div>
        </div>

    )
}

export default function BudgetPlanner() {
    return (
        <div className="min-h-screen space-y-6 p-6 bg-linear-to-br from-indigo-100 to-purple-100">
            <h1 className=" text-2xl text-center text-pink-600 font-bold mb-2">Budget Planner</h1>
            <div className="flex items-end justify-end">
                <button className="px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-md font-semibold hover:opacity-90 ">Set Budget</button>
            </div>
            <div className="mt-3 flex space-x-5">
                <div className="bg-white w-1/2 rounded-xl shadow p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Budget Goal</h2>
                        <button className="px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-md font-semibold hover:opacity-90 ">Edit Budget</button>
                    </div>
                </div>
                <div className="bg-white w-1/2 rounded-xl shadow p-4">
                    <h2 className="text-lg font-semibold">Saving Suggestion</h2>
                </div>
            </div>
            <div className="bg-white rounded-xl shadow p-4">
                <h2 className="text-lg font-semibold">Budget Allocation by Category</h2>
            </div>
        </div>

    )
}
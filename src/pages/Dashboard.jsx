
export default function Dashboard() {
    return (

        <div className="min-h-screen space-y-6 p-6 bg-linear-to-br from-indigo-100 to-purple-100">

            {/*Summary Cards*/}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-xl shadow p-4">
                    <p className="text-sm text-gray-500">Total Balance</p>
                    <p className="text-2xl font-bold mt-2">₹</p>
                </div>
                <div className="bg-white rounded-xl shadow p-4">
                    <p className="text-sm text-gray-500">Income</p>
                    <p className="text-2xl font-bold text-green-500 mt-2">₹</p>
                </div>
                <div className="bg-white rounded-xl shadow p-4">
                    <p className="text-sm text-gray-500">Expenses</p>
                    <p className="text-2xl font-bold text-red-500 mt-2">₹</p>
                </div>
            </div>

            {/*Left content*/}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-6">

                    {/*Spending Categories*/}
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Spending Categories</h2>
                            <p className="text-sm text-gray-500">This month</p>
                        </div>
                    </div>
                </div>

                {/*Right Content*/}
                <div className="space-y-6" >

                    {/*Quick actions*/}
                    <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                        <div className="space-x-6">
                            <button className="w-40 py-3 px-3 rounded-2xl bg-red-500 text-white font-medium hover:bg-red-700">
                                Add Expense
                            </button>
                            <button className="w-40 py-3 px-3 rounded-2xl bg-green-500 text-white font-medium hover:bg-green-700">
                                Add Income
                            </button>
                            <button className="w-40 py-3 px-3 rounded-2xl bg-purple-500 text-white font-medium hover:bg-purple-700">
                                View Reports
                            </button>
                        </div>
                    </div>

                    {/*Recent Activity*/}
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex items-center justify-between">
                            <h4 className="text-md text-black font-semibold">Recent Activity</h4>
                            <button className="w-40 py-1 px-3 rounded-2xl bg-violet-500 text-white font-medium hover:bg-violet-700">
                                View Transactions
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
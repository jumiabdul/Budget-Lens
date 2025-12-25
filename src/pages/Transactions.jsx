
const transactions = [
    { date: "April 30,2024", description: "Grocery shopping", category: "Bills", amount: 2000, ModeOfTransaction: "Cash" },
    { date: "April 15,2024", description: "Metro recharge", category: "Transport", amount: 1000, ModeOfTransaction: "Gpay" },
    { date: "April 4,2024", description: "Dining out", category: "Food", amount: 4000, ModeOfTransaction: "Gpay" },
    { date: "April 27,2024", description: "School fees", category: "Education", amount: 50000, ModeOfTransaction: "Cash" },
    { date: "April 9,2024", description: "Rent", category: "Housing", amount: 20000, ModeOfTransaction: "Credit Card" }

]

export default function Transactions() {
    return (
        <div className="min-h-screen bg-linear-to-br from-indigo-100 to-purple-100">
            <div className="space-y-6 p-4">
                
                <h1 className="text-2xl text-center text-pink-600 font-bold">Transaction History</h1>
                
                <div className="flex items-center justify-around mt-5 bg-white rounded-xl shadow-md p-4">
                    <input type="text" placeholder="Search for transactions..."
                        className="mt-1 w-1/3 rounded-xl border border-gray-300 px-4 py-2 text-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                    <select className="border-2 border-blue-950 p-2 rounded">
                        <option value="" className="text-purple-600 font-bold">Search by</option>
                        <option className="text-purple-600 font-bold">Category</option>
                        <option className="text-purple-600 font-bold">Month</option>
                        <option className="text-purple-600 font-bold">Year</option>
                    </select>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-4">
                    <table className="mt-5 w-full ">
                        <thead>
                            <tr className="mt-5 border-2 border-purple-900 ">
                                <th className="p-3">Date </th>
                                <th>Category </th>
                                <th>Description </th>
                                <th>Amount </th>
                                <th>Mode of Transaction </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((tx, index) => (
                                <tr key={index} className=" text-center border border-purple-600">
                                    <td className="py-2 px-5">{tx.date}</td>
                                    <td >{tx.category}</td>
                                    <td >{tx.description}</td>
                                    <td >{tx.amount}</td>
                                    <td >{tx.ModeOfTransaction}</td>
                                    <td>
                                        <button className="mr-2 hover:cursor-pointer">✎</button>
                                        <button className=" hover:cursor-pointer">🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
import { useSelector, useDispatch } from "react-redux"
import { deleteTransaction } from "../store/slices/transactionSlice"

export default function Transactions() {
    const transactions = useSelector((state) => state.transactions);
    const dispatch = useDispatch();
    const handleDelete = (id) => {
        dispatch(deleteTransaction(id));
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-indigo-100 to-purple-100">
            <div className="space-y-6 p-4">
                <h1 className="text-2xl text-center text-pink-600 font-bold">Transaction History</h1>

                {/*Seaching and Filtering of transactions */}
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

                {/*Table showing transactions */}
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
                            {transactions.slice().reverse().map((t) => (
                                <tr key={t.id} className=" text-center border border-purple-600">
                                    <td className="py-2 px-5">{t.date}</td>
                                    <td >{t.category}</td>
                                    <td >{t.note}</td>
                                    <td className={`text-sm ${t.type === "income" ? "text-green-600" : "text-red-600"}`} >
                                        {t.type === "income" ? "+" : "-"}{t.amount}</td>
                                    <td >{t.mode}</td>
                                    <td>
                                        <button className="mr-2 hover:cursor-pointer">✎</button>
                                        <button onClick={() => handleDelete(t.id)}
                                            className=" hover:cursor-pointer">🗑️</button>
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
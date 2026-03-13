import { useSelector, useDispatch } from "react-redux"
import { useState } from "react";
import { deleteTransaction, editTransaction } from "../store/slices/transactionSlice"
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";

const EXPENSE_CATEGORIES = [
    "Food", "Housing", "Savings", "Utilities", "Transport",
    "Healthcare", "Education", "Shopping", "Entertainment", "Miscellaneous"
];

const INCOME_CATEGORIES = [
    "Salary", "Investment", "Business", "Others"
];

const ModeBadge = ({ mode }) => {
    const styles = {
        Cash: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
        Card: "bg-purple-500/15 text-purple-400 border-purple-500/25",
        UPI: "bg-indigo-500/15 text-indigo-400 border-indigo-500/25",
        NetBanking: "bg-blue-500/15 text-blue-400 border-blue-500/25",
        Cheque: "bg-gray-500/15 text-gray-400 border-gray-500/25",
    };
    const icons = { Cash: "💵", Card: "💳", UPI: "📱", NetBanking: "🌐", Cheque: "📝" };
    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${styles[mode] || styles.Cash}`}>
            {icons[mode] || "💵"} {mode}
        </span>
    );
};

export default function Transactions() {
    const transactions = useSelector((state) => state.transactions);

    const dispatch = useDispatch();

    const [searchCategory, setSearchCategory] = useState("");
    const [filterMonth, setFilterMonth] = useState("");
    const [filterYear, setFilterYear] = useState("");
    const [filterType, setFilterType] = useState("");

    // Edit modal states
    const [editModal, setEditModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [editLoading, setEditLoading] = useState(false);
    const [editError, setEditError] = useState("");

    // Delete modal States
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Open delete modal
    const handleDeleteOpen = (id) => {
        setDeleteId(id);
        setDeleteModal(true);
    };

    // Confirm delete from MongoDB + Redux
    const handleDeleteConfirm = async () => {
        try {
            setDeleteLoading(true);
            await axiosInstance.delete(`/transactions/delete-transaction/${deleteId}`);

            dispatch(deleteTransaction(deleteId));
            toast.success("Transaction deleted!");
            setDeleteModal(false);
            setDeleteId(null);

        } catch (error) {
            toast.error("Failed to delete transaction");
        } finally {
            setDeleteLoading(false);
        }
    }

    // Open edit modal
    const handleEditOpen = (t) => {
        setEditData({ ...t });
        setEditError("");
        setEditModal(true);
    };

    // Save edit to MongoDB + Redux
    const handleEditSave = async () => {
        if (!editData.category || !editData.amount || !editData.date) return;
        try {
            setEditLoading(true);
            const response = await axiosInstance.put(
                `/transactions/edit-transaction/${editData._id}`,
                {
                    type: editData.type,
                    category: editData.category,
                    amount: Number(editData.amount),
                    date: editData.date,
                    mode: editData.mode,
                    note: editData.note,
                }
            );
            dispatch(editTransaction(response.data.data));
            toast.success("Transaction updated! ✅");

            setEditModal(false);
            setEditData(null);

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update transaction");
        } finally {
            setEditLoading(false);
        }
    };

    const handleClearFilters = () => {
        setSearchCategory("");
        setFilterMonth("");
        setFilterYear("");
    }

    const filteredTransactions = transactions.slice().reverse().filter((t) => {
        const onlyMonth = new Date(t.date).toLocaleString("default", { month: "long" });
        const onlyYear = new Date(t.date).getFullYear().toString();

        const matchCategory = searchCategory
            ? t.category.toLowerCase().includes(searchCategory.toLowerCase()) : true;

        const matchMonth = filterMonth ? onlyMonth === filterMonth : true;
        const matchYear = filterYear ? onlyYear === filterYear : true;
        const matchType = filterType ? t.type === filterType : true;

        return matchCategory && matchMonth && matchYear && matchType;
    }
    )

    return (

        <div className="min-h-screen bg-linear-to-br from-[#0f0c29] via-[#1a1333] to-[#0f0c29] text-gray-200 px-4 sm:px-8 py-8">

            <div className="space-y-4">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold 
                        bg-linear-to-r from-purple-400 to-emerald-400 
                        bg-clip-text text-transparent text-center">
                        Transaction History
                    </h1>
                    <p className="text-gray-400 mt-1 text-center">
                        Track and manage your financial records
                    </p>
                </div>

                {/* Filter Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-5 shadow-xl">

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                        {/* Search */}
                        <input
                            value={searchCategory}
                            onChange={(e) => setSearchCategory(e.target.value)}
                            type="text"
                            placeholder="Search by category..."
                            className="rounded-xl bg-[#0F0F25] border border-purple-500/30 px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        {/* Month */}
                        <select
                            value={filterMonth}
                            onChange={(e) => setFilterMonth(e.target.value)}
                            className="rounded-xl bg-[#0F0F25] border border-indigo-500/30 px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" >
                            <option value="">Select Month</option>
                            {[
                                "January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"
                            ].map((month) => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </select>

                        {/* Year */}
                        <select
                            value={filterYear}
                            onChange={(e) => setFilterYear(e.target.value)}
                            className="rounded-xl bg-[#0F0F25] border border-emerald-500/30 px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                            <option value="">Select Year</option>
                            {[...new Set(transactions.map((t) =>
                                new Date(t.date).getFullYear()
                            ))].map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>

                        {/* Type toggle */}
                        <div className="flex rounded-xl overflow-hidden border border-purple-500/30">
                            {[["", "All"], ["income", "Income"], ["expense", "Expense"]].map(([val, label]) => (
                                <button
                                    key={val}
                                    onClick={() => { setFilterType(val); }}
                                    className={`flex-1 py-2.5 text-xs font-semibold transition-all ${filterType === val
                                        ? val === "income" ? "bg-emerald-500/30 text-emerald-300"
                                            : val === "expense" ? "bg-pink-500/30 text-pink-300"
                                                : "bg-purple-600/40 text-purple-200"
                                        : "bg-[#0F0F25] text-gray-400 hover:bg-white/5"
                                        }`}>
                                    {label}
                                </button>
                            ))}
                        </div>

                        {/* Clear */}
                        <button
                            onClick={handleClearFilters}
                            className="bg-linear-to-r  from-[#00f5c4] to-[#8b5cf6] text-black font-semibold rounded-xl py-2.5 text-sm hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-600/30" >
                            Clear Filter
                        </button>
                    </div>
                </div>

                {/* Table displaying transactions */}
                <div className="bg-white/5 backdrop-blur-xl border border-purple-900/30 rounded-2xl p-6 shadow-xl overflow-x-auto">

                    <table className="w-full text-sm">

                        <thead>
                            <tr className="border-b border-purple-500/30 text-gray-300">
                                <th className="p-3 text-left">Date</th>
                                <th className="text-left">Category</th>
                                <th className="text-left">Description</th>
                                <th className="text-left">Amount</th>
                                <th className="text-left">Mode</th>
                                <th className="text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredTransactions.slice().reverse().map((t) => (
                                <tr
                                    key={t._id}
                                    className="border-b border-purple-900/20 hover:bg-purple-900/10 transition-all">
                                    <td className="py-3 pl-2 text-gray-400 text-xs">
                                        {new Date(t.date).toLocaleDateString("en-IN")}
                                    </td>

                                    <td className="py-3 font-semibold text-gray-200">{t.category}</td>
                                    <td className="py-3 text-gray-400 text-xs max-w-35 truncate">{t.note || "—"}</td>

                                    <td className={`py-3 font-semibold ${t.type === "income"
                                        ? "text-emerald-400"
                                        : "text-pink-400"
                                        }`}>
                                        {t.type === "income" ? "+" : "-"}₹ {t.amount}
                                    </td>

                                    <td className="py-3">
                                        <ModeBadge mode={t.mode} />
                                    </td>

                                    <td className="flex gap-3 py-3">

                                        {/* Edit button */}
                                        <button
                                            onClick={() => handleEditOpen(t)}
                                            className="text-blue-400 hover:text-blue-300 cursor-pointer transition duration-200">
                                            ✏️
                                        </button>

                                        {/* Delete button */}
                                        <button
                                            onClick={() => handleDeleteOpen(t._id)}
                                            className="text-red-400 hover:text-red-300 cursor-pointer transition duration-200">
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {/* Empty State */}
                            {filteredTransactions.length === 0 && (
                                <tr>
                                    <td colSpan="6"
                                        className="text-center py-6 font-semibold text-gray-400" >
                                        <div className="text-4xl mb-3">🔍</div>
                                        No Transactions Found
                                        <p className="text-xs text-gray-500 mt-1">Add some transactions from dashboard</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            {editModal && editData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="bg-[#1a1333] border border-purple-700/40 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4 text-white">

                        {/* Modal Header */}
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold bg-linear-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                                Edit Transaction
                            </h2>
                            <button onClick={() => setEditModal(false)}
                                className="text-gray-400 hover:text-white text-xl transition">✕</button>
                        </div>

                        {/* Error */}
                        {editError && (
                            <p className="text-red-400 text-sm bg-red-500/10 rounded-xl p-3">
                                {editError}
                            </p>
                        )}

                        {/* Type */}
                        <div>
                            <label className="text-sm text-gray-300 block mb-1">Type</label>
                            <select
                                value={editData.type}
                                onChange={(e) => setEditData({
                                    ...editData, type: e.target.value,
                                    category: e.target.value === "income" ? "Salary" : "Food"
                                })}
                                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                                <option value="expense" className="bg-gray-900">Expense</option>
                                <option value="income" className="bg-gray-900">Income</option>
                            </select>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="text-sm text-gray-300 block mb-1">Category</label>
                            <select
                                value={editData.category}
                                onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500">

                                {(editData.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES).map((c) => (
                                    <option key={c} value={c} className="bg-gray-900">{c}</option>
                                ))}
                            </select>
                        </div>

                        {/* Amount */}
                        <div>
                            <label className="text-sm text-gray-300 block mb-1">Amount</label>
                            <input
                                type="number"
                                value={editData.amount}
                                onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            />
                        </div>

                        {/* Date */}
                        <div>
                            <label className="text-sm text-gray-300 block mb-1">Date</label>
                            <input
                                type="date"
                                value={editData.date}
                                onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            />
                        </div>

                        {/* Mode */}
                        <div>
                            <label className="text-sm text-gray-300 block mb-1">Mode</label>
                            <select
                                value={editData.mode}
                                onChange={(e) => setEditData({ ...editData, mode: e.target.value })}
                                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                                <option value="Cash" className="bg-gray-900">💵 Cash</option>
                                <option value="Card" className="bg-gray-900">💳 Card</option>
                                <option value="UPI" className="bg-gray-900">📱 UPI</option>
                                <option value="NetBanking" className="bg-gray-900">🌐 Net Banking</option>
                                <option value="Cheque" className="bg-gray-900">📝 Cheque</option>
                            </select>
                        </div>

                        {/* Note */}
                        <div>
                            <label className="text-sm text-gray-300 block mb-1">Note (Optional)</label>
                            <input
                                type="text"
                                value={editData.note || ""}
                                onChange={(e) => setEditData({ ...editData, note: e.target.value })}
                                placeholder="Add a note..."
                                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={() => setEditModal(false)}
                                className="flex-1 py-3 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 transition font-medium">
                                Cancel
                            </button>
                            <button
                                onClick={handleEditSave}
                                disabled={editLoading}
                                className="flex-1 py-3 rounded-xl bg-linear-to-r from-purple-600 to-emerald-400 text-white font-semibold hover:scale-105 transition shadow-lg disabled:opacity-50">
                                {editLoading ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/*Delete Modal*/}
            <ConfirmModal
                isOpen={deleteModal}
                onClose={() => { setDeleteModal(false); setDeleteId(null); }}
                onConfirm={handleDeleteConfirm}
                title="Delete Transaction?"
                message="Are you sure you want to delete this transaction? This action cannot be undone."
                confirmText="Yes, Delete"
                confirmColor="red"
                loading={deleteLoading}
            />

        </div>
    );
}




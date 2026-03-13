import { useSelector, useDispatch } from "react-redux";
import { deleteBudget, editBudget } from "../store/slices/budgetSlice";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import ConfirmModal from "./ConfirmModal";

export default function ProgressBars({ budgets = [], selectedMonth, selectedYear, viewMode }) {
    const transactions = useSelector((state) => state.transactions);
    const dispatch = useDispatch();

    // edit modal state
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

    // delete budget
    const handleDeleteConfirm = async () => {
        try {
            setDeleteLoading(true);
            await axiosInstance.delete(`/budgets/delete-budget/${deleteId}`);

            dispatch(deleteBudget(deleteId));
            toast.success("Budget deleted!");
            setDeleteModal(false);
            setDeleteId(null);

        } catch (error) {
            toast.error("Failed to delete budget");
        } finally {
            setDeleteLoading(false);
        }
    };

    // open edit modal
    const handleEditOpen = (budgetItem) => {
        setEditData({ ...budgetItem });
        setEditError("");
        setEditModal(true);
    };

    // save edit
    const handleEditSave = async () => {
        if (!editData.category || !editData.amount) return;
        try {
            setEditLoading(true);
            const response = await axiosInstance.put(`/budgets/edit-budget/${editData._id}`, {
                category: editData.category,
                amount: Number(editData.amount),
                month: editData.month,
                year: editData.year,
            });
            dispatch(editBudget(response.data.data));
            toast.success("Budget updated! ✅");

            setEditModal(false);
            setEditData(null);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update budget");
        } finally {
            setEditLoading(false);
        }
    };

    //filter budgets based on viewmode
    let filteredBudgets = [];
    if (viewMode == "monthly") {
        filteredBudgets = budgets.filter((b) =>
            !selectedMonth || b.month === selectedMonth
            // && (!selectedYear || b.year === selectedYear)
        );
    } else if (viewMode == "yearly") {
        filteredBudgets = budgets.filter((b) =>
            !selectedYear || b.year === selectedYear);
    }

    //convert budget array to object
    const budgetObj = filteredBudgets.reduce((acc, b) => {
        acc[b.category] = (acc[b.category] || 0) + b.amount;
        return acc;
    }, {});

    //filter transactions based on viewmode
    let filteredTransactions = [];
    if (viewMode === "monthly") {
        filteredTransactions = transactions.filter((t) => {
            const onlyMonth = new Date(t.date).toLocaleString("default", { month: "long" });
            //  const onlyYear = new Date(t.date).getFullYear().toString();
            return (
                (!selectedMonth || onlyMonth === selectedMonth) && t.type === "expense"
                // && (!selectedYear || onlyYear === selectedYear) 
            )
        }
        )
    } else if (viewMode === "yearly") {
        filteredTransactions = transactions.filter((t) => {
            const onlyYear = new Date(t.date).getFullYear().toString();
            return (!selectedYear || onlyYear === selectedYear) && t.type === "expense"
        })
    }

    //calculate expenses by category
    const categoryTotals = filteredTransactions.reduce((obj, t) => {
        obj[t.category] = (obj[t.category] || 0) + Number(t.amount);
        return obj;
    }, {});

    //remaining budget per category
    const remainingByCategory = Object.keys(budgetObj).reduce((obj, cat) => {
        const planned = budgetObj[cat] || 0;
        const spent = categoryTotals[cat] || 0;
        obj[cat] = planned - spent;
        return obj;
    }, {});

    return (
        <div>
            {Object.keys(budgetObj).length === 0 && (
                <p className="text-gray-500">No budget data :
                    {viewMode === "monthly" ? selectedMonth || " this month" : selectedYear || " this year"}</p>
            )}
            {Object.keys(budgetObj).map((cat) => {
                const budget = budgetObj[cat];
                const expense = categoryTotals[cat] || 0;
                const percentSpent = budget > 0 ? Math.min((expense / budget) * 100) : 0;

                const remaining = budget - expense;
                const isOver = expense > budget;
                const isNear = !isOver && percentSpent >= 80;

                const barColor = isOver ? "bg-red-500" : isNear ? "bg-yellow-400" : "bg-emerald-400";
                const amountColor = isOver ? "text-red-400" : "text-gray-400";
                const subColor = isOver ? "text-red-400" : isNear ? "text-yellow-400" : "text-gray-500";
                const subText = isOver
                    ? `⚠️ Overspent by ₹${Math.abs(remaining).toLocaleString("en-IN")}`
                    : isNear
                        ? `⚡ Only ₹${remaining.toLocaleString("en-IN")} remaining`
                        : `✅ ₹${remaining.toLocaleString("en-IN")} remaining`;

                // find original budget item for edit/delete
                const budgetItem = filteredBudgets.find((b) => b.category === cat);

                return (
                    <div key={cat}>
                        <div className="flex justify-between items-center mb-1 mt-3">
                            <span className=" text-gray-400 font-medium text-sm">{cat}</span>
                            <div className="flex items-center gap-3">
                                <span className={`text-xs font-semibold ${amountColor}`}>₹{expense}/₹{budget}</span>

                                {/* edit button */}
                                {budgetItem && (
                                    <button
                                        onClick={() => handleEditOpen(budgetItem)}
                                        className="text-blue-400 hover:text-blue-300 cursor-pointer transition text-xs">
                                        ✏️
                                    </button>
                                )}

                                {/* delete button */}
                                {budgetItem && (
                                    <button
                                        onClick={() => handleDeleteOpen(budgetItem._id)}
                                        className="text-red-400 hover:text-red-300 cursor-pointer transition text-xs">
                                        🗑️
                                    </button>
                                )}

                            </div>
                        </div>

                        <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                            <div className={`h-2 rounded-full transition-all duration-500 ${barColor} `}
                                style={{ width: `${percentSpent}%` }}>
                            </div>
                        </div>

                        {/* Sub text */}
                        <p className={`text-[10px] mt-1 ${subColor}`}>
                            {subText}
                        </p>
                    </div>
                )
            })
            }

            {/* edit modal */}
            {editModal && editData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="bg-[#1a1333] border border-purple-700/40 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4 text-white">

                        {/* Modal Header */}
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold bg-linear-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                                Edit Budget
                            </h2>
                            <button onClick={() => setEditModal(false)}
                                className="text-gray-400 hover:text-white text-xl transition">✕</button>
                        </div>

                        {/* Error */}
                        {editError && (
                            <p className="text-red-400 text-sm bg-red-500/10 rounded-xl p-3">{editError}</p>
                        )}

                        {/* Category */}
                        <div>
                            <label className="text-sm text-gray-300 block mb-1">Category</label>
                            <select value={editData.category}
                                onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                                {["Food", "Housing", "Savings", "Utilities", "Transport",
                                    "Healthcare", "Education", "Shopping", "Entertainment", "Miscellaneous"
                                ].map((c) => (
                                    <option key={c} value={c} className="bg-gray-900">{c}</option>
                                ))}
                            </select>
                        </div>

                        {/* Amount */}
                        <div>
                            <label className="text-sm text-gray-300 block mb-1">Amount</label>
                            <input type="number"
                                value={editData.amount}
                                onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            />
                        </div>

                        {/* Month */}
                        <div>
                            <label className="text-sm text-gray-300 block mb-1">Month</label>
                            <select value={editData.month}
                                onChange={(e) => setEditData({ ...editData, month: e.target.value })}
                                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                                <option value="" className="bg-gray-900">Select Month</option>
                                {["January", "February", "March", "April", "May", "June",
                                    "July", "August", "September", "October", "November", "December"
                                ].map((m) => (
                                    <option key={m} value={m} className="bg-gray-900">{m}</option>
                                ))}
                            </select>
                        </div>

                        {/* Year */}
                        <div>
                            <label className="text-sm text-gray-300 block mb-1">Year</label>
                            <select value={editData.year}
                                onChange={(e) => setEditData({ ...editData, year: e.target.value })}
                                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                                {["2024", "2025", "2026", "2027"].map((y) => (
                                    <option key={y} value={y} className="bg-gray-900">{y}</option>
                                ))}
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-2">
                            <button onClick={() => setEditModal(false)}
                                className="flex-1 py-3 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 transition font-medium">
                                Cancel
                            </button>
                            <button onClick={handleEditSave}
                                disabled={editLoading}
                                className="flex-1 py-3 rounded-xl bg-linear-to-r from-purple-600 to-emerald-400 text-white font-semibold hover:scale-105 transition shadow-lg disabled:opacity-50">
                                {editLoading ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            <ConfirmModal
                isOpen={deleteModal}
                onClose={() => { setDeleteModal(false); setDeleteId(null); }}
                onConfirm={handleDeleteConfirm}
                title="Delete Budget?"
                message="Are you sure you want to delete this budget? This action cannot be undone."
                confirmText="Yes, Delete"
                confirmColor="red"
                loading={deleteLoading}
            />

        </div>
    );
}





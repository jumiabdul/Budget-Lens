import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addGoal, editGoal, deleteGoal } from "../store/slices/goalSlice";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";
import { addTransaction } from "../store/slices/transactionSlice";

const ICONS = ["🎯", "🏠", "🚗", "✈️", "💍", "📱", "💻", "🎓", "💰", "🏋️", "🎸", "🌍"];
const CATEGORIES = ["General", "Housing", "Transport", "Travel", "Education", "Tech", "Health", "Emergency", "Investment", "Other"];

// Modal Form
const GoalForm = ({ data, setData, onSave, onClose, saveLoading, title }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="bg-[#1a1333] border border-purple-700/40 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl space-y-4 text-white max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold bg-linear-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                    {title}
                </h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">✕</button>
            </div>

            {/* Icon picker */}
            <div>
                <label className="text-sm text-gray-400 block mb-2">Icon</label>
                <div className="flex flex-wrap gap-2">
                    {ICONS.map(icon => (
                        <button key={icon} type="button" onClick={() => setData(p => ({ ...p, icon }))}
                            className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center border transition ${data.icon === icon
                                ? "bg-purple-500/30 border-purple-500/50"
                                : "bg-white/5 border-white/10 hover:bg-white/10"
                                }`}>
                            {icon}
                        </button>
                    ))}
                </div>
            </div>

            {/* Title */}
            <div>
                <label className="text-sm text-gray-400 block mb-1">Goal Title</label>
                <input type="text" value={data.title} onChange={e => setData({ ...data, title: e.target.value })}
                    placeholder="e.g. Buy a Car"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500" />
            </div>

            {/* Target Amount */}
            <div>
                <label className="text-sm text-gray-400 block mb-1">Target Amount</label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                    <input type="number" value={data.targetAmount} onChange={e => setData({ ...data, targetAmount: e.target.value })}
                        placeholder="0.00"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-8 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500" />
                </div>
            </div>

            {/* Saved Amount */}
            <div>
                <label className="text-sm text-gray-400 block mb-1">Already Saved (Optional)</label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                    <input type="number" value={data.savedAmount} onChange={e => setData({ ...data, savedAmount: e.target.value })}
                        placeholder="0.00"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-8 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500" />
                </div>
            </div>

            {/* Deadline */}
            <div>
                <label className="text-sm text-gray-400 block mb-1">Target Date (Optional)</label>
                <input type="date" value={data.deadline ? data.deadline.split("T")[0] : ""} onChange={e => setData({ ...data, deadline: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500" />
            </div>

            {/* Category */}
            <div>
                <label className="text-sm text-gray-400 block mb-1">Category</label>
                <select value={data.category} onChange={e => setData({ ...data, category: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500">
                    {CATEGORIES.map(c => <option key={c} value={c} className="bg-gray-900">{c}</option>)}
                </select>
            </div>

            <div className="flex gap-3 pt-2">
                <button onClick={onClose}
                    className="flex-1 py-3 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 transition font-medium">
                    Cancel
                </button>
                <button onClick={onSave} disabled={saveLoading}
                    className="flex-1 py-3 rounded-xl bg-linear-to-r from-purple-600 to-emerald-400 text-black font-semibold hover:scale-105 transition disabled:opacity-50">
                    {saveLoading ? "Saving..." : "Save Goal 🎯"}
                </button>
            </div>
        </div>
    </div>
);


export default function Goals() {
    const goals = useSelector(state => state.goals);
    const dispatch = useDispatch();

    // Add modal
    const [addModal, setAddModal] = useState(false);
    const [addLoading, setAddLoading] = useState(false);
    const [newGoal, setNewGoal] = useState({ title: "", targetAmount: "", savedAmount: "", deadline: "", category: "General", icon: "🎯" });

    // Edit modal
    const [editModal, setEditModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [editLoading, setEditLoading] = useState(false);

    // Delete modal
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Add money modal
    const [moneyModal, setMoneyModal] = useState(false);
    const [moneyGoal, setMoneyGoal] = useState(null);
    const [moneyAmount, setMoneyAmount] = useState("");
    const [moneyLoading, setMoneyLoading] = useState(false);

    // Handlers

    const handleAdd = async () => {
        if (!newGoal.title || !newGoal.targetAmount) {
            toast.error("Title and target amount are required!"); return;
        }
        try {
            setAddLoading(true);
            const res = await axiosInstance.post("/api/goals/add-goal", {
                ...newGoal,
                targetAmount: Number(newGoal.targetAmount),
                savedAmount: Number(newGoal.savedAmount) || 0,
            });
            dispatch(addGoal(res.data.data));
            toast.success("Goal created! 🎯");
            setAddModal(false);
            setNewGoal({ title: "", targetAmount: "", savedAmount: "", deadline: "", category: "General", icon: "🎯" });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create goal");
        } finally {
            setAddLoading(false);
        }
    };

    const handleEdit = async () => {
        if (!editData.title || !editData.targetAmount) {
            toast.error("Title and target amount are required!"); return;
        }
        try {
            setEditLoading(true);
            const res = await axiosInstance.put(`/api/goals/edit-goal/${editData._id}`, {
                ...editData,
                targetAmount: Number(editData.targetAmount),
                savedAmount: Number(editData.savedAmount),
            });
            dispatch(editGoal(res.data.data));
            toast.success("Goal updated! ✅");
            setEditModal(false);
            setEditData(null);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update goal");
        } finally {
            setEditLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setDeleteLoading(true);
            await axiosInstance.delete(`/api/goals/delete-goal/${deleteId}`); // ✅
            dispatch(deleteGoal(deleteId));
            toast.success("Goal deleted!");
            setDeleteModal(false);
            setDeleteId(null);
        } catch {
            toast.error("Failed to delete goal");
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleAddMoney = async () => {
        if (!moneyAmount || Number(moneyAmount) <= 0) {
            toast.error("Enter a valid amount!"); return;
        }
        try {
            setMoneyLoading(true);
            const res = await axiosInstance.put(`/api/goals/add-money/${moneyGoal._id}`, {
                amount: Number(moneyAmount)
            });

            // Update goal in Redux
            dispatch(editGoal(res.data.data.goal));

            // Add transaction to Redux
            dispatch(addTransaction(res.data.data.transaction));

            toast.success("Amount added! 💰");
            setMoneyModal(false);
            setMoneyAmount("");
            setMoneyGoal(null);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add amount");
        } finally {
            setMoneyLoading(false);
        }
    };

    // Stats
    const totalGoals = goals.length;
    const completedGoals = goals.filter(g => g.savedAmount >= g.targetAmount).length;
    const totalTarget = goals.reduce((s, g) => s + g.targetAmount, 0);
    const totalSaved = goals.reduce((s, g) => s + g.savedAmount, 0);


    return (
        <div className="min-h-screen bg-linear-to-br from-[#0f0c29] via-[#1a1333] to-[#0f0c29] text-gray-200 px-4 sm:px-8 py-8">
            <div className="space-y-4">

                {/* Header */}
                <div className="relative mb-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold bg-linear-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent tracking-wide">
                            Financial Goals
                        </h1>
                        <p className="text-gray-400 text-center text-sm ">Track and achieve your financial targets</p>
                    </div>
                    <div className="mt-3 flex justify-center sm:mt-0 sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2">
                        <button
                            onClick={() => {
                                setNewGoal({ title: "", targetAmount: "", savedAmount: "", deadline: "", category: "General", icon: "🎯" });
                                setAddModal(true)
                            }}
                            className="px-5 py-2 bg-linear-to-r from-purple-600 to-emerald-400 rounded-lg font-semibold shadow-lg hover:scale-105 transition ">
                            + New Goal
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/5 border border-purple-900/30 rounded-2xl p-4">
                        <p className="text-[11px] text-gray-500 mb-1">Total Goals</p>
                        <p className="text-xl font-bold text-purple-400">{totalGoals}</p>
                    </div>
                    <div className="bg-white/5 border border-purple-900/30 rounded-2xl p-4">
                        <p className="text-[11px] text-gray-500 mb-1">Completed</p>
                        <p className="text-xl font-bold text-emerald-400">{completedGoals}</p>
                    </div>
                    <div className="bg-white/5 border border-purple-900/30 rounded-2xl p-4">
                        <p className="text-[11px] text-gray-500 mb-1">Total Target</p>
                        <p className="text-xl font-bold text-indigo-400">₹{totalTarget.toLocaleString("en-IN")}</p>
                    </div>
                    <div className="bg-white/5 border border-purple-900/30 rounded-2xl p-4">
                        <p className="text-[11px] text-gray-500 mb-1">Total Saved</p>
                        <p className="text-xl font-bold text-pink-400">₹{totalSaved.toLocaleString("en-IN")}</p>
                    </div>
                </div>

                {/* Empty State */}
                {goals.length === 0 ? (
                    <div className="bg-white/5 border border-purple-900/30 rounded-2xl p-16 text-center">
                        <div className="text-5xl mb-4">🎯</div>
                        <h3 className="text-lg font-bold text-gray-300 mb-2">No goals yet</h3>
                        <p className="text-gray-500 text-sm mb-6">Set your first financial goal and start saving!</p>
                        <button onClick={() => {
                            setNewGoal({ title: "", targetAmount: "", savedAmount: "", deadline: "", category: "General", icon: "🎯" });
                            setAddModal(true)
                        }}
                            className="px-6 py-2.5 bg-linear-to-r from-purple-600 to-emerald-400 rounded-xl font-semibold text-sm hover:scale-105 transition ">
                            + Create First Goal
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {goals.map(goal => {
                            const pct = goal.targetAmount > 0 ? Math.min(Math.round((goal.savedAmount / goal.targetAmount) * 100), 100) : 0;
                            const remaining = goal.targetAmount - goal.savedAmount;
                            const isDone = pct >= 100;
                            const isNear = !isDone && pct >= 80;
                            const barColor = isDone ? "bg-emerald-400" : isNear ? "bg-yellow-400" : "bg-purple-500";

                            // Days remaining
                            const daysLeft = goal.deadline
                                ? Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24))
                                : null;

                            return (
                                <div key={goal._id} className="bg-white/5 border border-purple-900/30 rounded-2xl p-5 space-y-4 hover:border-purple-500/30 transition">

                                    {/* Card header */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-2xl">
                                                {goal.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-200 text-sm">{goal.title}</h3>
                                                <p className="text-[10px] text-gray-500">{goal.category}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <button onClick={() => { setEditData({ ...goal }); setEditModal(true); }}
                                                className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition text-xs">✏️</button>
                                            <button onClick={() => { setDeleteId(goal._id); setDeleteModal(true); }}
                                                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition text-xs">🗑️</button>
                                        </div>
                                    </div>

                                    {/* Amounts */}
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] text-gray-500">Saved</p>
                                            <p className="text-lg font-bold text-emerald-400">₹{goal.savedAmount.toLocaleString("en-IN")}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-gray-500">Target</p>
                                            <p className="text-lg font-bold text-gray-200">₹{goal.targetAmount.toLocaleString("en-IN")}</p>
                                        </div>
                                    </div>

                                    {/* Progress bar */}
                                    <div>
                                        <div className="flex justify-between text-[10px] text-gray-500 mb-1.5">
                                            <span>{pct}% complete</span>
                                            {isDone
                                                ? <span className="text-emerald-400 font-semibold">✅ Completed!</span>
                                                : <span>₹{remaining.toLocaleString("en-IN")} left</span>
                                            }
                                        </div>
                                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                                                style={{ width: `${pct}%` }} />
                                        </div>
                                    </div>

                                    {/* Deadline */}
                                    {goal.deadline && (
                                        <p className={`text-[10px] ${daysLeft < 0 ? "text-red-400" : daysLeft <= 30 ? "text-yellow-400" : "text-gray-500"}`}>
                                            {daysLeft < 0
                                                ? `⚠️ Deadline passed ${Math.abs(daysLeft)} days ago`
                                                : daysLeft === 0
                                                    ? "⚠️ Due today!"
                                                    : `📅 ${daysLeft} days remaining`
                                            }
                                        </p>
                                    )}

                                    {/* Add money button */}
                                    {!isDone && (
                                        <button
                                            onClick={() => { setMoneyGoal(goal); setMoneyModal(true); }}
                                            className="w-full py-2 rounded-xl bg-linear-to-r from-purple-600/30 to-emerald-400/20 border border-purple-500/20 text-purple-300 text-xs font-semibold hover:from-purple-600/40 hover:to-emerald-400/30 transition">
                                            + Add Money
                                        </button>
                                    )}

                                    {isDone && (
                                        <div className="w-full py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold text-center">
                                            🎉 Goal Achieved!
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Add Modal */}
            {addModal && (
                <GoalForm
                    data={newGoal}
                    setData={setNewGoal}
                    onSave={handleAdd}
                    onClose={() => setAddModal(false)}
                    saveLoading={addLoading}
                    title="New Goal 🎯"
                />
            )}

            {/* Edit Modal */}
            {editModal && editData && (
                <GoalForm
                    data={editData}
                    setData={setEditData}
                    onSave={handleEdit}
                    onClose={() => { setEditModal(false); setEditData(null); }}
                    saveLoading={editLoading}
                    title="Edit Goal ✏️"
                />
            )}

            {/* Add Money Modal */}
            {moneyModal && moneyGoal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="bg-[#1a1333] border border-purple-700/40 rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl space-y-4 text-white">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold text-white">Add Money 💰</h2>
                            <button onClick={() => { setMoneyModal(false); setMoneyAmount(""); }}
                                className="text-gray-400 hover:text-white text-xl">✕</button>
                        </div>

                        <div className="bg-white/5 rounded-xl p-3 text-center">
                            <p className="text-xs text-gray-400">{moneyGoal.icon} {moneyGoal.title}</p>
                            <p className="text-sm text-gray-300 mt-1">
                                ₹{moneyGoal.savedAmount.toLocaleString("en-IN")} / ₹{moneyGoal.targetAmount.toLocaleString("en-IN")}
                            </p>
                        </div>

                        <div>
                            <label className="text-sm text-gray-400 block mb-1">Amount to Add</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                                <input type="number" value={moneyAmount}
                                    onChange={e => setMoneyAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-8 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500" />
                            </div>
                        </div>

                        {/* Quick amounts */}
                        <div className="flex gap-2">
                            {[500, 1000, 5000].map(q => (
                                <button key={q} type="button" onClick={() => setMoneyAmount(q.toString())}
                                    className="flex-1 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-purple-500/20 hover:text-purple-300 transition">
                                    ₹{q >= 1000 ? `${q / 1000}k` : q}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => { setMoneyModal(false); setMoneyAmount(""); }}
                                className="flex-1 py-3 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 transition font-medium text-sm">
                                Cancel
                            </button>
                            <button onClick={handleAddMoney} disabled={moneyLoading}
                                className="flex-1 py-3 rounded-xl bg-linear-to-r from-purple-600 to-emerald-400 text-black font-semibold hover:scale-105 transition disabled:opacity-50 text-sm">
                                {moneyLoading ? "Adding..." : "Add Money 💰"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            <ConfirmModal
                isOpen={deleteModal}
                onClose={() => { setDeleteModal(false); setDeleteId(null); }}
                onConfirm={handleDelete}
                title="Delete Goal?"
                message="Are you sure you want to delete this goal? This action cannot be undone."
                confirmText="Yes, Delete"
                confirmColor="red"
                loading={deleteLoading}
            />
        </div>
    );
}

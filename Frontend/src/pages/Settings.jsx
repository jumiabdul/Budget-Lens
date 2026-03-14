import { useDispatch } from "react-redux"
import { resetTransactions } from "../store/slices/transactionSlice"
import { resetBudgets } from "../store/slices/budgetSlice"
import ConfirmModal from "../components/ConfirmModal";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { ArrowPathIcon } from "@heroicons/react/24/outline"

export default function Settings() {
    const [resetModal, setResetModal] = useState(false);

    const dispatch = useDispatch();

    const handleReset = async () => {
        try {
            await axiosInstance.delete("/transactions/delete-all");
            await axiosInstance.delete("/budgets/delete-all");

            dispatch(resetTransactions());
            dispatch(resetBudgets());
            toast.success("All data reset done!");
            setResetModal(false);

        } catch (error) {
            toast.error("Failed to reset data");
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center p-4 bg-linear-to-br from-[#0f0c29] via-[#1a1240] to-[#0a0f2c]">
            <div className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 text-white">

                <h1 className="text-3xl text-center font-bold bg-linear-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                    Settings</h1>

                <div className="flex items-center justify-center">
                    <button type="submit" onClick={() => setResetModal(true)}
                        className=" mt-7 w-50 py-3 rounded-xl font-semibold bg-linear-to-r from-[#00f5c4] to-[#8b5cf6] text-black transform hover:scale-105 cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2">
                        Reset Data
                        <ArrowPathIcon className="w-5 h-5 items-center" /> {/*  reset icon */}
                    </button>
                </div>

            </div>

            {/* Reset Modal */}
            <ConfirmModal
                isOpen={resetModal}
                onClose={() => setResetModal(false)}
                onConfirm={handleReset}
                title="Reset All Data?"
                message="This will permanently delete ALL your transactions and budgets. This cannot be undone!"
                confirmText="Yes, Reset Everything"
                confirmColor="purple"
            />

        </div>
    )
}
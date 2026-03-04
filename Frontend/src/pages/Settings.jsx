import { useDispatch } from "react-redux"
import { resetTransactions } from "../store/slices/transactionSlice"
import { resetBudgets } from "../store/slices/budgetSlice"

export default function Settings() {
    const dispatch = useDispatch();

    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset all data ?")) {
            dispatch(resetTransactions());
            dispatch(resetBudgets());
        }
    }
    return (
        <div className="min-h-screen flex justify-center items-center p-4 bg-linear-to-br from-[#0f0c29] via-[#1a1240] to-[#0a0f2c]">
            <div className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 text-white">

                <h1 className="text-3xl text-center font-bold bg-linear-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                    Settings</h1>

                <div className="flex items-center justify-center">
                    <button type="submit" onClick={handleReset}
                        className=" mt-7 w-50 py-3 rounded-xl font-semibold bg-linear-to-r from-[#00f5c4] to-[#8b5cf6] text-black transform hover:scale-105 cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-emerald-500/30">
                        Reset Data
                    </button>
                </div>

            </div>
        </div>
    )
}
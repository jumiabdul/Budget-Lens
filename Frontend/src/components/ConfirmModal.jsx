import { useState } from "react";

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    confirmColor = "red",
    loading = false,
    actionType
}) {

    const [reason, setReason] = useState("");
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleConfirm = () => {
        // Only validate for deactivate
        if (actionType === "deactivate") {
            if (!reason.trim()) {
                setError("Reason is required");
                return;
            }
        }

        setError("");
        onConfirm(reason); //  send reason
        setReason(""); // reset
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-[#1a1333] border border-purple-700/40 rounded-2xl p-6 w-full max-w-sm shadow-2xl text-white text-center space-y-4">

                {/* Icon */}
                <div className="text-5xl">
                    {confirmColor === "red" ? "🗑️" : "⚠️"}
                </div>

                {/* Title */}
                <h2 className={`text-xl font-bold ${confirmColor === "red" ? "text-red-400" : "text-yellow-400"}`}>
                    {title}
                </h2>

                {/* Message */}
                <p className="text-gray-400 text-sm">
                    {message}
                </p>

                {/* Reason Input (ONLY for deactivate) */}
                {actionType === "deactivate" && (
                    <div className="text-left">
                        <textarea
                            placeholder="Enter reason for deactivation..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full mt-2 p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                        {error && (
                            <p className="text-red-400 text-xs mt-1">
                                {error}
                            </p>
                        )}
                    </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 py-3 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 transition font-medium">
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className={`flex-1 py-3 rounded-xl font-semibold hover:scale-105 transition shadow-lg disabled:opacity-50 ${confirmColor === "red"
                            ? "bg-red-500 hover:bg-red-600 text-white"
                            : "bg-yellow-500 hover:bg-yellow-600 text-black"
                            }`}>
                        {loading ? "Please wait..." : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
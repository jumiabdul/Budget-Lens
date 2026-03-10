
export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    confirmColor = "red",
    loading = false,
}) {
    if (!isOpen) return null;

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
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-[#0f0c29] via-[#141033] to-[#0b0720] text-white px-4">
            <div className="text-center space-y-6">

                {/* 404 */}
                <div className="relative">
                    <h1 className="text-[120px] font-bold leading-none bg-linear-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent opacity-20 select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl">🔍</span>
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white">Page Not Found</h2>
                    <p className="text-gray-400 text-sm max-w-sm mx-auto">
                        Looks like this page doesn't exist or has been moved.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2.5 rounded-xl bg-white/5 border border-purple-500/30 text-gray-300 hover:bg-white/10 transition text-sm font-medium">
                        ← Go Back
                    </button>
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="px-6 py-2.5 rounded-xl bg-linear-to-r from-purple-600 to-emerald-400 text-black font-semibold hover:scale-105 transition text-sm">
                        Go to Dashboard
                    </button>
                </div>

            </div>
        </div>
    );
}

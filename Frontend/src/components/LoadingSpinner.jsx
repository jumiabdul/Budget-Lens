export default function LoadingSpinner() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-[#0f0c29] via-[#141033] to-[#0b0720]">
            
            {/* Spinner */}
            <div className="relative w-16 h-16">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
                {/* Inner ring */}
                <div className="absolute inset-2 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin"
                    style={{ animationDirection: "reverse" }} />
            </div>

            {/* Text */}
            <p className="text-gray-400 text-sm mt-6 animate-pulse">
                Loading your data...
            </p>
            <p className="text-gray-600 text-xs mt-1">
                Budget <span className="text-[#2dfbd4]">Lens</span>
            </p>

        </div>
    );
}

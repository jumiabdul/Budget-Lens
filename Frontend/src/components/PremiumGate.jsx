import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setPremium } from "../store/slices/userSlice";
import toast from "react-hot-toast";

export default function PremiumGate({ children, feature }) {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // If premium show content
    if (user?.isPremium) return <>{children}</>;

    const handlePayment = async () => {
        try {
            // Step 1 — Create order
            const { data } = await axiosInstance.post("/api/payment/create-order");

            // Step 2 — Open Razorpay
            const options = {
                key: data.key,
                amount: data.order.amount,
                currency: "INR",
                name: "Budget Lens",
                description: "Premium Membership",
                image: "/favicon.svg",
                order_id: data.order.id,
                prefill: {
                    name: data.user.name,
                    email: data.user.email,
                },
                theme: { color: "#7c3aed" },
                handler: async (response) => {
                    try {
                        // Step 3 — Verify payment
                        const verify = await axiosInstance.post("/api/payment/verify-payment", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        if (verify.data.success) {
                            dispatch(setPremium()); // update Redux
                            toast.success("Welcome to Premium! 🎉");
                        }
                    } catch {
                        toast.error("Payment verification failed");
                    }
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            toast.error("Failed to initiate payment");
        }
    };

    // Show locked screen
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f0c29] via-[#1a1333] to-[#0f0c29] px-4">
            <div className="w-full max-w-md bg-white/5 border border-purple-900/30 rounded-3xl p-8 text-center space-y-6 text-white">

                {/* Lock icon */}
                <div className="w-20 h-20 rounded-full bg-linear-to-r from-purple-500/20 to-emerald-400/20 border border-purple-500/30 flex items-center justify-center text-4xl mx-auto">
                    🔒
                </div>

                {/* Heading */}
                <div>
                    <h2 className="text-2xl font-bold bg-linear-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                        Premium Feature
                    </h2>
                    <p className="text-gray-400 text-sm mt-2">
                        Unlock <span className="text-purple-300 font-semibold">{feature}</span> and all premium features
                    </p>
                </div>

                {/* Features list */}
                <div className="bg-white/5 rounded-2xl p-4 text-left space-y-2">
                    {[
                        "📊 Advanced Reports & Analytics",
                        "🎯 Financial Goals Tracking",
                        "📥 PDF & CSV Export",
                    ].map((f, i) => (
                        <p key={i} className="text-sm text-gray-300">✅ {f}</p>
                    ))}
                </div>

                {/* Price */}
                <div>
                    <p className="text-3xl font-bold text-white">
                        ₹499 <span className="text-sm text-gray-400 font-normal">one-time</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Lifetime access — no subscription!</p>
                </div>

                {/* Pay button */}
                <button onClick={handlePayment}
                    className="w-full py-3 rounded-xl font-semibold bg-linear-to-r from-purple-600 to-emerald-400 text-black hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/30">
                    Unlock Premium 🚀
                </button>

                {/* Back */}
                <button onClick={() => navigate("/dashboard")}
                    className="w-full py-2 rounded-xl text-sm text-gray-400 hover:text-white transition">
                    ← Back to Dashboard
                </button>

            </div>
        </div>
    );
}
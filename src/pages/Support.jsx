import { useState } from "react";

export default function Support() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Support request submitted!");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="min-h-screen bg-[#0B0B1A] text-gray-200 px-4 sm:px-8 py-10">

            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold bg-linear-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                    Support Center
                </h1>
                <p className="text-gray-400 mt-3 text-sm sm:text-base">
                    Need help? We're here for you.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">

                {/* Contact Info Card */}
                <div className="bg-[#151530]/70 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-6 shadow-xl">

                    <h2 className="text-lg text-center font-semibold text-purple-300 mb-4">
                        Contact Information
                    </h2>

                    <div className="space-y-4 text-sm text-gray-300">
                        <p>📧 Email: support@budgetlens.com</p>
                        <p>📞 Phone: +91 98765 43210</p>
                        <p>⏰ Support Hours: Mon - Fri, 9 AM - 6 PM</p>
                    </div>

                    <div className="mt-6 p-4 bg-purple-900/20 rounded-xl text-xs text-gray-400">
                        We usually respond within 24 hours.
                    </div>
                </div>

                {/* Support Form */}
                <div className="bg-[#151530]/70 backdrop-blur-lg border border-emerald-500/20 rounded-2xl p-6 shadow-xl">

                    <h2 className="text-lg text-center font-semibold text-emerald-300 mb-4">
                        Submit a Request
                    </h2>

                    <form onSubmit={handleSubmit}
                        className="space-y-4">

                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                        />

                        <textarea
                            name="message"
                            placeholder="Describe your issue..."
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition resize-none"
                        />

                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl font-semibold bg-linear-to-r from-emerald-400 to-teal-500 text-black hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-500/30">
                            Submit Request
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}
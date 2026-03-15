import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { useSelector } from "react-redux"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const user = useSelector(state => state.user);

    const isActive = (path) => location.pathname === path;

    const linkClass = (path) =>
        `transition duration-300 cursor-pointer text-sm font-medium ${isActive(path)
            ? "text-[#2dfbd4] font-bold text-base"
            : "text-gray-300 hover:text-[#2dfbd4]"
        }`;

    const mobileLinkClass = (path) =>
        `transition duration-300 cursor-pointer text-sm ${isActive(path)
            ? "text-[#2dfbd4] font-semibold"
            : "text-gray-300 hover:text-[#2dfbd4]"
        }`;

    return (
        <nav className="relative z-50 bg-[#0b0720]/80 backdrop-blur-xl border-b border-[#2dfbd4]/10 text-white px-8 py-4 flex items-center justify-between shadow-lg">

            {/* Subtle Top Glow Line */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-[#2dfbd4] to-transparent opacity-70"></div>

            {/*App Name or header */}
            <div className="font-bold text-2xl tracking-wide">
                Budget<span className="text-[#2dfbd4]"> Lens</span></div>

            {/*Hamburger toggle for mobile */}
            <button onClick={() => setIsOpen(!isOpen)}
                className="md:hidden focus:outline-none text-[#2dfbd4]">
                {isOpen ? (<XMarkIcon className="w-6 h-6" />) : (<Bars3Icon className="w-6 h-6" />)}
            </button>

            {/*Links on desktop and tablet */}
            <div className="hidden md:flex items-center space-x-8">
                <Link to="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link>
                <Link to="/transactions" className={linkClass("/transactions")}>Transactions</Link>
                <Link to="/reports" className={linkClass("/reports")}>Reports</Link>
                <Link to="/budget-planner" className={linkClass("/budget-planner")}>Budget</Link>
                <Link to="/profile" className={`w-10 h-10 rounded-full text-sm bg-linear-to-r from-purple-500 to-emerald-400 flex items-center justify-center font-bold text-black shadow-lg hover:scale-105 transition duration-300 cursor-pointer 
                     ${isActive("/profile")
                        ? "ring-2 ring-[#2dfbd4] ring-offset-2 ring-offset-[#0b0720]"
                        : "border-[#2dfbd4]/40"
                    }`}>
                    {user?.name?.charAt(0).toUpperCase() || "?"}
                </Link>
            </div>

            {/*Mobile dropdown menu */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-[#141033]/95 backdrop-blur-xl border-t border-[#2dfbd4]/10 flex flex-col items-center space-y-6 py-6 md:hidden shadow-2xl z-50">
                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className={mobileLinkClass("/dashboard")}>Dashboard</Link>
                    <Link to="/transactions" onClick={() => setIsOpen(false)} className={mobileLinkClass("/transactions")}>Transactions</Link>
                    <Link to="/reports" onClick={() => setIsOpen(false)} className={mobileLinkClass("/reports")}>Reports</Link>
                    <Link to="/budget-planner" onClick={() => setIsOpen(false)} className={mobileLinkClass("/budget-planner")}>Budget</Link>
                    <Link to="/profile" onClick={() => setIsOpen(false)} className={`w-10 h-10 text-sm font-bold rounded-full bg-linear-to-r from-purple-500 to-emerald-400 flex items-center justify-center text-black shadow-lg hover:scale-105 transition duration-300 cursor-pointer
                                             ${isActive("/profile")
                            ? "ring-2 ring-[#2dfbd4] ring-offset-2 ring-offset-[#0b0720]"
                            : "border-[#2dfbd4]/40"
                        }`}>
                        {user?.name?.charAt(0).toUpperCase() || "?"}
                    </Link>
                </div>
            )}
        </nav>
    )
}

export default Navbar;
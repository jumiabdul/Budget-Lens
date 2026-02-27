import { useState } from "react"
import { Link } from "react-router-dom"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="relative z-50 bg-[#0b0720]/80 backdrop-blur-xl border-b border-[#2dfbd4]/10 text-white px-8 py-4 flex items-center justify-between shadow-lg">

            {/* Subtle Top Glow Line */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-[#2dfbd4] to-transparent opacity-70"></div>

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
                <Link to="/dashboard" className="text-gray-300 hover:text-[#2dfbd4] transition duration-300 cursor-pointer">Dashboard</Link>
                <Link to="/transactions" className="text-gray-300 hover:text-[#2dfbd4] transition duration-300 cursor-pointer">Transactions</Link>
                <Link to="/reports" className="text-gray-300 hover:text-[#2dfbd4] transition duration-300 cursor-pointer">Reports</Link>
                <Link to="/budget-planner" className="text-gray-300 hover:text-[#2dfbd4] transition duration-300 cursor-pointer">Budget</Link>
                <Link to="/profile" className="w-12 h-12 rounded-full text-xs bg-[#2dfbd4]/20 border border-[#2dfbd4]/40 flex items-center justify-center font-semibold text-[#2dfbd4] shadow-lg hover:shadow-[#2dfbd4]/40 hover:scale-105 transition duration-300 cursor-pointer">
                    Profile</Link>
            </div>

            {/*Mobile dropdown menu */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-[#141033]/95 backdrop-blur-xl border-t border-[#2dfbd4]/10 flex flex-col items-center space-y-6 py-6 md:hidden shadow-2xl z-50">
                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-[#2dfbd4] transition cursor-pointer">Dashboard</Link>
                    <Link to="/transactions" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-[#2dfbd4] transition cursor-pointer">Transactions</Link>
                    <Link to="/reports" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-[#2dfbd4] transition cursor-pointer">Reports</Link>
                    <Link to="/budget-planner" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-[#2dfbd4] transition cursor-pointer">Budget</Link>
                    <Link to="/profile" onClick={() => setIsOpen(false)} className="w-12 h-12 text-xs font-semibold rounded-full bg-[#2dfbd4]/20 border border-[#2dfbd4]/40 flex items-center justify-center text-[#2dfbd4] shadow-lg">
                        Profile</Link>
                </div>
            )}
        </nav>
    )
}

export default Navbar;
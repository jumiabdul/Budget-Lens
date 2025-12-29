import { useState } from "react"
import { Link } from "react-router-dom"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-6 py-3 flex items-center justify-between relative">
            <div className="font-bold text-2xl">Budget Lens</div>
            {/*Hamburger toggle for mobile */}
            <button onClick={() => setIsOpen(!isOpen)}
                className="sm:hidden focus:outline-none">
                {isOpen ? (<XMarkIcon className="w-6 h-6" />) : (<Bars3Icon className="w-6 h-6" />)}
            </button>

            {/*Links on desktop and tablet */}
            <div className="hidden sm:flex space-x-4 md:space-x-6">
                <Link to="/dashboard" className="font-medium">Dashboard</Link>
                <Link to="/transactions" className="font-medium">Transactions</Link>
                <Link to="/reports" className="font-medium">Reports</Link>
                <Link to="/budget-planner" className="font-medium">Budget</Link>
                <Link to="/profile" className="font-medium">Profile</Link>
            </div>

            {/*mobile dropdown menu */}
            {isOpen && (
                <div className="absolute top-14 left-0 w-full bg-linear-to-r from-purple-500 to-pink-500 text-white flex flex-col items-center space-y-4 py-4 sm:hidden">
                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
                    <Link to="/transactions" onClick={() => setIsOpen(false)}>Transactions</Link>
                    <Link to="/reports" onClick={() => setIsOpen(false)}>Reports</Link>
                    <Link to="/budget-planner" onClick={() => setIsOpen(false)}>Budget</Link>
                    <Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
                </div>
            )
            }
        </nav>
    )
}

export default Navbar;
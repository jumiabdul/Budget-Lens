import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="text-gray-300 bg-purple-700 py-4 mt-auto flex items-center justify-around w-full">
            <p className="text-sm">
                © {new Date().getFullYear()} Budget Lens. All rights reserved
            </p>
            <Link to="/settings" className="font-medium">Settings</Link>

        </footer>
    )
}
export default Footer;
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-[#0b0720]/90 backdrop-blur-xl border-t border-[#2dfbd4]/10 text-gray-400 mt-auto">

      {/* Subtle Top Glow Line */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-[#2dfbd4] to-transparent opacity-70"></div>

      <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left Side */}
        <p className="text-sm tracking-wide">
          © {new Date().getFullYear()}
          <span className="text-[#2dfbd4] font-medium"> Budget Lens</span>.
          All rights reserved.
        </p>

        {/* Right Side Links */}
        <div className="flex items-center gap-6 text-sm">
          <Link
            to="/settings"
            className="hover:text-[#2dfbd4] transition duration-300"
          >
            Settings
          </Link>

          <Link
            to="/support"
            className="hover:text-[#2dfbd4] transition duration-300"
          >
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

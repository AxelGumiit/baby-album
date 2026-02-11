import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-pink-100 to-pink-200 shadow-lg py-4 px-6 md:px-12">
      <div className="flex justify-between items-center">
        {/* Logo / Title */}
        <strong className="text-2xl md:text-3xl font-extrabold text-pink-600 drop-shadow-sm">
          🎀 Shantelle turns ONE
        </strong>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-pink-700 font-medium">
          <Link to="/" className="hover:text-pink-500 transition-colors">Home</Link>
          <Link to="/album" className="hover:text-pink-500 transition-colors">Album</Link>
          <Link to="/upload" className="hover:text-pink-500 transition-colors">Upload</Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            className="text-pink-600 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-pink-700 font-medium">
          <Link to="/" className="hover:text-pink-500 transition-colors">Home</Link>
          <Link to="/album" className="hover:text-pink-500 transition-colors">Album</Link>
          <Link to="/upload" className="hover:text-pink-500 transition-colors">Upload</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

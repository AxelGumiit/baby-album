import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  // ✨ Generate random sparkles inside navbar
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles((prev) => [
        ...prev.slice(-20), // limit to 20 sparkles
        {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          y: Math.random() * 70, // navbar height approx
          size: 2 + Math.random() * 4,
          opacity: 0.5 + Math.random() * 0.5,
        },
      ]);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="relative bg-gradient-to-r from-pink-200 via-purple-200 to-yellow-100 shadow-[0_5px_25px_rgba(255,182,193,0.6)] py-4 px-6 md:px-12 overflow-hidden">

      {/* ✨ Soft Glow Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.4),_transparent_60%)] pointer-events-none"></div>

      {/* ✨ Sparkles */}
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute bg-white rounded-full pointer-events-none"
          style={{
            width: s.size,
            height: s.size,
            left: s.x,
            top: s.y,
          }}
          initial={{ scale: 0, opacity: s.opacity }}
          animate={{ scale: [0, 1, 0], opacity: [s.opacity, 1, 0] }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      ))}

      <div className="flex justify-between items-center relative z-10">

        {/* 👑 Royal Logo */}
        <motion.strong
          className="text-2xl md:text-4xl text-purple-800 drop-shadow-lg"
          style={{ fontFamily: "'Great Vibes', cursive" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          👑 Shantelle Turns ONE 👑
        </motion.strong>

        {/* 💎 Desktop Links */}
        <div
          className="hidden md:flex gap-10 text-purple-900 text-lg"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          <Link
            to="/"
            className="relative hover:text-pink-500 transition duration-300 group"
          >
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-400 transition-all group-hover:w-full"></span>
          </Link>

          <Link
            to="/album"
            className="relative hover:text-pink-500 transition duration-300 group"
          >
            Album
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-400 transition-all group-hover:w-full"></span>
          </Link>

          <Link
            to="/upload"
            className="relative hover:text-pink-500 transition duration-300 group"
          >
            Upload
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-400 transition-all group-hover:w-full"></span>
          </Link>
        </div>

        {/* 📱 Mobile Crown Menu Button */}
        <div className="md:hidden relative z-10">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-purple-700 text-3xl hover:scale-110 transition"
          >
            👑
          </button>
        </div>
      </div>

      {/* 🏰 Animated Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden mt-6 flex flex-col gap-6 text-purple-900 text-lg"
            style={{ fontFamily: "'Cinzel', serif" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-pink-500 transition"
            >
              🏰 Home
            </Link>

            <Link
              to="/album"
              onClick={() => setMenuOpen(false)}
              className="hover:text-pink-500 transition"
            >
              📸 Album
            </Link>

            <Link
              to="/upload"
              onClick={() => setMenuOpen(false)}
              className="hover:text-pink-500 transition"
            >
              💖 Upload
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const [cursorSparkles, setCursorSparkles] = useState([]);

  // ✅ Show intro only on first visit
  useEffect(() => {
    const hasSeenIntro = localStorage.getItem("hasSeenIntro");
    if (!hasSeenIntro) setShowIntro(true);
  }, []);

  const handleEnterCastle = () => {
    setShowIntro(false);
    localStorage.setItem("hasSeenIntro", "true");
  };

  // ✨ Cursor sparkle trail
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorSparkles((prev) => [
        ...prev.slice(-25),
        { id: Date.now(), x: e.clientX, y: e.clientY },
      ]);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Random helpers for petals and hearts
  const randomX = () => Math.random() * window.innerWidth;
  const randomDelay = () => Math.random() * 5;

  return (
    <>

      {/* 👑 INTRO SCREEN */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-pink-300 via-purple-300 to-yellow-200"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* ✨ Glow Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.5),_transparent_60%)] pointer-events-none"></div>

            {/* 🎂 Animated Cake */}
            <motion.div
              className="text-8xl mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
            >
              🎂
            </motion.div>

            {/* 👑 Royal Heading */}
            <motion.h1
              className="text-5xl md:text-7xl text-white drop-shadow-2xl"
              style={{ fontFamily: "Great Vibes" }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Happy Birthday Princess 👑
            </motion.h1>

            {/* ✨ Sub Text */}
            <motion.p
              className="mt-4 text-white max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Welcome to a magical fairytale celebration filled with sparkle and love 💖
            </motion.p>

            {/* 🏰 Enter Button */}
            <motion.button
              onClick={handleEnterCastle}
              className="mt-10 px-8 py-3 bg-white text-pink-600 rounded-full shadow-2xl hover:scale-110 transition-all font-semibold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2 }}
            >
              Enter the Castle 🏰
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 👑 MAIN HOME */}
      <motion.div
        className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 1 }}
      >
        {/* 🏰 Castle */}
        <div className="absolute bottom-0 w-full text-center text-[220px] opacity-20 pointer-events-none select-none">
          🏰
        </div>

        {/* 👑 Princess Image */}
        <motion.img
          src="image/1.jpg"
          alt="Shantelle"
          className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover mb-8 shadow-[0_0_40px_rgba(255,182,193,0.8)] border-4 border-yellow-300 relative z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: showIntro ? 0.8 : 1, opacity: showIntro ? 0 : 1 }}
          transition={{ duration: 1 }}
        />

        {/* 👑 Heading */}
        <motion.h1
          className="text-5xl md:text-7xl mb-6 text-purple-800 drop-shadow-xl relative z-10"
          style={{ fontFamily: "Great Vibes" }}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: showIntro ? 40 : 0, opacity: showIntro ? 0 : 1 }}
          transition={{ duration: 0.8 }}
        >
          👑 Shantelle turns ONE 👑
        </motion.h1>

        {/* ✨ Sub Text */}
        <motion.p
          className="max-w-lg text-purple-900 mb-10 relative z-10 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: showIntro ? 0 : 1 }}
          transition={{ delay: 0.4 }}
        >
          A magical royal celebration filled with sparkle, love, and beautiful
          memories from Shantelle’s first year 💖✨
        </motion.p>

        {/* 💎 Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 relative z-10"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: showIntro ? 30 : 0, opacity: showIntro ? 0 : 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link to="/album">
            <button className="px-8 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 shadow-xl hover:scale-110 hover:shadow-[0_0_20px_gold] transition-all duration-300">
              ✨ View Royal Album
            </button>
          </Link>

          <Link to="/upload">
            <button className="px-8 py-3 rounded-full font-semibold text-purple-700 bg-white/50 backdrop-blur-md border border-yellow-300 shadow-lg hover:scale-110 hover:bg-white transition-all duration-300">
              💖 Add a Royal Memory
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </>
  );
}

export default Home;
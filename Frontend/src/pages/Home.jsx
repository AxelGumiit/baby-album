import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative flex-1 min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 flex flex-col items-center justify-center p-8 text-center"
    >
      {/* Sparkles & Hearts */}
      <div className="absolute inset-0 -z-10 sparkle-layer-1"></div>
      <div className="absolute inset-0 -z-10 sparkle-layer-2"></div>
      <div className="heart heart-1"></div>
      <div className="heart heart-2"></div>

      {/* Balloons */}
      <div className="balloon left-10"></div>
      <div className="balloon right-20 delay-2000"></div>

      {/* Glowing Halo */}
      <div className="halo"></div>

      {/* Main Image */}
      <motion.img
        src="image/1.jpg"
        alt="Shantelle"
        className="w-44 h-44 md:w-64 md:h-64 rounded-full object-cover mb-6 shadow-2xl relative z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Heading */}
      <motion.h1
        className="text-pink-600 text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-md"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        🎂 Shantelle is ONE 🎂
      </motion.h1>

      <motion.p
        className="max-w-md text-gray-700 mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        A magical digital keepsake filled with love, memories, and beautiful
        moments from Shantelle’s first year 💕
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link to="/album">
          <button className="bg-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-500 hover:scale-105 transition-all shadow-lg">
            View Album
          </button>
        </Link>
        <Link to="/upload">
          <button className="border-2 border-pink-600 text-pink-600 px-6 py-3 rounded-full font-semibold hover:bg-pink-50 hover:scale-105 transition-all shadow-lg">
            Add a Memory
          </button>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default Home;

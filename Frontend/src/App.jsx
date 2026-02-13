import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

import Home from "./pages/Home";
import Album from "./pages/Album";
import Upload from "./pages/Upload";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function AnimatedPage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}

function App() {
  const location = useLocation();
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.volume = 0.5;
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />

      {/* Global Music Player */}
      <audio ref={audioRef} src="audio/music.mp3" loop />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
            <Route path="/album" element={<AnimatedPage><Album /></AnimatedPage>} />
            <Route path="/upload" element={<AnimatedPage><Upload /></AnimatedPage>} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />

      {/* 🎵 Music Toggle Button */}
      <motion.button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full shadow-md hover:scale-105 transition"
        whileHover={{ scale: 1.1 }}
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        {playing ? "🔊 Music On" : "🔈 Music Off"}
      </motion.button>
    </div>
  );
}

export default App;

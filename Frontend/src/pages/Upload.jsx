import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [sparkles, setSparkles] = useState([]);
  const [showNotif, setShowNotif] = useState(false);

  // ✨ Cursor sparkle trail
  const handleMouseMove = (e) => {
    setSparkles((prev) => [
      ...prev.slice(-25),
      { id: Date.now(), x: e.clientX, y: e.clientY },
    ]);
  };

  // Update file and preview
  const handleFileChange = (e) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);

    if (selected) {
      const url = URL.createObjectURL(selected);
      setPreview({
        url,
        type: selected.type.startsWith("image/") ? "image" : "video",
      });
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("name", "Royal Memory");
    formData.append("message", "A magical memory");

    if (file.type.startsWith("image/")) formData.append("image", file);
    else if (file.type.startsWith("video/")) formData.append("video", file);
    else {
      alert("Only images or videos are allowed!");
      return;
    }

    try {
      await fetch("https://baby-album.onrender.com/api/media/", {
        method: "POST",
        body: formData,
      });

      // Show magical notification
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 3000);

      setFile(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("Oops! Something went wrong 😢");
    }
  };

  return (
    <motion.div
      className="relative min-h-screen overflow-hidden p-8 bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-100"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* 🏰 Parallax Castle */}
      <motion.div
        className="absolute bottom-0 w-full text-center text-[220px] opacity-20 pointer-events-none"
        animate={{ y: 10 }}
        transition={{ repeat: Infinity, duration: 4, repeatType: "reverse" }}
      >
        🏰
      </motion.div>
       {/* 💖 Heart Rain */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={"heart" + i}
          className="absolute text-pink-400 text-xl pointer-events-none"
          initial={{ y: -100, x: Math.random() * window.innerWidth }}
          animate={{ y: window.innerHeight + 100 }}
          transition={{
            duration: 6 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        >
          💖
        </motion.div>
      ))}

      {/* 🌸 Falling Petals */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={"petal" + i}
          className="absolute text-2xl pointer-events-none"
          initial={{ y: -100, x: Math.random() * window.innerWidth }}
          animate={{ y: window.innerHeight + 100, rotate: 360 }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        >
          🌸
        </motion.div>
      ))}

      {/* ✨ Cursor Sparkles */}
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="fixed text-yellow-300 pointer-events-none text-xl"
          style={{ left: s.x, top: s.y }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          ✨
        </motion.div>
      ))}

      {/* 👑 Form Card */}
      <motion.div
        className="max-w-4xl w-full bg-white/30 backdrop-blur-xl p-8 rounded-3xl shadow-xl relative z-10 mx-auto flex flex-col md:flex-row gap-8 items-start"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Form */}
        <div className="flex-1 w-full">
          <h2
            className="text-3xl text-purple-800 font-bold mb-6 text-center md:text-left"
            style={{ fontFamily: "Great Vibes" }}
          >
            ➕ Add a Royal Memory
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="file:border file:border-purple-300 file:rounded-xl file:px-4 file:py-2 file:bg-purple-50 file:text-purple-700 cursor-pointer"
              required
            />

            <button
              type="submit"
              className="mt-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white py-3 rounded-full font-semibold hover:scale-105 transition-all shadow-lg"
            >
              💖 Upload Memory
            </button>
          </form>
        </div>

        {/* Preview */}
        {preview && (
          <div className="flex-1 w-full flex justify-center items-center">
            {preview.type === "image" ? (
              <img
                src={preview.url}
                alt="Preview"
                className="max-h-60 rounded-2xl shadow-xl border-4 border-yellow-300"
              />
            ) : (
              <video
                src={preview.url}
                controls
                className="max-h-60 rounded-2xl shadow-xl border-4 border-yellow-300"
              />
            )}
          </div>
        )}
      </motion.div>

      {/* 🌟 Disney Princess–style Notification */}
      <AnimatePresence>
        {showNotif && (
          <motion.div
            className="fixed top-20 left-1/2 -translate-x-1/2 bg-pink-100/90 backdrop-blur-md border-2 border-yellow-300 rounded-3xl px-8 py-4 flex items-center gap-4 shadow-2xl z-50"
            initial={{ y: -50, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-2xl animate-pulse">✨</span>
            <p className="text-purple-700 font-semibold text-lg">
              Your magical memory has been added! 💖
            </p>
            <span className="text-2xl animate-pulse">✨</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Upload;
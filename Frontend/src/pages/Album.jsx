import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Album() {
  const [media, setMedia] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [sparkles, setSparkles] = useState([]);

  // Fetch media
  useEffect(() => {
    fetch("https://baby-album.onrender.com/api/media/")
      .then((res) => res.json())
      .then((data) => setMedia(data));
  }, []);

  // ✨ Cursor sparkle trail
  useEffect(() => {
    const move = (e) => {
      setSparkles((prev) => [
        ...prev.slice(-25),
        { id: Date.now(), x: e.clientX, y: e.clientY },
      ]);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // 💎 Download file
  const downloadFile = (url, id, type) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = type === "video" ? `video-${id}.mp4` : `photo-${id}.jpg`;
    link.click();
  };

  // 🗑️ Delete media
  const deleteMedia = async (id) => {
    const confirmDelete = window.confirm("Delete this memory? 🥺");
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `https://baby-album.onrender.com/api/media/${id}/`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setMedia((prev) => prev.filter((item) => item.id !== id));
      } else {
        console.error("Delete failed");
      }
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden p-8 bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-100 transition-all duration-1000">

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
          className="fixed text-yellow-300 pointer-events-none"
          style={{ left: s.x, top: s.y }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          ✨
        </motion.div>
      ))}

      {/* 👑 Heading */}
      <motion.h2
        className="text-center mb-16 text-6xl text-black relative z-10"
        style={{ fontFamily: "Great Vibes" }}
      >
        Royal Princess Birthday Album 👑
      </motion.h2>

      {/* 💎 Media Grid */}
      <AnimatePresence>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 relative z-10">
          {media.map((item) => {
            const fileUrl = item.image || item.video;
            const fileType = item.image ? "image" : "video";

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                whileHover={{ scale: 1.08 }}
                className="group relative bg-white/30 backdrop-blur-xl border border-yellow-300 rounded-[35px] p-6 shadow-xl flex flex-col items-center"
              >
                {fileType === "image" ? (
                  <img
                    src={fileUrl}
                    className="rounded-3xl cursor-pointer"
                    onClick={() =>
                      setSelectedMedia({ ...item, type: "image" })
                    }
                  />
                ) : (
                  <video
                    src={fileUrl}
                    className="rounded-3xl cursor-pointer"
                    onClick={() =>
                      setSelectedMedia({ ...item, type: "video" })
                    }
                  />
                )}

                {/* 🎯 Hover Actions */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">

                  {/* 🗑️ Delete */}
                  <button
                    onClick={() => deleteMedia(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg"
                  >
                    🗑️
                  </button>

                  {/* ⬇️ Download */}
                  <button
                    onClick={() => downloadFile(fileUrl, item.id, fileType)}
                    className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full shadow-lg"
                  >
                    ⬇️
                  </button>

                </div>
              </motion.div>
            );
          })}
        </div>
      </AnimatePresence>

      {/* 🌟 Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
          >
            {selectedMedia.type === "image" ? (
              <motion.img
                src={selectedMedia.image}
                className="max-h-[90vh] max-w-[90vw] rounded-3xl border-4 border-yellow-300"
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.6 }}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <motion.video
                src={selectedMedia.video}
                className="max-h-[90vh] max-w-[90vw] rounded-3xl border-4 border-yellow-300"
                controls
                autoPlay
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.6 }}
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Album;
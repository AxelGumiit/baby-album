import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

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

  // ⬇ Download
  const downloadFile = async (url, id, type) => {
    try {
      const response = await fetch(url, { mode: "cors" });
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = blobUrl;
      link.download = type === "video" ? `video-${id}.mp4` : `photo-${id}.jpg`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(blobUrl);

      toast.success("Saved to downloads 💎");
    } catch (err) {
      console.error(err);
      toast.error("Download failed ❌");
    }
  };

  // 🗑 Delete
  const deleteMedia = (id) => {
    toast((t) => (
      <div className="flex flex-col items-center gap-4 w-72 p-5 bg-white rounded-xl shadow-lg">
        <p className="text-base font-semibold text-center">
          Delete this memory? 🥺
        </p>

        <div className="flex gap-3">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const loading = toast.loading("Deleting...");

              try {
                const res = await fetch(
                  `https://baby-album.onrender.com/api/media/${id}/`,
                  { method: "DELETE" }
                );

                toast.dismiss(loading);

                if (res.ok) {
                  setMedia((prev) => prev.filter((item) => item.id !== id));
                  toast.success("Deleted successfully 🗑️");
                } else {
                  toast.error("Failed to delete ❌");
                }
              } catch (err) {
                toast.dismiss(loading);
                toast.error("Error deleting ❌");
              }
            }}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Yes
          </button>

          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="relative min-h-screen overflow-hidden p-8 bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-100">

      <Toaster position="top-center" />

      {/* 🏰 Castle */}
      <motion.div
        className="absolute bottom-0 w-full text-center text-[220px] opacity-20 pointer-events-none"
        animate={{ y: 10 }}
        transition={{ repeat: Infinity, duration: 4, repeatType: "reverse" }}
      >
        🏰
      </motion.div>

      {/* 💖 Hearts */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-400"
          initial={{ y: -100, x: Math.random() * window.innerWidth }}
          animate={{ y: window.innerHeight + 100 }}
          transition={{ duration: 6 + Math.random() * 5, repeat: Infinity }}
        >
          💖
        </motion.div>
      ))}

      {/* ✨ Sparkles */}
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

      {/* Title */}
      <motion.h2
        className="text-center mb-16 text-6xl text-pink-600"
        style={{ fontFamily: "Great Vibes, cursive" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Royal Princess Birthday Album 👑
      </motion.h2>

      {/* MEDIA GRID */}
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
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="group relative bg-white/30 backdrop-blur-xl border rounded-3xl p-4 flex flex-col items-center"
              >
                {/* Media */}
                {fileType === "image" ? (
                  <img
                    src={fileUrl}
                    onClick={() => setSelectedMedia({ ...item, type: "image" })}
                    className="rounded-2xl cursor-pointer"
                  />
                ) : (
                  <video
                    src={fileUrl}
                    onClick={() => setSelectedMedia({ ...item, type: "video" })}
                    className="rounded-2xl cursor-pointer"
                  />
                )}

                {/* 👤 Uploader */}
                <p className="mt-3 text-sm font-semibold text-purple-700">
                  👤 uploaded by {item.uploader_name || "Anonymous"}
                </p>

                {/* Actions */}
                <div className="absolute top-2 right-2 flex gap-2 bg-white/40 backdrop-blur-md p-2 rounded-full shadow-lg opacity-70 group-hover:opacity-100 transition">
                  <button
                    onClick={() => deleteMedia(item.id)}
                    className="bg-red-500 text-white p-3 rounded-full"
                  >
                    🗑️
                  </button>

                  <button
                    onClick={() => downloadFile(fileUrl, item.id, fileType)}
                    className="bg-purple-600 text-white p-3 rounded-full"
                  >
                    ⬇️
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </AnimatePresence>

      {/* MODAL */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            onClick={() => setSelectedMedia(null)}
          >
            {selectedMedia.type === "image" ? (
              <img
                src={selectedMedia.image}
                className="max-h-[90vh] max-w-[90vw] rounded-xl"
              />
            ) : (
              <video
                src={selectedMedia.video}
                controls
                autoPlay
                className="max-h-[90vh] max-w-[90vw]"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Album;
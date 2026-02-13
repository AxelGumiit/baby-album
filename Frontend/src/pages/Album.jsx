import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Album() {
  const [media, setMedia] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    fetch("https://baby-album.onrender.com/api/media/") // updated endpoint
      .then((res) => res.json())
      .then((data) => setMedia(data));
  }, []);

  const downloadFile = (url, id, type) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = type === "video" ? `video-${id}.mp4` : `photo-${id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 p-8">
      {/* Heading */}
      <motion.h2
        className="text-pink-600 text-4xl md:text-5xl font-extrabold mb-10 text-center"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        📸 Birthday Album
      </motion.h2>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {media.map((item) => {
          const fileUrl = item.image || item.video;
          const fileType = item.image ? "image" : "video";

          return (
            <motion.div
              key={item.id}
              className="relative bg-pink-200 border-4 border-pink-500 rounded-3xl p-4 shadow-lg flex flex-col items-center overflow-hidden"
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ type: "spring", stiffness: 220 }}
            >
              <div className="p-1 rounded-2xl mb-3 w-full">
                {fileType === "image" ? (
                  <img
                    src={fileUrl}
                    className="w-full rounded-2xl object-cover cursor-pointer hover:opacity-95 transition duration-300"
                    onClick={() => setSelectedMedia({ ...item, type: "image" })}
                    title="Click to view full-screen"
                  />
                ) : (
                  <video
                    src={fileUrl}
                    className="w-full rounded-2xl object-cover cursor-pointer hover:opacity-95 transition duration-300"
                    onClick={() => setSelectedMedia({ ...item, type: "video" })}
                    controls={false}
                  />
                )}
              </div>

              <button
                onClick={() => downloadFile(fileUrl, item.id, fileType)}
                className="mt-auto bg-pink-600 text-white px-5 py-2 rounded-full text-sm sm:text-base hover:bg-pink-500 shadow-md transition-all"
              >
                Download
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
          >
            {selectedMedia.type === "image" ? (
              <motion.img
                src={selectedMedia.image}
                className="max-h-[90vh] max-w-[90vw] rounded-3xl shadow-2xl object-contain"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <motion.video
                src={selectedMedia.video}
                className="max-h-[90vh] max-w-[90vw] rounded-3xl shadow-2xl object-contain"
                controls
                autoPlay
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              />
            )}
            <motion.button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-5 right-5 text-white text-3xl font-bold hover:text-pink-400"
            >
              &times;
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Album;

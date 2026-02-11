import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Album() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/photos/`)
      .then(res => res.json())
      .then(data => setPhotos(data));
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-100 via-pink-100 to-rose-200 p-8">

      {/* Sparkle background */}
      <div className="absolute inset-0 -z-10 sparkle-layer-1 opacity-20"></div>

      {/* Floating balloons */}
      <div className="balloon left-10 opacity-40"></div>
      <div className="balloon right-20 delay-2000 opacity-40"></div>

      <motion.h2
        className="text-pink-600 text-4xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        📸 Birthday Album
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-xl flex flex-col items-center cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-300"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img
              src={photo.image}
              alt=""
              className="w-full rounded-xl mb-4 object-cover"
            />
            <p className="text-gray-700 mb-2 text-center">{photo.message}</p>
            <small className="text-pink-600">{photo.name || "With love 💕"}</small>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.img
              src={selectedPhoto.image}
              alt=""
              className="max-h-full max-w-full rounded-2xl shadow-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Album;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploaderName, setUploaderName] = useState("");
  const [showNotif, setShowNotif] = useState(false);

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

    // 👤 uploader name goes here
    formData.append("uploader_name", uploaderName);

    if (file.type.startsWith("image/")) {
      formData.append("image", file);
    } else if (file.type.startsWith("video/")) {
      formData.append("video", file);
    } else {
      alert("Only images or videos are allowed!");
      return;
    }

    try {
      await fetch("https://baby-album.onrender.com/api/media/", {
        method: "POST",
        body: formData,
      });

      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 3000);

      setFile(null);
      setPreview(null);
      setUploaderName("");
    } catch (err) {
      console.error(err);
      alert("Upload failed 😢");
    }
  };

  return (
    <motion.div className="min-h-screen p-8 bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-100">

      {/* FORM */}
      <div className="max-w-xl mx-auto bg-white/40 backdrop-blur-xl p-6 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">
          Add a Royal Memory 👑
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* 👤 Name input */}
          <input
            type="text"
            placeholder="Your name"
            value={uploaderName}
            onChange={(e) => setUploaderName(e.target.value)}
            className="p-3 rounded-xl border border-purple-300"
            required
          />

          {/* 📁 File input */}
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="file:bg-purple-100 file:px-4 file:py-2 file:rounded-xl"
            required
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-pink-400 to-purple-500 text-white py-3 rounded-full hover:scale-105 transition"
          >
            💖 Upload Memory
          </button>
        </form>

        {/* PREVIEW */}
        {preview && (
          <div className="mt-4">
            {preview.type === "image" ? (
              <img src={preview.url} className="rounded-xl max-h-60" />
            ) : (
              <video src={preview.url} controls className="rounded-xl max-h-60" />
            )}
          </div>
        )}
      </div>

      {/* NOTIFICATION */}
      <AnimatePresence>
        {showNotif && (
          <motion.div
            className="fixed top-10 left-1/2 -translate-x-1/2 bg-pink-100 px-6 py-3 rounded-2xl shadow-xl border border-yellow-300"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
          >
            ✨ Memory uploaded successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Upload;
import { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

function Upload() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("message", message);
    formData.append("image", image);

    try {
      const res = await fetch("https://baby-album.onrender.com/api/photos/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      toast.success("Memory added 💕", {
        position: "top-center",
        duration: 4000,
        style: {
          background: "#F9E0E8",
          color: "#D6336C",
          fontWeight: "bold",
          borderRadius: "12px",
          padding: "16px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        },
      });

      setName("");
      setMessage("");
      setImage(null);
    } catch (err) {
      toast.error("Oops! Something went wrong 😢", {
        position: "top-center",
        duration: 4000,
      });
      console.error(err);
    }
  };

  return (
    <motion.div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 flex items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Toast container */}
      <Toaster />

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

      {/* Form Card */}
      <motion.div
        className="max-w-md w-full bg-pink-300 p-8 rounded-2xl shadow-lg relative z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-pink-600 text-2xl font-bold mb-6 text-center">
          ➕ Add a Memory
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="file:border file:border-pink-300 file:rounded-lg file:px-4 file:py-2 file:bg-pink-50 file:text-pink-700 cursor-pointer"
            required
          />


          <button
            type="submit"
            className="bg-pink-600 text-white py-3 rounded-xl font-semibold mt-4 hover:bg-pink-500 transition-colors"
          >
            Upload 💝
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default Upload;

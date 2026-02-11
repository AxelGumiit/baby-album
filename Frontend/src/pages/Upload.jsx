import { useState } from "react";

function Upload() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/photos/`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload");

      setSuccessMessage("Photo added 💕");
      setName("");
      setImage(null);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setErrorMessage("Unsuccessful 😢");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-pink-600 text-2xl font-bold mb-6">➕ Add a Memory</h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
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

      {successMessage && <p className="mt-4 text-green-600 font-semibold">{successMessage}</p>}
      {errorMessage && <p className="mt-4 text-red-600 font-semibold">{errorMessage}</p>}
    </div>
  );
}

export default Upload;

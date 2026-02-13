import { useEffect, useState } from "react";

function Album() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch("https://baby-album.onrender.com/api/photos/")
      .then((res) => res.json())
      .then((data) => setPhotos(data));
  }, []);

  // Function to trigger download
  const downloadImage = (url, id) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `photo-${id}.jpg`; // filename for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-pink-600 text-3xl font-bold mb-8">📸 Birthday Album</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded-2xl p-4 shadow-md flex flex-col items-center"
          >
            <img
              src={photo.image}
              alt=""
              className="w-full rounded-xl mb-4 object-cover cursor-pointer hover:opacity-90 transition"
              onClick={() => downloadImage(photo.image, photo.id)}
              title="Click to download"
            />
            <p className="text-gray-700 mb-2 text-center">{photo.message}</p>
            <small className="text-pink-600">— {photo.name || "With love"}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Album;

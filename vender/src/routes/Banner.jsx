import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Vendor/Sidebar";
import { API_URI } from "../Contants";

const Banner = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const resp = await axios.get(`${API_URI}/api/admin/banners`);
      setBanners(resp.data);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!selectedFile) {
      alert("Please select an image file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    fetch(`${API_URI}/api/admin/banners`, {
      method: "POST",
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      alert("Banner posted successfully!");
      setSelectedFile(null);
      setPreview(null);
      fetchBanners();  // Refresh banners after posting
    })
    .catch(error => {
      console.error("Error posting banner:", error);
      alert("Failed to post banner.");
    });
  };

  console.log("banners", banners);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:block md:block hidden">
        <Sidebar />
      </div>

      <div className="flex-grow p-6 bg-gray-100 rounded-lg shadow-lg mt-8 lg:mt-0 mx-4 lg:mx-10">
        <h2 className="text-2xl font-semibold mb-6 text-center lg:text-left">Post Banner</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center lg:items-start mt-20">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4 border border-gray-300 rounded-lg p-2 w-full lg:w-auto"
          />
          {preview && (
            <div className="mb-4">
              <img src={preview} alt="Preview" className="max-w-full h-auto rounded-lg shadow-md" />
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Post Banner
          </button>
        </form>

        <h2 className="text-2xl font-semibold mt-10 mb-6 text-center lg:text-left">Banners</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {banners.length > 0 ? (
            banners.map((banner) => (
              <div key={banner._id} className="border rounded-lg overflow-hidden shadow-md">
                <img
                  src={`${API_URI}/${banner.path.replace(/\\/g, '/')}`}  // Replace backslashes with forward slashes
                  alt={banner.filename}
                  className="w-full h-auto"
                />
              </div>
            ))
          ) : (
            <p>No banners available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;

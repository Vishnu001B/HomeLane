import React, { useState } from "react";
import axios from "axios";
import { API_URI } from "../../Contants"; // Fixed typo in the import path
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    VendorUser: userId,
    title: "",
    description: "",
    category: "",
    price: "",
    discountPercentage: "",
    rating: "",
    brand: "",
    sku: "",
    weight: "",
    dimensions: { width: "", height: "" },
    images: [],
    thumbnail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handling dimensions as separate values
    if (name.includes("dimensions.")) {
      const dimensionKey = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        dimensions: {
          ...prevData.dimensions,
          [dimensionKey]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const base64Images = await Promise.all(
      files.map((file) => convertToBase64(file))
    );
    setFormData((prevData) => ({
      ...prevData,
      images: base64Images,
    }));
  };

  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64Thumbnail = await convertToBase64(file);
      setFormData((prevData) => ({
        ...prevData,
        thumbnail: base64Thumbnail,
      }));
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      dimensions: {
        width: parseFloat(formData.dimensions.width),
        height: parseFloat(formData.dimensions.height),
      },
    };

    try {
      await axios.post(`${API_URI}/api/vendor/products`, productData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire({
        icon: "success",
        title: "Product created successfully",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      navigate("/products");
    } catch (error) {
      console.error("Error creating product:", error);
      Swal.fire({
        icon: "error",
        title: "Error creating product",
        text: error.response?.data?.message || error.message,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="flex">
      <div>
        <div className="lg:block md:block hidden">
          <Sidebar />
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-7xl mx-auto p-4 px-10 w-full pt-20"
      >
        <h1 className="bg-gray-800 text-white px-10 p-4 my-4 mb-10">
          Add Product
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[
            "title",
            "description",
            "category",
            "price",
            "discountPercentage",
            "rating",
            "brand",
            "sku",
          ].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type="text"
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="border p-2 w-full"
                required={
                  field !== "discountPercentage" &&
                  field !== "warrantyInformation"
                }
              />
            </div>
          ))}

          <div>
            <label htmlFor="dimensions.width" className="block">
              Width
            </label>
            <input
              type="number"
              id="dimensions.width"
              name="dimensions.width"
              value={formData.dimensions.width}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label htmlFor="dimensions.height" className="block">
              Height
            </label>
            <input
              type="number"
              id="dimensions.height"
              name="dimensions.height"
              value={formData.dimensions.height}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label htmlFor="images" className="block">
              Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={handleImageChange}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="thumbnail" className="block">
              Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              onChange={handleThumbnailChange}
              className="border p-2 w-full"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full lg:w-auto mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;

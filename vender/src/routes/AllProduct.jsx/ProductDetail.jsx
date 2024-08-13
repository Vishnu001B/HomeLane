import React from "react";
import { API_URI } from "../../Contants";
import Swal from "sweetalert2";
import axios from "axios";

const ProductDetail = ({ product, onEditClick, setProducts }) => {
  if (!product)
    return <div className="text-center mt-20">No product selected</div>;

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        const resp = await axios.delete(
          `${API_URI}/api/vendor/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        Swal.fire({
          title: "Deleted!",
          text: "Product has been deleted.",
          icon: "success",
          confirmButtonText: "Close",
        });
        // Optionally, update the products list
        setProducts(resp.data);
      } catch (error) {
        console.error("Error deleting product:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete product.",
          icon: "error",
          confirmButtonText: "Close",
        });
      }
    }
  };

  return (
    <div className="container mx-auto lg:p-4 pt-24 w-full p-5">
      <div className="bg-white border rounded-lg shadow-lg overflow-hidden  ">
        <div className="flex flex-col md:flex-row md:space-x-4 ">
          <div className="w-full">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-64 object-cover rounded-t-lg md:rounded-none"
            />
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4 text-center">
            {product.title}
          </h2>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col">
              <span className="text-gray-900 font-semibold">Category:</span>
              <span className="text-gray-700">{product.category}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 font-semibold">Price:</span>
              <span className="text-gray-700">
                <span className="p-1">₹</span>
                {product?.price?.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 font-semibold">Discount:</span>
              <span className="text-gray-700">
                {product.discountPercentage}%
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 font-semibold">Rating:</span>
              <span className="text-gray-700">{product.rating}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 font-semibold">Brand:</span>
              <span className="text-gray-700">{product.brand}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 font-semibold">SKU:</span>
              <span className="text-gray-700">{product.sku}</span>
            </div>
            <div className="flex flex-col w-full">
              <span className="text-gray-900 font-semibold">Dimensions:</span>
              <span className="text-gray-700">
                {product.dimensions.width} x {product.dimensions.height} cm
              </span>
            </div>
          </div>
          <div className="flex justify-center md:justify-between items-center gap-5">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={onEditClick}
            >
              Edit Product
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              onClick={() => handleDelete(product._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

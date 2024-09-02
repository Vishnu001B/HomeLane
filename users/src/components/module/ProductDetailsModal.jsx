import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProductDetailsModal = ({ product, onClose }) => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = () => {
    if (name && phone) {
      navigate("/productDetails", { state: { product } });
      onClose();
    } else {
      Swal.fire({
        title: "Submission Failed",
        text: "Please fill in both name and phone number.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-2xl w-full max-w-4xl overflow-hidden transform transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-75"
        }`}
      >
        <div className="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
          {/* Image Section */}
          <div className="w-full md:w-1/2 bg-gray-50 flex justify-center items-center p-4 sm:p-6">
            <img
              src={`${URI}uploads/${product?.images[0]}`}
              alt={product.title}
              className="w-full h-96 mb-2 rounded-t-md"
            />
          </div>

          {/* Product Details Section */}
          <div
            className="w-full md:w-1/2 p-4 sm:p-6 overflow-y-auto"
            style={{ backgroundColor: "#eaedf0" }}
          >
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 sm:mb-8">
              {product.title}
            </h3>
            <p className="text-gray-500 mb-4">{product.descriptions}</p>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <p className="text-red-600 text-xl font-bold">
                ₹ {product.discountedPrice}
              </p>
              <p className="text-gray-400 line-through sm:ml-2">
                ₹ {product.price}
              </p>
              <p className="text-green-600 sm:ml-2">
                ({product.discount}%) OFF
              </p>
            </div>
            <p className="text-gray-700 mb-4 sm:mb-8 leading-relaxed">
              {product.descriptions}
            </p>

            {/* Name and Phone Number Form */}
            <div>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-500 p-3 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="number"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-gray-500 p-3 rounded-md w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                className="bg-blue-600 text-white px-4 py-3 rounded-md w-full hover:bg-blue-700 transition duration-300"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          className="text-gray-500 text-2xl absolute top-4 right-4 hover:text-gray-700 transition duration-300"
          onClick={handleClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsModal;

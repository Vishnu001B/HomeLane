import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProductDetailsModal = ({ product, onClose }) => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger the animation for showing the modal
    setIsVisible(true);
  }, []);

  const handleSubmit = () => {
    if (name && phone) {
      navigate("/productDetails", { state: { product } });
      onClose(); // Close the modal when the form is submitted
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
    setTimeout(onClose, 300); // Delay the close to allow the animation to finish
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
        <div className="flex flex-col sm:flex-row">
          {/* Image Section */}
          <div className="w-full sm:w-1/2 bg-gray-50 flex justify-center items-center p-6">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-auto object-cover rounded-md shadow-md"
            />
          </div>

          {/* Product Details Section */}
          <div
            className="w-full sm:w-1/2 p-4"
            style={{ backgroundColor: "#eaedf0" }}
          >
            <h3 className="text-3xl font-semibold text-gray-800 mb-8">
              {product.name}
            </h3>
            <div className="flex justify-between items-center mb-1">
              <p className="text-red-600 text-xl font-bold">
                ₹ {product.discountedPrice}
              </p>
              <p className="text-gray-400 line-through ">₹ {product.price}</p>
              <p className="text-green-600">
                ({product.discountPercentage}%) OFF
              </p>
            </div>
            <p className="text-gray-500 mb-12">{product.delivery}</p>
            <p className="text-gray-700 mb-8 leading-relaxed">
              This product is perfect for those looking to enhance their space
              with something stylish and functional. Made with high-quality
              materials, it offers both durability and a modern look. Whether
              for your home or office, this product is designed to meet your
              needs and exceed your expectations.
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

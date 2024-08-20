import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProductDetailsModal = ({ product, onClose }) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name && phone) {
      navigate('/productDetails', { state: { product } });
      onClose(); // Close the modal when form is submitted
    } else {
      Swal.fire({
        title: 'Submission Failed',
        text: 'Please fill in both name and phone number.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl relative flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="w-full sm:w-1/2 flex justify-center items-center p-4">
          <div className="w-full h-full">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="w-full sm:w-1/2 p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
            <div className="flex justify-between items-center gap-2 mb-4">
              <p className="text-red-500 text-lg font-semibold">₹ {product.discountedPrice}</p>
              <p className="text-gray-500 line-through">₹ {product.price}</p>
              <p className="text-green-500">
                ({product.discontpersentage}%) OFF
              </p>
            </div>
            <p className="text-gray-500 mb-4">{product.delivery}</p>
          </div>

          {/* Name and Phone Number Form */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition duration-300"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          className="text-gray-500 text-3xl absolute top-2 right-4 hover:text-gray-700 transition duration-300"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsModal;

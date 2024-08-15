import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

const ProductDetailsModal = ({ product, onClose }) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate()

  const handleSubmit = () => {
    if (name && phone) {
     
        navigate('/productDetails', { state: { product } });
   

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
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full sm:w-[800px] relative flex flex-wrap sm:flex-row">
        {/* Image Section */}
        <div className="w-full sm:w-1/2 flex justify-center mb-4 sm:mb-0">
          <img 
            src={product.img} 
            alt={product.name} 
            className="w-full h-auto max-h-[500px] object-cover rounded"
          />
        </div>

        {/* Product Details Section */}
        <div className="w-full sm:w-1/2 p-4">
          <h3 className="text-lg font-medium mb-2">{product.name}</h3>
          
          <div className="flex w-full justify-between items-center gap-2 mb-2">
            <p className="text-red-400 text-lg font-semibold">₹ {product.discountedPrice}</p>
            <p className="text-gray-500 line-through">₹ {product.price}</p>
            <p className="text-green-500">
              ({product.discontpersentage}%) OFF
            </p>
          </div>

          <p className="text-gray-500 mb-4">{product.delivery}</p>

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
              className="border p-2 rounded w-full mb-2"
            />
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded w-full"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button 
          className="text-gray-500 absolute top-2 right-4" 
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsModal;

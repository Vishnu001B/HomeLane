import React, { useState } from 'react';

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState('https://s3.amazonaws.com/adroitart/images/14467/original/Chevron_Product_5006.jpg?1708332162/'); // Replace with your default image URL

  const images = [
    'https://s3.amazonaws.com/adroitart/images/14468/original/FB-5006.jpg?1692352431', // Replace with your image URLs
    'https://s3.amazonaws.com/adroitart/images/14469/original/FB-5006.jpg?1692352432/300x300',
    'https://via.placeholder.com/300x300',
    'https://via.placeholder.com/300x300',
  ];

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row">
      {/* Left Section - Images */}
      <div className="lg:w-1/3 flex flex-col items-center">
        <div className="mb-4">
          <img src={selectedImage} alt="Selected" className="w-full h-auto rounded-lg" />
        </div>
        <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              onClick={() => setSelectedImage(img)}
              className="w-16 h-16 lg:w-20 lg:h-20 cursor-pointer rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Right Section - Product Details */}
      <div className="lg:w-2/3 mt-8 lg:mt-0 lg:pl-8">
        <h1 className="text-3xl font-bold mb-4">Antique Sapele</h1>
        <p className="mb-4">
          Chevron-A decorative design made up of angled cross-hatching. Its traditional and elegant
          look enhances classic interiors. The "V" shape which is what makes Chevron wood flooring
          so distinctive.
        </p>
        <div className="mb-4">
          <p><strong>Collection:</strong> Chevron</p>
          <p><strong>Pattern Number:</strong> 12345</p>
          <p><strong>Plank Size:</strong> 1215mm X 300mm x 8mm</p>
          <p><strong>MRP/ Box:</strong> ₹ 6276/Box</p>
          <p><strong>MRP/ Sq. Ft.:</strong> ₹ 200.0</p>
        </div>

        {/* Flooring Quantity Calculator */}
        <div className="mb-4">
          <p className="mb-2"><strong>Flooring Quantity Calculator</strong></p>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="W(ft)"
              className="w-1/3 p-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="H(ft)"
              className="w-1/3 p-2 border rounded-md"
            />
            <button className="w-1/3 p-2 bg-yellow-500 text-white rounded-md">
              Calculate
            </button>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mb-4 flex items-center space-x-4">
          <p className="font-bold">Quantity</p>
          <div className="flex items-center">
            <button className="px-4 py-2 border border-gray-300 rounded-l-md">-</button>
            <input type="number" value="1" readOnly className="w-16 p-2 text-center border-t border-b border-gray-300" />
            <button className="px-4 py-2 border border-gray-300 rounded-r-md">+</button>
          </div>
        </div>

        {/* Delivery Options */}
        <div className="mb-4">
          <p className="font-bold mb-2">Delivery Options</p>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Pincode"
              className="flex-grow p-2 border rounded-md"
            />
            <button className="p-2 bg-yellow-500 text-white rounded-md">
              Check
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button className="p-2 bg-yellow-500 text-white rounded-md flex-grow">
            Add To Cart
          </button>
          <button className="p-2 bg-yellow-500 text-white rounded-md flex-grow">
            Buy Now
          </button>
          <button className="p-2 bg-yellow-500 text-white rounded-md">
            Buy Offline
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

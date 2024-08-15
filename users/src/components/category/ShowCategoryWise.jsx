import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductDetailsModal from '../module/ProductDetailsModal'; // Import the modal component

const formatPrice = (price) => {
  return price.replace(/,/g, ''); // Remove comma for numeric operations
};

const ShowCategoryWise = ({ title, products }) => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const calculateDiscountedPrice = (price, discountPercentage) => {
    const priceNumber = parseFloat(formatPrice(price));
    const discount = (parseFloat(discountPercentage) / 100);
    return (priceNumber - (priceNumber * discount)).toFixed(2);
  };

  const handleOnClick = (product) => {
    const discountedPrice = calculateDiscountedPrice(product.price, product.discontpersentage);
    setSelectedProduct({ ...product, discountedPrice });
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10">
      {products.map((product, index) => {
        const { discontpersentage, name, price, delivery, img } = product;
        const originalPrice = price; 
        const discountedPrice = calculateDiscountedPrice(originalPrice, discontpersentage);

        return (
          <div 
            key={index} 
            className="card-info hover:shadow-md hover:shadow-black text-sm font-serif text-center font-thin flex flex-col justify-center items-center py-4 border rounded-lg shadow-md cursor-pointer" 
            onClick={() => handleOnClick(product)}
          >
            <img src={img} alt={name} className="w-full h-auto mb-2" />
            <h3 className="text-lg font-medium mb-1">{name}</h3>

            {parseFloat(discountedPrice) < parseFloat(formatPrice(originalPrice)) && (
              <div className='flex justify-between items-center gap-2'>
                <p className="text-red-400 mb-1">₹ {discountedPrice}</p>
                <p className="text-gray-500 line-through mb-1">₹ {formatPrice(originalPrice)}</p>
                <p className="text-green-500 mb-1">
                  ({discontpersentage}%) OFF
                </p>
              </div>
            )}

            {parseFloat(discountedPrice) >= parseFloat(formatPrice(originalPrice)) && (
              <p className="text-red-400 mb-1">₹ {formatPrice(originalPrice)}</p>
            )}

            <p className="text-gray-500">{delivery}</p>
          </div>
        );
      })}

      {selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default ShowCategoryWise;

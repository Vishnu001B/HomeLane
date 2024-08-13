import React from 'react';
import { useNavigate } from 'react-router-dom';

// Function to format currency values
const formatPrice = (price) => {
  return price.replace(/,/g, ''); // Remove comma for numeric operations
};

const ShowCategoryWise = ({ title, products }) => {
  const navigate = useNavigate();

  // Function to calculate the discounted price based on the discount percentage
  const calculateDiscountedPrice = (price, discountPercentage) => {
    const priceNumber = parseFloat(formatPrice(price));
    const discount = (parseFloat(discountPercentage) / 100);
    return (priceNumber - (priceNumber * discount)).toFixed(2);
  };

  // Function to handle product click and navigate to product details
  const handleOnClick = (product) => {
    navigate('/productDetails', { state: { product } });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10">
      {products.map((product, index) => {
        const { discontpersentage, name, price, delivery, img } = product;
        const originalPrice = price; // Assume price is the original price in this case
        const discountedPrice = calculateDiscountedPrice(originalPrice, discontpersentage);

        return (
          <div 
            key={index} 
            className="card-info hover:shadow-md hover:shadow-black text-sm font-serif text-center font-thin flex flex-col justify-center items-center py-4 border rounded-lg shadow-md cursor-pointer" 
            onClick={() => handleOnClick(product)}
          >
            <img src={img} alt={name} className="w-full h-auto mb-2" />
            <h3 className="text-lg font-medium mb-1">{name}</h3>

            {/* Display the original price and discounted price */}
            {parseFloat(discountedPrice) < parseFloat(formatPrice(originalPrice)) && (
              <>
                
               <div className='flex justify-between items-center gap-2'>
               <p className="text-red-400 mb-1">₹ {discountedPrice}</p>
                <p className="text-gray-500 line-through mb-1">₹ {formatPrice(originalPrice)}</p>
                <p className="text-green-500 mb-1">
                  ({discontpersentage}%) OFF
                </p>
               </div>
              </>
            )}

            {/* Display only the price if no discount */}
            {parseFloat(discountedPrice) >= parseFloat(formatPrice(originalPrice)) && (
              <p className="text-red-400 mb-1">₹ {formatPrice(originalPrice)}</p>
            )}

            <p className="text-gray-500">{delivery}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ShowCategoryWise;

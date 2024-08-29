import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import ProductDetailsModal from "../module/ProductDetailsModal"; // Import the modal component
import { FaCartPlus } from "react-icons/fa"; // Import the cart icon

const formatPrice = (price) => {
  return price.replace(/,/g, ""); // Remove comma for numeric operations
};

const ShowCategoryWise = ({ title, products }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [selectedProduct, setSelectedProduct] = useState(null);

  const calculateDiscountedPrice = (price, discountPercentage) => {
    const priceNumber = parseFloat(formatPrice(price));
    const discount = parseFloat(discountPercentage) / 100;
    return (priceNumber - priceNumber * discount).toFixed(2);
  };

  const handleOnClick = (product) => {
    const discountedPrice = calculateDiscountedPrice(
      product.price,
      product.discontpersentage
    );
    setSelectedProduct({ ...product, discountedPrice });
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleBookNow = (product) => {
    // Add logic for booking the product
    console.log("Booking product:", product.name);
    // You can navigate or perform any other actions here
  };

  const handleAddToCart = (product) => {
    // Add logic for adding the product to the cart
    console.log("Adding to cart:", product.name);
    // You can update the cart state or perform any other actions here
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10">
      {products.map((product, index) => {
        const { discontpersentage, name, price, delivery, img } = product;
        const originalPrice = price;
        const discountedPrice = calculateDiscountedPrice(
          originalPrice,
          discontpersentage
        );

        return (
          <div
            key={index}
            className="card-info hover:shadow-md hover:shadow-black text-sm font-serif text-center font-thin flex flex-col justify-center items-center py-4 px-4 bg-white border rounded-lg shadow-md cursor-pointer"
            onClick={() => handleOnClick(product)}
          >
            <img src={img} alt={name} className="w-full h-96 mb-2 rounded" />
            <h3 className="text-lg font-medium mb-1">{name}</h3>

            {parseFloat(discountedPrice) <
              parseFloat(formatPrice(originalPrice)) && (
              <div className="flex justify-between items-center gap-2">
                <p className="text-red-400 mb-1">₹ {discountedPrice}</p>
                <p className="text-gray-500 line-through mb-1">
                  ₹ {formatPrice(originalPrice)}
                </p>
                <p className="text-green-500 mb-1">
                  ({discontpersentage}%) OFF
                </p>
              </div>
            )}

            {parseFloat(discountedPrice) >=
              parseFloat(formatPrice(originalPrice)) && (
              <p className="text-red-400 mb-1">
                ₹ {formatPrice(originalPrice)}
              </p>
            )}

            <p className="text-gray-500">{delivery}</p>

            <div
              className={`mt-4 flex ${
                location.pathname === "/category/InteriorDesgin"
                  ? "justify-center"
                  : "justify-between"
              } gap-2 w-full`}
            >
              <button
                onClick={() => handleBookNow(product)}
                className="bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white font-medium px-6 py-2 rounded-full transition-transform transform hover:scale-105"
              >
                Book Now
              </button>
              {/* Conditionally render the "Add to Cart" button */}
              {location.pathname !== "/category/InteriorDesgin" && (
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex items-center justify-center bg-black text-white font-medium px-4 py-2 rounded-full transition-transform transform hover:scale-105"
                >
                  <FaCartPlus className="mr-2" />
                  Add to Cart
                </button>
              )}
            </div>
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
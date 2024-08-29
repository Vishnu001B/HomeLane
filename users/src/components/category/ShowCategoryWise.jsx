import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductDetailsModal from "../module/ProductDetailsModal"; // Import the modal component
import { FaCartPlus } from "react-icons/fa"; // Import the cart icon
import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../../store/bagSlice";
import { Alert, Snackbar } from "@mui/material";

const formatPrice = (price) => {
  return price.replace(/,/g, ""); // Remove comma for numeric operations
};

const ShowCategoryWise = ({ title, products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch function
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const bagItem = useSelector((store) => store.bag);

  const calculateDiscountedPrice = (price, discountPercentage) => {
    const priceNumber = parseFloat(formatPrice(price));
    const discount = parseFloat(discountPercentage) / 100;
    return (priceNumber - priceNumber * discount).toFixed(2);
  };

  const handleOnClick = (product) => {
    // Handle product click, e.g., navigate to product details page
    navigate(`/product/${product.id}`);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleBookNow = (product) => {
    const discountedPrice = calculateDiscountedPrice(
      product.price,
      product.discontpersentage
    );
    setSelectedProduct({ ...product, discountedPrice }); // Open the modal
  };

  const handleAddToCart = (product) => {
    dispatch(
      bagActions.addToBag({
        data: { ...product, quantity: 1 },
        totalQuantity: 1,
      })
    );
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
          >
            <img src={img} alt={name} className="w-full h-auto mb-2 rounded" />
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

            <div className="mt-4 flex justify-between gap-2 w-full">
              <button
                onClick={() => handleBookNow(product)}
                className="bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white font-medium px-6 py-2 rounded-full transition-transform transform hover:scale-105"
              >
                Book Now
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the product modal
                  handleAddToCart(product);
                }}
                className="flex items-center justify-center bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white font-medium px-4 py-2 rounded-full transition-transform transform hover:scale-105"
              >
                <FaCartPlus className="mr-2" />
                Add to Cart
              </button>
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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Item added to cart!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ShowCategoryWise;

import React, { useState } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import ProductDetailsModal from "../module/ProductDetailsModal"; // Import the modal component
import { FaCartPlus } from "react-icons/fa"; // Import the cart icon
import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../../store/bagSlice";
import { Alert, Snackbar } from "@mui/material";
=======
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import ProductDetailsModal from "../module/ProductDetailsModal"; // Import the modal component
import { FaCartPlus } from "react-icons/fa"; // Import the cart icon
>>>>>>> f423b24c2b7e34e2c4c39196f0e3c5f2a41d2015

const formatPrice = (price) => {
  return price.replace(/,/g, ""); // Remove comma for numeric operations
};

const ShowCategoryWise = ({ title, products }) => {
  const navigate = useNavigate();
<<<<<<< HEAD
  const dispatch = useDispatch(); // Initialize dispatch function
  const [openSnackbar, setOpenSnackbar] = useState(false);
=======
  const location = useLocation(); // Get the current location
>>>>>>> f423b24c2b7e34e2c4c39196f0e3c5f2a41d2015
  const [selectedProduct, setSelectedProduct] = useState(null);
  const bagItem = useSelector((store) => store.bag);

  const calculateDiscountedPrice = (price, discountPercentage) => {
    const priceNumber = parseFloat(formatPrice(price));
    const discount = parseFloat(discountPercentage) / 100;
    return (priceNumber - priceNumber * discount).toFixed(2);
  };

  const handleOnClick = (product) => {
<<<<<<< HEAD
    // Handle product click, e.g., navigate to product details page
    navigate(`/product/${product.id}`);
=======
    const discountedPrice = calculateDiscountedPrice(
      product.price,
      product.discontpersentage
    );
    setSelectedProduct({ ...product, discountedPrice });
>>>>>>> f423b24c2b7e34e2c4c39196f0e3c5f2a41d2015
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleBookNow = (product) => {
<<<<<<< HEAD
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
=======
    // Add logic for booking the product
    console.log("Booking product:", product.name);
    // You can navigate or perform any other actions here
  };

  const handleAddToCart = (product) => {
    // Add logic for adding the product to the cart
    console.log("Adding to cart:", product.name);
    // You can update the cart state or perform any other actions here
>>>>>>> f423b24c2b7e34e2c4c39196f0e3c5f2a41d2015
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
<<<<<<< HEAD
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
=======
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
>>>>>>> f423b24c2b7e34e2c4c39196f0e3c5f2a41d2015
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

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductDetailsModal from "../module/ProductDetailsModal";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { bagActions } from '../../store/bagSlice';
import { Snackbar, Alert } from "@mui/material";

const formatPrice = (price) => {
  return price.replace(/,/g, ""); // Remove comma for numeric operations
};

const ShowCategoryWise = ({ title, products }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

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

  const path = decodeURIComponent(location.pathname);

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
            className="border-2 border-gray-300 bg-gray-100 rounded-md my-10 shadow-lg shadow-blue-gray-200 overflow-hidden transition-transform duration-300 transform hover:scale-105"
          >
            <img src={img} alt={name} className="w-full h-96 mb-2 rounded-t-md" />
            <div className="px-5">
              <h3 className="text-lg font-semibold mb-1">{name}</h3>

              {parseFloat(discountedPrice) < parseFloat(formatPrice(originalPrice)) && (
                <div className="flex justify-between items-center gap-2">
                  <p className="text-red-400 mb-1">₹ {discountedPrice}</p>
                  <p className="text-gray-500 line-through mb-1">₹ {formatPrice(originalPrice)}</p>
                  <p className="text-green-500 mb-1">({discontpersentage}%) OFF</p>
                </div>
              )}

              {parseFloat(discountedPrice) >= parseFloat(formatPrice(originalPrice)) && (
                <p className="text-red-400 mb-1">₹ {formatPrice(originalPrice)}</p>
              )}

              <p className="text-gray-500">{delivery}</p>
            </div>
            <div
              className={`mt-4 flex w-full my-4 px-5 gap-5 ${path !== "/category/InteriorDesign" && path !== "/category/Interior Design" ? "justify-center" : "justify-between"}`}
            >
              <button
                onClick={() => handleOnClick(product)}
                className="border-2 hover:border-none border-black rounded-md text-black py-2 px-4 hover:bg-green-500 w-full hover:text-white transition duration-300 flex justify-center items-center gap-5"
              >
                Book Now
              </button>

              {path !== "/category/InteriorDesign" && path !== "/category/Interior Design" && (
                <button
                  onClick={() => handleAddToCart(product)}
                  className="border-2 hover:border-none border-black rounded-md text-black py-2 px-4 hover:bg-red-500 w-full hover:text-white transition duration-300 flex justify-center items-center gap-5"
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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: '100%' }}
        >
          Product added to cart!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ShowCategoryWise;

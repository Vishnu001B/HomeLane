import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Modal from "react-modal";
import CategoryDetails from "../../components/category/CategoryDetails";
import PremiumCategory from "../../components/category/PremiumCategory";
import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../../store/bagSlice";
import { Snackbar, Alert, Button } from "@mui/material";

// Set up the app element for accessibility
Modal.setAppElement("#root");

const ProductDetails = () => {
  const dispatch = useDispatch();
  const bagItem = useSelector((store) => store.bag);
  const location = useLocation();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showClassicModal, setShowClassicModal] = useState(false);
  const [showEconomicModal, setShowEconomicModal] = useState(false);

  const { product } = location.state || {};

  // Hardcoded images
  const productImages = [
    "https://homelineteam.com/images/products/full-home-interior/image-1.jpg",
    "https://homelineteam.com/images/products/full-home-interior/image-2.jpg",
    "https://homelineteam.com/images/products/full-home-interior/image-3.jpg",
    "https://homelineteam.com/images/products/full-home-interior/image-4.jpg",
    "https://homelineteam.com/images/products/full-home-interior/image-5.jpg",
  ];

  useEffect(() => {
    // Parse width and height as floats
    const widthNum = parseFloat(width);
    const heightNum = parseFloat(height);

    if (
      !isNaN(widthNum) &&
      !isNaN(heightNum) &&
      widthNum > 0 &&
      heightNum > 0
    ) {
      const area = widthNum * heightNum;
      const price = area * parseFloat(product?.price);
      setCalculatedPrice(price);
    } else {
      setCalculatedPrice(null);
    }
  }, [width, height, product?.price]);

  const calculateDiscountedPrice = (price, discountPercentage) => {
    const priceNumber = parseFloat(price.replace(/,/g, ""));
    const discount = discountPercentage / 100;
    return (priceNumber - priceNumber * discount).toFixed(2);
  };

  const originalPrice = product.price;
  const discountedPrice = calculateDiscountedPrice(
    originalPrice,
    parseFloat(product?.discontpersentage) || 0
  );

  const addIntobag = () => {
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

  const openImageModal = (img) => {
    setCurrentImage(img);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
  };

  const openCategoryModal = (category) => {
    if (category === "Premium") setShowPremiumModal(true);
    if (category === "Classic") setShowClassicModal(true);
    if (category === "Economic") setShowEconomicModal(true);
  };

  const closeCategoryModal = (category) => {
    if (category === "Premium") setShowPremiumModal(false);
    if (category === "Classic") setShowClassicModal(false);
    if (category === "Economic") setShowEconomicModal(false);
  };

  return (
    <div>
      <div className="flex flex-wrap md:flex-nowrap justify-evenly items-center gap-5 lg:px-[10%] my-4 px-5">
        <div className="w-full md:w-1/2">
          <Carousel
            showThumbs={false}
            showStatus={false}
            selectedItem={productImages.indexOf(currentImage)}
            onChange={(index) => setCurrentImage(productImages[index])}
            className="my-4"
          >
            {productImages.map((img, index) => (
              <div
                key={index}
                className="zoom-container"
                onClick={() => openImageModal(img)}
              >
                <img
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className="zoom-image"
                />
              </div>
            ))}
          </Carousel>
          <div className="flex justify-center mt-4">
            {productImages.map((img, index) => (
              <div key={index} className="zoom-container">
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-20 h-20 cursor-pointer border-2 border-transparent zoom-image"
                  onClick={() => setCurrentImage(img)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-between h-full">
          <div className="flex flex-col justify-center h-full">
            <h1 className="text-2xl font-thin my-4">{product.name}</h1>
            <p className="text-[#8E95B2] my-4">SKU WL128-10001</p>
            <p className="my-4 text-[#D4B080] text-2xl">
              {parseFloat(product?.discontpersentage) > 0 ? (
                <>
                  <span className="text-red-400 text-lg">
                    ₹ {discountedPrice}
                  </span>
                  <span className="text-gray-500 line-through px-2">
                    ₹ {originalPrice}
                  </span>
                  <span className="text-green-500 text-sm">
                    ({parseFloat(product?.discontpersentage)}% OFF)
                  </span>
                </>
              ) : (
                <span className="text-red-400 text-lg">₹ {originalPrice}</span>
              )}
              <span className="text-black px-4">
                (Price Inclusive Of All Taxes)
              </span>
            </p>
          </div>
          <div className="my-4 flex flex-col justify-center">
            <p>CHECK DELIVERY To Your Pincode:</p>
            <div className="flex justify-start items-center gap-5">
              <input
                type="number"
                placeholder="Enter Pincode"
                className="px-10 w-52 py-2 rounded-sm border border-black"
              />
              <button className="bg-[#6e6d6c] w-20 h-10 text-white shadow-sm">
                CHECK
              </button>
            </div>
          </div>
          <div className="my-4">
            <p>Enter Dimensions:</p>
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Width (ft)"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="px-4 w-24 py-2 rounded-sm border border-black"
              />
              <input
                type="number"
                placeholder="Height (ft)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="px-4 w-24 py-2 rounded-sm border border-black"
              />
            </div>
            {calculatedPrice !== null && (
              <p className="mt-4 text-[#D4B080] text-xl">
                Total Price: ₹ {calculatedPrice.toFixed(2)}
              </p>
            )}
          </div>
          <div className="my-4 flex gap-4">
            <button className="w-full py-4 bg-[#34b7f1] rounded-sm text-white flex justify-center items-center gap-5">
              Call Now
            </button>
            <button className="w-full py-4 bg-[#25d366] rounded-sm text-white flex justify-center items-center gap-5">
              WhatsApp
            </button>
          </div>
          <div className="my-4">
            <div className="bg-[#E9ECEF] p-4 rounded-md flex justify-around items-center">
              <Button onClick={() => openCategoryModal("Premium")}>
                Premium
              </Button>
              <Button onClick={() => openCategoryModal("Classic")}>
                Classic
              </Button>
              <Button onClick={() => openCategoryModal("Economic")}>
                Economic
              </Button>
            </div>
          </div>
          <button
            className="w-full py-4 bg-[#E58377] rounded-sm text-white flex justify-center items-center gap-5"
            onClick={addIntobag}
          >
            <FaShoppingCart className="text-2xl" />
            <p>Add To CART</p>
          </button>
        </div>
      </div>

      {/* Image Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeImageModal}
        className="modal"
        overlayClassName="overlay"
      >
        <img
          src={currentImage}
          alt="Product"
          className="w-full h-full object-contain"
        />
      </Modal>

      {/* Premium Modal */}
      <Modal
        isOpen={showPremiumModal}
        onRequestClose={() => closeCategoryModal("Premium")}
        className="modal"
        overlayClassName="overlay"
      >
        <PremiumCategory
          category={product}
          onClose={() => closeCategoryModal("Premium")}
        />
      </Modal>

      {/* Classic Modal */}
      <Modal
        isOpen={showClassicModal}
        onRequestClose={() => closeCategoryModal("Classic")}
        className="modal"
        overlayClassName="overlay"
      >
        <PremiumCategory
          category={product}
          onClose={() => closeCategoryModal("Classic")}
        />
      </Modal>

      {/* Economic Modal */}
      <Modal
        isOpen={showEconomicModal}
        onRequestClose={() => closeCategoryModal("Economic")}
        className="modal"
        overlayClassName="overlay"
      >
        <PremiumCategory
          category={product}
          onClose={() => closeCategoryModal("Economic")}
        />
      </Modal>

      <div>
        <h1 className="text-center font-serif text-2xl my-20">
          Similar Products
        </h1>
        <CategoryDetails category={product.category} />
      </div>

      {/* Snackbar for confirmation */}
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

export default ProductDetails;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Modal from 'react-modal';
import CategoryDetails from '../../components/category/CategoryDetails';
import { useDispatch, useSelector } from 'react-redux';
import { bagActions } from '../../store/bagSlice';
import { Snackbar, Alert } from "@mui/material";

// Set up the app element for accessibility
Modal.setAppElement('#root');

const ProductDetails = () => {
    const dispatch = useDispatch();
    const bagItem = useSelector((store) => store.bag);
    const location = useLocation();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { product } = location.state || {};
    console.log(product); // Destructure the product from state

    // Hardcoded images
    const productImages = [
        'https://homelineteam.com/images/products/full-home-interior/image-1.jpg',
        'https://homelineteam.com/images/products/full-home-interior/image-2.jpg',
        'https://homelineteam.com/images/products/full-home-interior/image-3.jpg',
        'https://homelineteam.com/images/products/full-home-interior/image-4.jpg',
        'https://homelineteam.com/images/products/full-home-interior/image-5.jpg'
    ];

    const [currentImage, setCurrentImage] = useState(product?.img || productImages[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State for width, height, and calculated price
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [calculatedPrice, setCalculatedPrice] = useState(null);

    // Default price per square foot
    const pricePerSquareFoot = parseFloat(product?.price) || 0; // Default to 0 if price is invalid
    const discountPercentage = parseFloat(product?.discontpersentage) || 0; // Default to 0 if discount is invalid

    useEffect(() => {
        // Parse width and height as floats
        const widthNum = parseFloat(width);
        const heightNum = parseFloat(height);

        // Debugging: Log the parsed values and price per square foot
        console.log("Width:", widthNum, "Height:", heightNum, "Price Per Square Foot:", pricePerSquareFoot);

        // Calculate price only if width and height are valid numbers and greater than 0
        if (!isNaN(widthNum) && !isNaN(heightNum) && widthNum > 0 && heightNum > 0) {
            const area = widthNum * heightNum;
            const price = area * pricePerSquareFoot;
            setCalculatedPrice(price);
        } else {
            setCalculatedPrice(null);
        }
    }, [width, height, pricePerSquareFoot]);

    if (!product) {
        return <div>No product data available</div>;
    }

    const openModal = (img) => {
        setCurrentImage(img);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCarouselChange = (index) => {
        setCurrentImage(productImages[index]);
    };

    // Calculate the discounted price
    const calculateDiscountedPrice = (price, discountPercentage) => {
        const priceNumber = parseFloat(price.replace(/,/g, '')); // Remove commas for numeric operations
        const discount = discountPercentage / 100;
        return (priceNumber - (priceNumber * discount)).toFixed(2);
    };

    const originalPrice = product.price;
    const discountedPrice = calculateDiscountedPrice(originalPrice, discountPercentage);

    const addIntobag = () => {
        const payload = {
            data: {
                ...product, // Spread product details
                quantity: 1 // Set initial quantity to 1
            },
            totalQuantity: 1 // Adding one product initially
        };
    
        dispatch(bagActions.addToBag(payload));
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
      };
    

    return (
        <div>

            <div className='flex flex-wrap md:flex-nowrap justify-evenly items-center gap-5 lg:px-[10%] my-4 px-5'>
                <div className='w-full md:w-1/2'>
                    <Carousel
                        showThumbs={false}
                        showStatus={false}
                        selectedItem={productImages.indexOf(currentImage)}
                        onChange={handleCarouselChange}
                        className='my-4'
                    >
                        {productImages.map((img, index) => (
                            <div key={index} onClick={() => openModal(img)}>
                                <img src={img} alt={`${product.name} ${index + 1}`} className='cursor-pointer' />
                            </div>
                        ))}
                    </Carousel>
                    <div className='flex justify-center mt-4'>
                        {productImages.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className='w-20 h-20 cursor-pointer border-2 border-transparent'
                                onClick={() => setCurrentImage(img)} // Click on thumbnails only updates the current image
                            />
                        ))}
                    </div>
                </div>
                <div className='w-full md:w-1/2 flex flex-col justify-between h-full'>
                    <div className='flex flex-col justify-center h-full'>
                        <h1 className='text-2xl font-thin my-4'>{product.name}</h1>
                        <p className='text-[#8E95B2] my-4'>SKU WL128-10001</p>
                        <p className='my-4 text-[#D4B080] text-2xl'>
                            {discountPercentage > 0 ? (
                                <>
                                    <span className='text-red-400 text-lg'>₹ {discountedPrice}</span>
                                    <span className='text-gray-500 line-through px-2'>₹ {originalPrice}</span>
                                    <span className='text-green-500 text-sm'>({discountPercentage}% OFF)</span>
                                </>
                            ) : (
                                <span className='text-red-400 text-lg'>₹ {originalPrice}</span>
                            )}
                            <span className='text-black px-4'>(Price Inclusive Of All Taxes)</span>
                        </p>
                    </div>
                    <div className='my-4 flex flex-col justify-center'>
                        <p>CHECK DELIVERY To Your Pincode:</p>
                        <div className='flex justify-start items-center gap-5'>
                            <input
                                type="number"
                                placeholder='Enter Pincode'
                                className='px-10 w-52 py-2 rounded-sm border border-black'
                            />
                            <button className='bg-[#6e6d6c] w-20 h-10 text-white shadow-sm'>CHECK</button>
                        </div>
                    </div>
                    <div className='my-4'>
                        <p>Enter Dimensions:</p>
                        <div className='flex gap-4'>
                            <input
                                type="number"
                                placeholder='Width (ft)'
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                                className='px-4 w-24 py-2 rounded-sm border border-black'
                            />
                            <input
                                type="number"
                                placeholder='Height (ft)'
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                className='px-4 w-24 py-2 rounded-sm border border-black'
                            />
                        </div>
                        {calculatedPrice !== null && (
                            <p className='mt-4 text-[#D4B080] text-xl'>
                                Total Price: ₹ {calculatedPrice.toFixed(2)}
                            </p>
                        )}
                    </div>
                    <button className='w-full py-4 bg-[#E58377] rounded-sm text-white flex justify-center items-center gap-5' onClick={addIntobag}>
                        <FaShoppingCart className='text-2xl' /><p>Add To CART</p>
                    </button>
                </div>

                {/* Modal for Image Zoom */}
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Zoomed Image"
                    className='flex flex-col justify-center items-center max-w-screen-md mx-auto bg-white p-4 rounded'
                    overlayClassName='fixed inset-0 z-40 bg-black bg-opacity-75 flex justify-center items-center'
                >
                    <div className='relative'>
                        <img src={currentImage} alt="Zoomed" className='max-w-screen-md-full max-h-screen object-contain' />
                        <button onClick={closeModal} className='absolute top-4 right-4 text-white text-2xl'>&times;</button>
                    </div>
                </Modal>
            </div>
            <div>
                <h1 className='text-center font-serif text-2xl my-20'>Similar Products</h1>
                <CategoryDetails category={product.category} />
            </div>
            <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Item added to bag successfully!
        </Alert>
      </Snackbar>
        </div>
    );
};

export default ProductDetails;

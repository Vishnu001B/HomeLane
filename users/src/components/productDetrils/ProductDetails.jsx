import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar, Alert, Button } from '@mui/material';
import { bagActions } from '../../store/bagSlice';
import PremiumCategory from '../../components/category/PremiumCategory';
// import ProductDescription from './ProductDescription';

// Set up the app element for accessibility
Modal.setAppElement('#root');

const ProductDetails = () => {
    const dispatch = useDispatch();
    const bagItem = useSelector((store) => store.bag);
    const location = useLocation();
    const navigate = useNavigate();

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [calculatedPrice, setCalculatedPrice] = useState(null);
    const [showPremiumModal, setShowPremiumModal] = useState(false);
    const [showClassicModal, setShowClassicModal] = useState(false);
    const [showEconomicModal, setShowEconomicModal] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const { product } = location.state || {};
    const { pathname } = useLocation();
     
    const URI = import.meta.env.VITE_API_URL;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        const widthNum = parseFloat(width);
        const heightNum = parseFloat(height);

        if (!isNaN(widthNum) && !isNaN(heightNum) && widthNum > 0 && heightNum > 0) {
            const area = widthNum * heightNum;
            const price = area * parseFloat(product?.price);
            setCalculatedPrice(price);
        } else {
            setCalculatedPrice(null);
        }
    }, [width, height, product?.price]);

    const calculateDiscountedPrice = (price, discountPercentage) => {
        let priceNumber;
    
        // Check if price is a string or a number
        if (typeof price === 'string') {
            priceNumber = parseFloat(price.replace(/,/g, '')); // Remove commas and parse to number
        } else {
            priceNumber = parseFloat(price); // Directly parse to number
        }
    
        const discount = discountPercentage / 100;
        return (priceNumber - priceNumber * discount).toFixed(2);
    };
    
    const originalPrice = product?.price || '0'; // Default to '0' if price is undefined
    const discountedPrice = calculateDiscountedPrice(
        originalPrice,
        parseFloat(product?.discontpersentage) || 0
    );
    

    const addIntobag = () => {
        dispatch(
            bagActions.addToBag({
                data: { ...product, quantity },
                totalQuantity: quantity,
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
        if (category === 'Premium') setShowPremiumModal(true);
        if (category === 'Classic') setShowClassicModal(true);
        if (category === 'Economic') setShowEconomicModal(true);
    };

    const closeCategoryModal = (category) => {
        if (category === 'Premium') setShowPremiumModal(false);
        if (category === 'Classic') setShowClassicModal(false);
        if (category === 'Economic') setShowEconomicModal(false);
    };

    const handleBookNow = () => {
        navigate('/CheckoutForm', {
            state: { product },
        });
    };

    const handleQuantityChange = (event) => {
        const value = Math.max(1, parseInt(event.target.value, 10));
        setQuantity(value);
    };

    return (
        <div>
            {/* Main Product Display Section */}
            <div className='flex flex-wrap md:flex-nowrap justify-evenly items-center pt-32 gap-5 lg:px-[10%]  px-5'>
                <div className='w-full md:w-1/2'>
                    <Carousel
                        showThumbs={false}
                        showStatus={false}
                        selectedItem={product?.img?.indexOf(currentImage)}
                        onChange={(index) => setCurrentImage(product?.img[index])}
                        className='my-4'
                    >
                        <div className='zoom-container' onClick={() => openImageModal(product.img)}>
                            <img src={`${URI}uploads/${product?.images[0]}`} alt={`${product.name}`} className='zoom-image' />
                        </div>
                    </Carousel>
                    {/* Image Thumbnails */}
                    <div className='flex justify-center mt-4'>
                        <div className='zoom-container'>
                            <img
                                src={`${URI}uploads/${product?.images[0]}`}
                                alt='Thumbnail'
                                className='w-20 h-20 cursor-pointer border-2 border-transparent zoom-image'
                                onClick={() => setCurrentImage(product.img)}
                            />
                        </div>
                    </div>
                </div>

                {/* Product Details Section */}
                <div className='w-full md:w-1/2 flex flex-col justify-between h-full'>
                    <div className='flex flex-col justify-center h-full'>
                        <h1 className='text-2xl font-thin my-4'>{product.name}</h1>
                        <p className='text-[#8E95B2] my-4'>SKU WL128-10001</p>
                        <p className='my-4 text-[#D4B080] text-2xl'>
                            {parseFloat(product?.discontpersentage) > 0 ? (
                                <>
                                    <span className='text-red-400 text-lg'>₹ {discountedPrice}</span>
                                    <span className='text-gray-500 line-through px-2'>₹ {originalPrice}</span>
                                    <span className='text-green-500 text-sm'>({parseFloat(product?.discontpersentage)}% OFF)</span>
                                </>
                            ) : (
                                <span className='text-red-400 text-lg'>₹ {originalPrice}</span>
                            )}
                            <span className='text-black px-4'>(Price Inclusive Of All Taxes)</span>
                        </p>
                    </div>
                    {/* Ratings and Reviews */}
                    <div className='bg-yellow-400 w-16 text-white px-2 py-1 rounded-md'>
                        4.3 ★
                    </div>
                    {product?.category !== 'InteriorDesgin' && (
                        <>
                            <span className='text-sm text-gray-600 ml-2'>
                                (10,253 ratings & 1,200 reviews)
                            </span>
                            <div className='my-6'>
                                <h2 className='text-xl font-semibold text-gray-700'>
                                    Product details
                                </h2>
                                <ul className='list-disc list-inside text-gray-600 mt-2'>
                                    <li>Collection: Hera 6</li>
                                    <li>Pattern Number: 6086-1</li>
                                    <li>Roll Size: 1.06mtr x 5.2mtr = 59sq.ft</li>
                                    <li>Mrp/Roll: Rs 4000/Roll</li>
                                    <li>MRP/Sq.ft: Rs 68</li>
                                </ul>
                            </div>
                            {/* Quantity Input */}
                            <div className='flex items-center gap-4'>
                                <label htmlFor={`quantity-${product.id}`} className='text-lg'>Quantity:</label>
                                <input
                                    id={`quantity-${product.id}`}
                                    type='number'
                                    name='quantity'
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    className='w-16 rounded p-1 text-center border-black border-[0.5px]'
                                />
                            </div>
                            {/* Dimensions Input and Calculated Price */}
                            <div className='my-4'>
                                <p>Enter Dimensions:</p>
                                <div className='flex gap-4'>
                                    <input
                                        type='number'
                                        placeholder='Width (ft)'
                                        value={width}
                                        onChange={(e) => setWidth(e.target.value)}
                                        className='px-4 w-24 py-2 rounded-sm border border-black'
                                    />
                                    <input
                                        type='number'
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
                        </>
                    )}

                    {/* Call and WhatsApp Buttons */}
                    <div className='my-4 flex gap-4'>
                        <a
                            href='tel:6352396301'
                            className='w-full py-4 bg-[#34b7f1] rounded-sm text-white flex justify-center items-center gap-5'
                        >
                            Call Now
                        </a>
                        <a
                            href={`https://api.whatsapp.com/send?phone=6352396301&text=Hi%2C%20I%20am%20interested%20in%20your%20product%3A%20${product.name}`}
                            className='w-full py-4 bg-[#25D366] rounded-sm text-white flex justify-center items-center gap-5'
                        >
                            WhatsApp Now
                        </a>
                    </div>

                    {/* Conditional Button Rendering */}
                    {product?.category !== 'InteriorDesgin' ? (
                        <Button
                            className='bg-[#6772E5] w-full py-4 rounded-sm text-white flex justify-center items-center gap-5'
                            onClick={addIntobag}
                        >
                            <FaShoppingCart />
                            ADD TO BAG
                        </Button>
                    ) : (
                        <Button
                            className='bg-[#FF2A6D] w-full py-4 rounded-sm text-white flex justify-center items-center gap-5'
                            onClick={handleBookNow}
                        >
                            BOOK NOW
                        </Button>
                    )}
                </div>
            </div>

            {/* Snackbar for Notifications */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity='success' sx={{ width: '100%' }}>
                    Product added to bag successfully!
                </Alert>
            </Snackbar>

            {/* Image Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeImageModal}
                contentLabel='Image Modal'
                className='modal'
                overlayClassName='modal-overlay'
            >
                <img src={currentImage} alt='Enlarged product' className='w-full h-full' />
            </Modal>

            {/* Category Modals */}
            <Modal
                isOpen={showPremiumModal}
                onRequestClose={() => closeCategoryModal('Premium')}
                contentLabel='Premium Category Modal'
                className='modal'
                overlayClassName='modal-overlay'
            >
                <PremiumCategory />
            </Modal>
            {/* Repeat similar modals for Classic and Economic categories as needed */}
        </div>
    );
};

export default ProductDetails;

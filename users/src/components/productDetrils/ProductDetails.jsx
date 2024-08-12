import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ProductDetails = () => {
    const location = useLocation();
    const { product } = location.state || {}; // Destructure the product from state

    // Hardcoded images
    const productImages = [
        'https://homelineteam.com/images/products/full-home-interior/image-1.jpg',
        'https://homelineteam.com/images/products/full-home-interior/image-2.jpg',
        'https://homelineteam.com/images/products/full-home-interior/image-3.jpg',
        'https://homelineteam.com/images/products/full-home-interior/image-4.jpg',
        'https://homelineteam.com/images/products/full-home-interior/image-5.jpg'
    ];

    const [currentImage, setCurrentImage] = useState(product?.img || productImages[0]);

    if (!product) {
        return <div>No product data available</div>;
    }

    const handleImageChange = (index) => {
        setCurrentImage(productImages[index]);
    };

    return (
        <div className='flex flex-wrap md:flex-nowrap justify-evenly items-center gap-5 lg:px-[10%] my-4'>
            <div className='w-full md:w-1/2'>
                <Carousel
                    showThumbs={false}
                    showStatus={false}
                    onChange={handleImageChange}
                    className='my-4'
                >
                    {productImages.map((img, index) => (
                        <div key={index} onClick={() => handleImageChange(index)}>
                            <img src={img} alt={`${product.name} ${index + 1}`} className='cursor-pointer' />
                        </div>
                    ))}
                </Carousel>
            </div>
            <div className='w-full md:w-1/2 flex flex-col justify-between h-full'>
                <div className='flex flex-col justify-center h-full'>
                    <h1 className='text-2xl font-thin my-4'>{product.name}</h1>
                    <p className='text-[#8E95B2] my-4'>SKU WL128-10001</p>
                    <p className='my-4 text-[#D4B080] tex-2xl'>{product.price}
                        <span className='text-black px-4'>(Price Inclusive Of All Taxes)</span>
                    </p>
                </div>
                <div className='my-4 flex flex-col justify-center'>
                    <p>CHECK DELIVERY To Your Pincode:</p>
                    <div className='flex justify-start items-center gap-5'>
                        <input type="number" placeholder='Enter Pincode' className='px-10 w-52 py-2 rounded-sm border border-black' />
                        <button className='bg-[#6e6d6c] w-20 h-10 text-white shadow-sm'>CHECK</button>
                    </div>
                </div>
                <button className='w-full py-4 bg-[#E58377] rounded-sm text-white flex justify-center items-center gap-5'>
                    <FaShoppingCart className='text-2xl' /><p>Add To CART</p>
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;

import React, { useState } from 'react';

const ProductDescription = () => {
    const [selectedColor, setSelectedColor] = useState('#ffffff');

    const colors = ['#ffffff', '#f8f9fa', '#f1f3f5', '#e9ecef'];

    return (
        <>
            <h1 className='text-2xl font-semibold text-gray-100 bg-black w-60 px-2 py-2 my-4 flex justify-center content-center items-center rounded-md shadow-md'>
                Product Details
            </h1>
            <div className={`p-6 border-2 border-black rounded-md shadow-md lg:px-20 px-5`} style={{ backgroundColor: selectedColor }}>
                {/* Product Title */}


                {/* Color Selector */}
                <div className='my-4'>
                    <h2 className='text-lg font-medium text-gray-700'>Select Background Color:</h2>
                    <div className='flex gap-4 mt-2'>
                        {colors.map((color, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedColor(color)}
                                className={`w-8 h-8 rounded-full cursor-pointer border ${selectedColor === color ? 'border-black' : 'border-gray-300'}`}
                                style={{ backgroundColor: color }}
                            ></div>
                        ))}
                    </div>
                </div>



                {/* Product Ratings */}
                <div className='flex items-center my-4'>
                    <div className='bg-yellow-400 text-white px-2 py-1 rounded-md'>
                        4.3 ★
                    </div>
                    <span className='text-sm text-gray-600 ml-2'>
                        (10,253 ratings & 1,200 reviews)
                    </span>
                </div>

                {/* Product Specifications */}
                <div className='my-6'>
                    <h2 className='text-xl font-semibold text-gray-700'>
                        Specifications
                    </h2>
                    <ul className='list-disc list-inside text-gray-600 mt-2'>
                        <li>Brand: DummyBrand</li>
                        <li>Model: XYZ123</li>
                        <li>Color: Black</li>
                        <li>Battery Life: Up to 12 hours</li>
                        <li>Warranty: 1 Year</li>
                    </ul>
                </div>

                {/* Product Description */}
                <div className='my-6'>
                    <h2 className='text-xl font-semibold text-gray-700'>
                        Product Description
                    </h2>
                    <p className='text-gray-600 mt-2'>
                        This is a dummy product description. This section provides detailed information about the product, its features, benefits, and usage instructions. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.
                    </p>
                </div>

                {/* Offers Section */}
                <div className='my-6'>
                    <h2 className='text-xl font-semibold text-gray-700'>
                        Available Offers
                    </h2>
                    <ul className='list-disc list-inside text-gray-600 mt-2'>
                        <li>10% off on Axis Bank Credit Cards</li>
                        <li>No Cost EMI on select cards</li>
                        <li>Buy 2 Get 1 Free on select items</li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default ProductDescription;

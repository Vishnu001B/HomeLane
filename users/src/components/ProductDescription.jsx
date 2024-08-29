import React from 'react'
import home from '../assets/image/lighting.webp'

const ProductDescription = () => {
    return (
        <div className='lg:flex md:flex flex-row-reverse justify-center items-center gap-10 py-5 px-[5%] bg-light-green-50'>
            <div className='lg:w-1/2 md:w-1/2'>
                <img src={home} alt="Decorative Lighting" className='rounded-sm object-cover w-full h-auto' />
            </div>

            <div className='lg:w-1/2 md:w-1/2 my-4'>
                <h1 className='text-center my-4 text-xl font-semibold'>Decorative Lighting</h1>
                <div className='flex justify-center items-center my-4'>
                    <p className='lg:w-9/12 text-center text-gray-700'>
                        Experience the harmony of high-end designs that tie your home together and materials that complement your style. Embrace the thrill of a creative process that’s experimental in a lighting range that’s the star of your story.
                    </p>
                </div>
                <div className='flex justify-center items-center my-4'>
                    <button className='border-2  border-black text-black px-8 py-2  rounded-sm shadow-md hover:bg-[black] hover:text-white'>
                        Discover
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDescription

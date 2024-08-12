import React from 'react'
import home from '../assets/image/lighting.webp'

const ProductDescription = () => {
    return (
        <div className='lg:flex md:flex flex-row-reverse block justify-center items-center content-center font-serif  gap-10 my-4 px-[10%]'>
            <div className='lg:w-1/2 md:w-1/2 full'>
                <img src={home} alt="" className='rounded-sm object-cover' />
            </div>

            <div className='lg:w-1/2 md:w-1/2 full my-4 '>
                <h1 className='text-center my-4 text-xl'>Decorative Lighting</h1>
                <div className='flex justify-center items-center content-center my-4'>
                    <p className='lg:w-9/12 text-ceter text-balance'>Experience the harmony of high-end designs that tie your home together and materials that complement your style. Embrace the thrill of a creative process that’s experimental in a lighting range that’s the star of your story.</p>
                </div>
                <div className='flex justify-center items-center content-center my-4'>
                    <button className='bg-black px-20 py-2  text-white rounded-sm shadow-md hover:bg-[#C7A783]'>Discover</button>
                </div>
            </div>

        </div>
    )
}

export default ProductDescription

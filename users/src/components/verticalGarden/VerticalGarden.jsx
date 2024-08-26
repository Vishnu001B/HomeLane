import React, { useEffect, useState } from 'react';
import vg from '../../assets/image/vg2.jpg';
import CollectionOfImage from './CollectionOfImage';
import VerticalDescription from './VerticalDescription';
import { useParams } from 'react-router-dom';
import {products} from '../../data'


const VerticalGarden = () => {
    const { name } = useParams();
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        // Assuming 'category' might be a variable in your component or you can get it from URL params
        const selectname = name;

        // Filter products based on the category or name from URL params
        const filtered = products.filter(
            (product) => product.category.toLowerCase() === selectname.toLowerCase()
        );

        setFilteredProducts(filtered);
    }, [name]);
    console.log(filteredProducts);
    return (
        <>
            <div className="relative w-screen h-[70vh]">
                <img src={vg} alt="vg" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-3xl font-bold text-white bg-black bg-opacity-50 px-4 py-2 rounded transition duration-300 hover:bg-white hover:bg-opacity-90 hover:text-black hover:scale-110">
                        Vertical Garden
                    </h1>
                </div>
            </div>
            <div>
                <div className='w-1/2'>
                    <div></div>
                    <div></div>
                </div>
               <div className='w-1/2'>
               <div></div>
               <div></div>
               </div>
            </div>
            <div className='mt-20'>
                <CollectionOfImage/>
            </div>
            <div className='mt-20'>
                <VerticalDescription/>
            </div>
        </>
    );
};

export default VerticalGarden;

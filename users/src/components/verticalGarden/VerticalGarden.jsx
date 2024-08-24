import React from 'react';
import vg from '../../assets/image/vg2.jpg';

const VerticalGarden = () => {
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
        </>
    );
};

export default VerticalGarden;

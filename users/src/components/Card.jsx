import React from 'react';

const Card = ({ img, title }) => {
  return (
    <div className='flex justify-center content-center'>
      <div className=" w-full  rounded-lg overflow-hidden  bg-white  card ">
      <div className="h-60 overflow-hidden">
        <img src={img} alt={title} className="w-full h-full rounded-lg object-cover" />
      </div>
      <h3 className="p-4 text-lg font-semibold text-gray-800 text-center">{title}</h3>
    </div>
    </div>
  );
}

export default Card;

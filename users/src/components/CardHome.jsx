import React from 'react';
import { Link } from 'react-router-dom';
import interior1 from '../assets/image/interior-design.jpg';
import interior2 from '../assets/image/curtains.jpg'; 
import interior3 from '../assets/image/blinds.jpg'; 
import interior4 from '../assets/image/peps-mattress.jpg'; 
import interior5 from '../assets/image/wallpapers.jpg'; 
import interior6 from '../assets/image/customised-sofa.jpg'; 
import interior7 from '../assets/image/upholstery.jpg';  
import interior8 from '../assets/image/carpets.jpg'; 

import interior10 from '../assets/image/vertical-garden.jpg'; 


const Card = ({ img, title }) => {
  return (
    <div className='flex justify-center items-center gap-10'>
      <div className="w-full md:w-72 lg:w-72 xl:w-80 rounded-lg overflow-hidden card">
        <div className="h-60 overflow-hidden">
          <img src={img} alt={title} className="w-full h-full rounded-lg object-cover" />
        </div>
        <h3 className="p-4 text-lg font-semibold text-gray-800 text-center">{title}</h3>
      </div>
    </div>
  );
}

const CardHome = () => {
  const cardData = [
    { img: interior1, title: "Interior Design" },
    { img: interior2, title: "Curtains" },
    { img: interior3, title: "Blinds" },
    { img: interior4, title: "Mattresses" },
    { img: interior5, title: "Wallpapers" },
    // { img: interior6, title: "Customised Sofa" },
    { img: interior7, title: "Furniture" },
    { img: "https://s3.amazonaws.com/adroitart/images/22367/original/WL6001_zoom.JPG?1720683176", title: "Flooring" },
    { img: interior10, title: "Vertical Garden" },
  ];

  return (
    <div className='lg:py-5 py-4 bg-gray-200 font-sans'>
      <h1 className='lg:text-4xl text-xl text-center lg:pt-20 pt:md:pt-20 pt-5 pb-12 font-bold'>Shop Decorative Lighting, Home Decor & Designer Fans</h1>
      <div className="flex flex-wrap items-center content-center justify-center lg:gap-6 xl:px-[2%] px-5">
        {cardData.map((data, index) => (
          <Link to={`/category/${data.title}`} key={index} className="flex flex-col items-center mb-6">
            <Card img={data.img} title={data.title} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CardHome;

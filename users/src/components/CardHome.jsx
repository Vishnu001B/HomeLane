import React from 'react';
import { Link } from 'react-router-dom';
import interior1 from '../assets/image/interior-design.jpg'; // Ensure correct import path
import interior2 from '../assets/image/curtains.jpg'; 
import interior3 from '../assets/image/blinds.jpg'; 
import interior4 from '../assets/image/peps-mattress.jpg'; 
import interior5 from '../assets/image/wallpapers.jpg'; 
import interior6 from '../assets/image/customised-sofa.jpg'; 
import interior7 from '../assets/image/upholstery.jpg';  
import interior8 from '../assets/image/carpets.jpg'; 
import interior9 from '../assets/image/artificial-grass.jpg'; 
import interior10 from '../assets/image/vertical-garden.jpg'; 
import interior11 from '../assets/image/false-ceiling.jpg'; 
import interior12 from '../assets/image/interior-lighting.jpg'; 


const CardHome = () => {
  const cardData = [
    { img: interior1, title: "InteriorDesgin" },
    { img: interior2, title: "Curtain" },
    { img: interior3, title: "Blinds" },
    { img: interior4, title: "Mattressess" },
    { img: interior5, title: "Wallpapers" },
    { img: interior6, title: "Customised sofa" },
    { img: interior7, title: "Furnitures" },
    { img: interior8, title: "Carpets" },
    { img: interior9, title: "Flooring" },
    { img: interior10, title: "Vertical Garden" },
    { img: interior11, title: "False Celling" },
    { img: interior12, title: "Interior Lighting" },
  ];

  return (
    <div className='lg:py-5 my-4'>
      <h1 className='lg:text-4xl text-xl text-center mb-8'>Shop Decorative Lighting, Home Decor & Designer Fans</h1>
      <div className="flex flex-wrap items-center content-center justify-center lg:gap-2 xl:px-[5%] px-5 my-2">
        {cardData.map((data, index) => (
          <Link to={`/category/${data.title}`} key={index} className="card flex flex-col items-center">
            <img src={data.img} alt={data.title} className="w-40 h-40 mb-2 rounded-full " />
            <h3 className="text-lg font-medium">{data.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CardHome;

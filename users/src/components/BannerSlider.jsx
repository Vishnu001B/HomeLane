import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import banner1 from '../assets/image/banner1.jpg'; 
import banner2 from '../assets/image/banner2.jpg'; 
import banner3 from '../assets/image/banner3.jpeg'; 
import banner4 from '../assets/image/banner4.jpeg'; 
import banner5 from '../assets/image/banner5.jpg'; 
import banner6 from '../assets/vecteezy.mov';

const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <>
    <div>
      <Slider {...settings} className='my-8 '>
        <div>
          <img src={banner1} alt="Banner 1" style={{ width: '100%', height: '70vh', objectFit: 'cover' }} />
        </div>
        <div>
          <img src={banner2} alt="Banner 2" style={{ width: '100%', height: '70vh', objectFit: 'cover' }} />
        </div>
        <div>
          <img src={banner3} alt="Banner 3" style={{ width: '100%', height: '70vh', objectFit: 'cover' }} />
        </div>
        <div>
          <img src={banner4} alt="Banner 4" style={{ width: '100%', height: '70vh', objectFit: 'cover' }} />
        </div>
        <div>
          <img src={banner5} alt="Banner 5" style={{ width: '100%', height: '70vh', objectFit: 'cover' }} />
        </div>
        
      </Slider>
     
    </div>
    <h1 className='lg:text-6xl text-xl text-center font-bold py-3 my-8'>HomeLine This is Awesome Product</h1>
     <div className='my-4 '>
     <video src={banner6} style={{ width: '100%', height: '70vh', objectFit: 'cover' }}  autoPlay loop muted />
   </div>
   </>
  );
};

export default BannerSlider;

import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { API_URL } from '../constants';

const BannerSlider = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const resp = await axios.get(`${API_URL}/api/admin/banners`);
      setBanners(resp.data);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

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
      <div className='my-8'>
        <Slider {...settings} className='my-8'>
          {banners.length > 0 ? (
            banners.map((banner) => (
              <div key={banner._id}>
                <img
                  src={`${API_URL}/${banner.path.replace(/\\/g, '/')}`} // Replace backslashes with forward slashes
                  alt={banner.filename}
                  className="w-screen h-[800px]"
                  style={{ border: 'none', outline: 'none' }} // Remove border and outline
                />

              </div>
            ))
          ) : (
            <div>No banners available</div>
          )}
        </Slider>
      </div>
    </>
  );
};

export default BannerSlider;

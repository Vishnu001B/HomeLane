import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const BannerSlider = () => {
  const [banners, setBanners] = useState([]);

  const URI = import.meta.env.VITE_URI;

  useEffect(() => {
    fetchBanners();
  }, [URI]);

  const fetchBanners = async () => {
    try {
      const resp = await axios.get(`${URI}api/admin/banners`);
      // Check if response data is an array
      if (Array.isArray(resp.data)) {
        setBanners(resp.data);
      } else {
        console.error("Unexpected response data:", resp.data);
        setBanners([]);
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
      setBanners([]);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-8">
      <Slider {...settings}>
        {banners.length > 0 ? (
          banners.map((banner) => (
            <div key={banner._id} className="relative">
              <img
                src={`${URI}/${banner.path.replace(/\\/g, "/")}`} // Replace backslashes with forward slashes
                alt={banner.filename}
                className="w-screen lg:h-[800px] h-72 object-cover opacity-80" // Adjust opacity here
                style={{ border: "none", outline: "none" }} // Remove border and outline
                loading="lazy" // Lazy loading
              />
              {/* Text container */}
              <div className="absolute z-30 lg:top-1/2 lg:left-28 left-5 md:top-1/2 top-36 transform -translate-y-1/2 bg-black bg-opacity-50 p-6 text-white rounded-md lg:w-2/5 w-10/12  shadow-md shadow-blue-gray-100">
                <h2 className="text-md lg:text-4xl font-bold llg:mb-4 mb-2 drop-shadow-lg">
                  Enhance Your Space with Modern Decor
                </h2>
                <p className="mb-4 drop-shadow-md lg:text-base md:text-base text-xs font-thin">
                  Discover a wide range of stylish furniture and accessories that make your home unique and elegant. Lorem ipsum dolor sit amet consectetur adipisicing elit. In nisi voluptates libero magni quidem fugit fugiat quo quia laborum ea quam voluptatem eveniet consectetur, necessitatibus eum enim impedit maxime modi!
                </p>
                {/* Button with border and hover effect */}
                <button className="px-4 py-2 border-2 border-white hover:border-none text-white rounded hover:bg-white hover:text-black transition duration-300 ease-in-out">
                  Shop Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No banners available</div>
        )}
      </Slider>
    </div>
  );
};

export default BannerSlider;

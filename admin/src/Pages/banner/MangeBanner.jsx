import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Import the carousel from shadcn
import { Button } from "@/components/ui/button";

const MangeBanner = () => {
  const [banners, setBanners] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0); // Track active slide
  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const resp = await axios.get(`${URL}api/admin/banners`);
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

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  console.log("Banners fetched", banners);

  return (
    <div className="w-full h-full">
      <Carousel className="relative">
        {banners.length > 0 ? (
          <CarouselContent>
            {banners.map((banner, index) => (
              <CarouselItem
                key={banner._id}
                className={`relative transition-all ease-in-out duration-500 ${
                  index === activeIndex ? "block" : "hidden"
                }`}
              >
                <img
                  src={`${URL}${banner.path.replace(/\\/g, "/")}`}
                  alt={banner.filename}
                  className="w-full lg:h-[800px] h-96 object-cover opacity-80"
                  loading="lazy"
                />
                {/* Banner Text Content */}
                <div className="absolute z-30 lg:top-1/2 lg:left-28 left-5 md:top-1/2 top-60 transform -translate-y-1/2 bg-black bg-opacity-50 p-6 text-white rounded-md lg:w-2/5 w-10/12 shadow-md">
                  <h2 className="text-md lg:text-4xl font-bold mb-4">
                    Enhance Your Space with Modern Decor
                  </h2>
                  <p className="mb-4 lg:text-base md:text-base text-xs font-thin">
                    Discover a wide range of stylish furniture and accessories
                    that make your home unique and elegant. Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. In nisi voluptates libero
                    magni quidem fugit fugiat quo quia laborum ea quam voluptatem
                    eveniet consectetur, necessitatibus eum enim impedit maxime
                    modi!
                  </p>
                  <Button
                    variant="outline"
                    className="hover:bg-white hover:text-black transition duration-300 ease-in-out"
                  >
                    Shop Now
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        ) : (
          <div>No banners available</div>
        )}

        {/* Carousel Previous Button */}
        <CarouselPrevious
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-40"
          onClick={handlePrevious}
        >
          <Button variant="outline" className="text-white">
            Prev
          </Button>
        </CarouselPrevious>

        {/* Carousel Next Button */}
        <CarouselNext
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-40"
          onClick={handleNext}
        >
          <Button variant="outline" className="text-white">
            Next
          </Button>
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default MangeBanner;

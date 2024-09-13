import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FurnitureRange from "./FurnitureRange";

// Card Component
const Card = ({ img, title }) => {
  return (
    <div className="w-full md:w-72 lg:w-72 xl:w-80 rounded-lg overflow-hidden card">
      <div className="h-60 overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
      <h3 className="p-4 text-lg font-semibold text-gray-800 text-center">
        {title}
      </h3>
    </div>
  );
};

// CardHome Component
const CardHome = () => {
  const [categoriesData, setCategoriesData] = useState([]);

  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const resp = await axios.get(`${URI}api/categories/`);
      setCategoriesData(resp.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="lg:py-5 py-4 bg-gray-200 font-sans">
      <h1 className="lg:text-4xl text-xl text-center lg:pt-20 pt-5 pb-12 font-bold">
        Shop Decorative Lighting, Home Decor & Designer Fans
      </h1>
      <div className="flex flex-wrap items-center justify-center lg:gap-6 xl:px-2 px-5">
        {categoriesData.map((data, index) => (
          <Link
            to={`/category/${data.category}`}
            key={index}
            className="flex flex-col items-center mb-6"
          >
            <Card
              img={`${URI}${data.images?.[0] || "placeholder-image.jpg"}`} // Use a placeholder image if none are provided.
              title={data.category}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CardHome;

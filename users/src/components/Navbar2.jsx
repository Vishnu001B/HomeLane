import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const servise = {
  name: "Services",
  subcategories: [
    "Curtain Stitching",
    "Curtains and Bracket Installation",
    "Wallpapers Installations",
    "Wooden Flooring Installation",
    "Carpets Installation",
    "All Furniture Works",
    "Electric Works",
  ],
};

const Navbar2 = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const rep = await axios.get(`${URI}api/admin/navheaders`);
      setCategories(rep.data);
      console.log("Categories fetched successfully:", rep.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryClick = (index) => {
    setActiveCategory(index === activeCategory ? null : index);
  };

  const handleSubcategoryClick = () => {
    setActiveCategory(null);
  };

  return (
    <div
      className="z-20 bg-[#EEE0D0] font-serif fixed top-20 shadow-md w-full"
      style={{ height: "60px" }}
    >
      <div className="flex justify-center items-center content-center">
        <div className="flex flex-wrap justify-center items-center p-1 h-full">
          <div className="flex-grow flex justify-center space-x-4">
            <a
              href="/"
              className="text-black px-2 py-1 rounded hover:text-light-green-700 transition duration-200 font-semibold"
            >
              Home
            </a>
            <a
              href="/"
              className="text-black px-2 py-1 rounded hover:text-light-green-700 transition duration-200"
            >
              Gallery
            </a>
            <a
              href="/verticalGarden/vertical Garden"
              className="text-black px-2 py-1 rounded hover:text-light-green-700 transition duration-200"
            >
              Vertical Garden
            </a>
          </div>

          {/* Services Dropdown */}
          <div className="relative p-1">
            <button
              className="flex items-center p-2 text-black rounded hover:text-light-green-700 transition duration-200"
              onClick={() => handleCategoryClick('services')}
            >
              {servise.name}
            </button>
            {activeCategory === 'services' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-gray-200 border border-gray-300 rounded shadow-lg z-30">
                <ul>
                  {servise.subcategories.map((subcategory, subIndex) => (
                    <li
                      key={subIndex}
                      className="p-2 hover:bg-gray-100 cursor-pointer transition duration-200"
                    >
                      <Link
                        to={`/subcategory/${encodeURIComponent(subcategory)}`}
                        onClick={handleSubcategoryClick}
                      >
                        {subcategory}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Fetched Categories Dropdown */}
          {categories.map((category, index) => (
            <div key={category._id} className="relative p-1">
              {category.categories && (
                <button
                  className="flex items-center p-2 text-black rounded hover:text-light-green-700 transition duration-200"
                  onClick={() => handleCategoryClick(index)}
                >
                  {category.categories}
                </button>
              )}
              {activeCategory === index && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-gray-200 border border-gray-300 rounded shadow-lg z-30">
                  <ul>
                    {category.subcategory &&
                      category.subcategory.map((subcategory, subIndex) => (
                        <li
                          key={subIndex}
                          className="p-2 hover:bg-gray-100 cursor-pointer transition duration-200"
                        >
                          <Link
                            to={`/subcategory/${encodeURIComponent(subcategory)}`}
                            onClick={handleSubcategoryClick}
                          >
                            {subcategory}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar2;

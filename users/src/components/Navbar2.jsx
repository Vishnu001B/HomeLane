import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar2 = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    {
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
    },
    {
      name: "InteriorDesgin",
      subcategories: [
        "Full Home Interior",
        "Wardrobe",
        "Kitchen",
        "Living Room",
        "False Ceiling",
        "Interior Lighting",
      ],
    },
    {
      name: "Curtains",
      subcategories: ["Readymade Curtains", "Customized Curtains"],
    },
    {
      name: "Blinds",
      subcategories: [
        "Roman Blinds",
        "Zebra Blinds",
        "Wooden Blinds",
        "PVC Blinds",
        "Roller Blinds",
      ],
    },
    {
      name: "Mattress",
      subcategories: ["Peps Mattress"],
    },

    {
      name: "Wallpapers",
      subcategories: [
        "Customized Wallpapers",
        "Imported Wallpapers",
        "Foam Panels",
        "Kitchen Wallpapers",
        "Bathroom Wallpapers",
      ],
    },
    {
      name: "Furniture",
      subcategories: [
        "Customized Sofa Set",
        "Customized Bed",
        "Customized Dining Table & Chair",
      ],
    },
    {
      name: "Flooring",
      subcategories: [
        "Wooden Flooring",
        "Vinyl Flooring",
        "Artificial Grass",
        "Wall-to-wall Carpet",
        "Carpet Tiles",
        "Handmade Carpets",
        "Gym Tiles",
      ],
    },
  ];

  const handleCategoryClick = (index) => {
    setActiveCategory(index === activeCategory ? null : index);
  };

  const handleSubcategoryClick = () => {
    setActiveCategory(null);
  };

  return (
    <div
      className="relative z-20 bg-gray-800 border border-gray-600"
      style={{ height: "60px" }}
    >
      <div className="flex justify-center items-center content-center">
        {/* Top Row: Home, Gallery, Vertical Garden */}

        {/* Bottom Row: Dropdown Categories */}
        <div className="flex flex-wrap justify-center items-center p-1 h-full">
          <div className="flex-grow flex justify-center space-x-4 bg-gray-800 p-3">
            <a
              href="/"
              className="text-white px-2 py-1 rounded hover:bg-gray-600 transition duration-200"
            >
              Home
            </a>
            <a
              href="/"
              className="text-white px-2 py-1 rounded hover:bg-gray-600 transition duration-200"
            >
              Gallery
            </a>
            <a
              href="/"
              className="text-white px-2 py-1 rounded hover:bg-gray-600 transition duration-200"
            >
              Vertical Garden
            </a>
          </div>

          {categories.map((category, index) => (
            <div key={index} className="relative p-1">
              <button
                className="flex items-center p-2 text-white rounded hover:bg-gray-600 transition duration-200"
                onClick={() => handleCategoryClick(index)}
              >
                {category.name}
                <FaChevronDown className="ml-2" />
              </button>
              {activeCategory === index && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-30">
                  <ul>
                    {category.subcategories.map((subcategory, subIndex) => (
                      <li
                        key={subIndex}
                        className="p-2 hover:bg-gray-100 cursor-pointer transition duration-200"
                      >
                        <Link
                          to={`/category/${encodeURIComponent(subcategory)}`}
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

import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa"; // Importing a chevron icon

const Navbar2 = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

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
      name: "Interior Design",
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
      subcategories: ["Roman Blinds", "Zebra Blinds", "Wooden Blinds", "PVC Blinds", "Roller Blinds"],
    },
    {
      name: "Mattress",
      subcategories: ["Peps Mattress"],
    },
    {
      name: "Store Locator",
      subcategories: ["Dining Tables", "Dining Chairs", "Buffets"],
    },
    {
      name: "Wallpapers",
      subcategories: ["Customized Wallpapers", "Imported Wallpapers", "Foam Panels", "Kitchen Wallpapers", "Bathroom Wallpapers"],
    },
    {
      name: "Furniture",
      subcategories: ["Customized Sofa Set", "Customized Bed", "Customized Dining Table & Chair"],
    },
    {
      name: "Flooring",
      subcategories: ["Wooden Flooring", "Vinyl Flooring", "Artificial Grass", "Wall-to-wall Carpet", "Carpet Tiles", "Handmade Carpets", "Gym Tiles"],
    },
  ];

  return (
    <div className="relative z-20 bg-gray-800">
      <div className='flex flex-col'>
        {/* Top Row: Home, Gallery, Vertical Garden */}
        <div className='flex justify-center space-x-4 bg-gray-700 p-2'>
          <a href="#" className="text-white px-3 py-2 rounded hover:bg-gray-600 transition duration-200">Home</a>
          <a href="#" className="text-white px-3 py-2 rounded hover:bg-gray-600 transition duration-200">Gallery</a>
          <a href="#" className="text-white px-3 py-2 rounded hover:bg-gray-600 transition duration-200">Vertical Garden</a>
        </div>

        {/* Bottom Row: Dropdown Categories */}
        <div className='flex flex-wrap justify-center items-center p-4 bg-gray-800'>
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative p-2"
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <button className="flex items-center p-3 bg-gray-700 text-white rounded hover:bg-gray-600 transition duration-200">
                {category.name}
                <FaChevronDown className="ml-2" />
              </button>
              {hoveredCategory === index && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-30">
                  <ul>
                    {category.subcategories.map((subcategory, subIndex) => (
                      <li key={subIndex} className="p-3 hover:bg-gray-100 cursor-pointer transition duration-200">
                        {subcategory}
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

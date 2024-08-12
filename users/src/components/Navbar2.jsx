import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa"; // Importing a chevron icon

const Navbar2 = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = [
    {
      name: "Living Room Furniture",
      subcategories: [
        "Interior Design",
        "Blinds",
        "Customized Curtains",
        "Artificial Grass",
        "Vinyl Flooring & Vinyl Plank",
        "Wallpapers",
        "WoodenFlooring",
       
       
      ],
    },
    {
      name: "Architectural Lighting",
      subcategories: ["Beds", "Wardrobes", "Nightstands"],
    },
    {
      name: "Ceiling Fans ",
      subcategories: ["Desks", "Office Chairs", "Bookcases"],
    },
    {
      name: "Home Decor",
      subcategories: ["Patio Sets", "Outdoor Chairs", "Garden Tables"],
    },
    {
      name: "Store Locator",
      subcategories: ["Dining Tables", "Dining Chairs", "Buffets"],
    },
    {
      name: "More",
      subcategories: ["Dining Tables", "Dining Chairs", "Buffets"],
    },
    {
      name: "Sale",
      subcategories: ["Dining Tables", "Dining Chairs", "Buffets"],
    },
  ];

  return (

    <div className='flex flex-wrap justify-between items-center p-4 lg:px-[10%]'>

      {categories.map((category, index) => (
        <div
          key={index}
          className="relative p-2"
          onMouseEnter={() => setHoveredCategory(index)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          <button className="flex items-center p-2  rounded">
            {category.name}
            <FaChevronDown className="ml-2" />
          </button>
          {hoveredCategory === index && (
            <div className="absolute top-full left-0 mt-2 w-48 z-10 bg-white border border-gray-300 rounded shadow-lg">
              <ul>
                {category.subcategories.map((subcategory, subIndex) => (
                  <li key={subIndex} className="p-2 hover:bg-gray-100">
                    {subcategory}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Navbar2;

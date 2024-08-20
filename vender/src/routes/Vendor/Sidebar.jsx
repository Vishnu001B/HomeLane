import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { FaTachometerAlt, FaBoxOpen, FaProductHunt, FaPlus, FaTruck, FaImage, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/orders", label: "All Orders", icon: <FaBoxOpen /> },
    { to: "/products", label: "All Products", icon: <FaProductHunt /> },
    { to: "/createProduct", label: "Create Product", icon: <FaPlus /> },
    { to: "/postBanner", label: "Post Banner", icon: <FaImage /> }, // Updated line
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white flex flex-col py-20">
      <nav className="flex flex-col p-4">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) => 
              `p-2 my-2 rounded flex items-center space-x-4 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
          >
            <span className="text-2xl">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
        <Button
          className="p-2 my-2 rounded flex items-center space-x-4 hover:bg-gray-700 shadow-none text-start"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-2xl" />
          <span>LOGOUT</span>
        </Button>
      </nav>
    </div>
  );
};

export default Sidebar;

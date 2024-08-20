import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaTachometerAlt, FaBoxOpen, FaProductHunt, FaPlus, FaImage, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import loginIMg from "../../../public/images/logo-footer.png";
import { userActions } from "../../store/userInfoSlice";
 // Adjust this import based on your actual path

const Navbar2 = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token"); // Check if the token exists in localStorage

  const logout = () => {
    localStorage.clear();
    dispatch(userActions.clearUser()); // Clear user data in the Redux store
    // Optionally reload or redirect after logout
    // window.location.reload();
  };

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/orders", label: "All Orders", icon: <FaBoxOpen /> },
    { to: "/products", label: "All Products", icon: <FaProductHunt /> },
    { to: "/createProduct", label: "Create Product", icon: <FaPlus /> },
    { to: "/postBanner", label: "Post Banner", icon: <FaImage /> },
  ];

  return (
    <div className="w-64 min-h-screen text-black flex flex-col pb-20">
      <div className="flex justify-center content-center items-center">
        <img src={loginIMg} alt="Logo" className="h-40" />
      </div>
      <nav className="flex flex-col p-4">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className="p-2 my-2 rounded flex items-center space-x-2 hover:bg-gray-700"
            activeClassName="bg-gray-700"
          >
            <span className="text-2xl">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
        {token ? (
          <button
            onClick={logout}
            className="p-2 my-2 rounded flex items-center space-x-2 hover:bg-gray-700 text-red-600"
          >
            <FaSignOutAlt className="text-2xl" />
            <span>Logout</span>
          </button>
        ) : (
          <NavLink
            to="/login"
            className="p-2 my-2 rounded flex items-center space-x-2 hover:bg-gray-700 text-green-600"
            activeClassName="bg-gray-700"
          >
            <FaSignInAlt className="text-2xl" />
            <span>Login</span>
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default Navbar2;

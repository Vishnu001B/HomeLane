import React, { useState, useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import footer from "../assets/image/logo-footer.png";
import { Link, useNavigate } from "react-router-dom";
import Login from "../routes/Login";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by checking for the token in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists, otherwise false
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const handleLogout = () => {
    // Clear the user data from localStorage and update the login status
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    setIsLoggedIn(false);
    navigate("/"); // Optionally redirect the user to the homepage after logout
  };

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <>
      <nav className="bg-gray-100 p-4 lg:p-8 shadow-md w-full flex items-center justify-between gap-5 lg:px-32">
        <Link to="/" className="lg:text-2xl md:text-xl text-sm font-bold w-1/5">
          <img src={footer} alt="Logo" className="w-16 h-16 mr-2" />
        </Link>

        <div className="relative lg:w-1/2 w-full flex items-center">
          <SearchIcon className="absolute left-3 text-gray-500" />
          <input
            type="search"
            placeholder="Search the product"
            className="border border-gray-300 rounded-md p-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-4 w-1/4 justify-end hidden sm:flex">
          <div
            className="relative flex items-center space-x-2 cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {isLoggedIn ? (
              <LogoutIcon className="text-5xl" onClick={handleLogout} />
            ) : (
              <AccountCircleIcon
                className="text-5xl"
                onClick={toggleLoginModal}
              />
            )}
            <span className="text-2xl">
              {isLoggedIn ? "Account" : "Login"}
            </span>
            {isDropdownOpen && (
              <div className="absolute z-30 top-full mt-2 w-48 bg-white shadow-lg rounded-md p-2">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Account
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={toggleLoginModal}
                    >
                      Sign In
                    </button>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 cursor-pointer">
            <ShoppingCartIcon className="text-5xl" />
            <span className="text-2xl">Cart</span>
          </div>
        </div>

        <div className="flex sm:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? (
              <CloseIcon className="text-3xl" />
            ) : (
              <MenuIcon className="text-3xl" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute right-0 shadow-md w-full sm:hidden z-30">
            <div className="flex flex-col items-center space-y-4 p-4">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={toggleLoginModal}
              >
                <AccountCircleIcon className="text-4xl" />
                <span className="text-xl">Login</span>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer">
                <ShoppingCartIcon className="text-4xl" />
                <span className="text-xl">Cart</span>
              </div>
            </div>
          </div>
        )}
      </nav>

      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-65 flex items-center justify-center z-50">
          <div className="relative bg-white p-0 h-[80vh] sm:h-[500px] rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-0">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={toggleLoginModal}
            >
              <CloseIcon className="text-3xl" />
            </button>
            <div className="overflow-auto">
              <Login setIsLoginModalOpen={setIsLoginModalOpen} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

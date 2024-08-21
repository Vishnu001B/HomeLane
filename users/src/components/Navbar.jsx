// src/components/Navbar.js
import React, { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import footer from '../assets/image/logo-footer.png';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../routes/Login';
import MiniDrawer from './MiniDrawer'; // Import the MiniDrawer component

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for the mini drawer
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    navigate('/');
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
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
            className="border-gray-600 border-2 rounded-md p-2 pl-10 w-full"
          />
        </div>

        <div className="flex items-center space-x-4 w-1/4 justify-end hidden sm:flex">
          <div className="relative flex items-center space-x-2 cursor-pointer">
            {localStorage.getItem('token') ? (
              <>
                <LogoutIcon className="text-5xl" onClick={handleLogout} />
                <span className="text-2xl">Account</span>
              </>
            ) : (
              <>
                <AccountCircleIcon
                  className="text-5xl"
                  onClick={toggleLoginModal}
                />
                <span className="text-2xl">Sign In</span>
              </>
            )}
          </div>
        </div>

        <div className="flex sm:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? (
              <CloseIcon className="text-3xl" />
            ) : (
              <MenuIcon className="text-3xl"   onClick={toggleDrawer}/>
            )}
          </button>
        </div>
      </nav>

      <MiniDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />

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

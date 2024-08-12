import React from 'react';
import footer from "../assets/image/logo-footer.png";

const Footer = () => {
  return (
    <div className="bg-gray-100 text-black py-10 my-4">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Some Useful Links</h1>
          <h2 className="text-xl">Connect with us on:</h2>
        </div>
        <div className="flex flex-wrap justify-around">
          <div className="mb-6 md:mb-0 md:w-1/4">
            <div className="flex items-center mb-4">
              <img src={footer} alt="Logo" className="w-28 h-28 mr-2" />
              
            </div>
          </div>
          <div className="mb-6 md:mb-0 md:w-1/4">
            <h1 className="text-xl font-semibold mb-2">Our Company</h1>
            <ul>
              <li className="mb-1"><a href="#about" className="hover:underline">About us</a></li>
              <li className="mb-1"><a href="#testimonials" className="hover:underline">Testimonials</a></li>
              <li className="mb-1"><a href="#gallery" className="hover:underline">Gallery</a></li>
              <li className="mb-1"><a href="#privacy" className="hover:underline">Privacy policy</a></li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0 md:w-1/4">
            <h1 className="text-xl font-semibold mb-2">Customer Service</h1>
            <ul>
              <li className="mb-1"><a href="#services" className="hover:underline">Services</a></li>
              <li className="mb-1"><a href="#contact" className="hover:underline">Contact us</a></li>
              <li className="mb-1"><a href="#faqs" className="hover:underline">Faqs</a></li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0 md:w-1/4">
            <h1 className="text-xl font-semibold mb-2">Products</h1>
            <ul className="text-sm space-y-1">
              <li>Interior Design | Full Home Interior</li>
              <li>Wardrobe | Kitchen | Living Room</li>
              <li>False Ceiling | Interior Lighting</li>
              <li>Curtains | Readymade Curtains</li>
              <li>Customized Curtains | Blinds</li>
              <li>Roman Blinds | Roller Blinds</li>
              <li>Wooden Blinds | PVC Blinds</li>
              <li>Zebra Blinds | Mattress</li>
              <li>Peps Mattress | Wallpapers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

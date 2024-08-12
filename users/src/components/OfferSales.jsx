import React from "react";
import banner1 from "../assets/image/bannerbigSales.png";

const OfferSales = () => {
  return (
    <div className="offer-sales-container">
      <img src={banner1} alt="Banner 1" className="banner-image" />
      <div className="sales-text-container">
        <div className="sales-text">New Sales!</div>
      </div>
    </div>
  );
};

export default OfferSales;

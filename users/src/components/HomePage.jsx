import React from "react";

import BannerSlider from "./BannerSlider";
import CardHome from "./CardHome";
import DealsHeader from "./DealsHeader";
// import SalesAdOfferHomepage from "./SalesAdOfferHomepage";
import ServiceCard from "./ServiceCard";

import Testimonials from "./Testimonials";
import OfferSales from "./OfferSales";
import ProductDescription from "./ProductDescription";
import { Cateroy } from "./Cateroy";
import CustomizedCurtains from "./CustomizedCurtains";
import Blinds from "./Blinds";
import WallPaper from "./WallPaper";
import Footer from "./Footer";

const HomePage = () => (
  <div className="w-full">
    <BannerSlider />
      <CardHome />
      <ProductDescription />
      <Cateroy />
      <ServiceCard />
      <CustomizedCurtains />
      <Blinds/>
      <WallPaper />
      <DealsHeader />
      <OfferSales />
      {/* <SalesAdOfferHomepage /> */}
      <Testimonials />

      
    </div>
  );



export default HomePage;

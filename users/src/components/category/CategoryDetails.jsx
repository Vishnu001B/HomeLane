import React from "react";
import CategoryBanner from "./categoryBanner";
import Chandeliers from "./Chandeliers";
import { useParams } from "react-router-dom";
import {products} from "../../data"
import ShowCategoryWise from "./ShowCategoryWise";



const categoryDetails = ({ category }) => {
  const { name } = useParams();

  const selectname = category || name;

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === selectname.toLowerCase()
  );
  // Add more categories as needed

  return (
    <div>
      {name ? (
        <>
          <CategoryBanner title="Our Products" />
          <Chandeliers name={selectname} />{" "}
        </>
      ) : null}

      <ShowCategoryWise products={filteredProducts} />
      {/* <ShowCategoryWise title="Pendants" products={pendants} />
        <ShowCategoryWise title="Wall Lights" products={wallLights} /> */}
      {/* Add more categories as needed */}
    </div>
  );
};

export default categoryDetails;

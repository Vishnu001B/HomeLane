import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShowCategoryWise = ({ title, products }) => {
  const navigate = useNavigate();

  const handleOnClick = (product) => {
    navigate('/productDetails', { state: { product } });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <div 
          key={index} 
          className="card-info hover:shadow-md hover:shadow-black text-sm font-serif text-center font-thin flex flex-col justify-center items-center py-4 border rounded-lg shadow-md" 
          onClick={() => handleOnClick(product)}
        >
          <img src={product.img} alt={product.name} className="w-full h-auto mb-2" />
          <h3 className="text-lg font-medium mb-1">{product.name}</h3>
          <p className="text-red-400 mb-1">{product.price}</p>
          <p className="text-green-700">{product.delivery}</p>
        </div>
      ))}
    </div>
  );
};

export default ShowCategoryWise;

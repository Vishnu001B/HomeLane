import React, { useEffect, useState } from 'react';
import ProductDetails from './ProductDetails';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const ProductHomePage = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const resp = await axios.get(`${URI}api/admin/products`);
      setProduct(resp.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  return (
    <div className='grid lg:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1 lg:px-20 md:px-20 px-5 py-14 relative'>
      <Button className="absolute right-5 top-2 " onClick={() => { navigate("/AddProduct") }}>
        ADD Product
      </Button>
      {product && product.map((prod) => (
        <ProductDetails key={prod._id} product={prod} fetchProduct={fetchProduct} /> // pass the product object as a prop to ProductDetails component
      ))}
    </div>
  );
};

// src/pages/ProductDetails.js

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from "../components/Spinner";

const API_URL = "https://fakestoreapi.com/products";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/${productId}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.log("Error aagya ji");
        setProduct(null);
      }
      setLoading(false);
    };
    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return <Spinner />;
  }

  if (!product) {
    return <div className="flex justify-center items-center">No Data Found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-40 p-5">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-shrink-0">
          <img src={product.image} alt={product.title} className="h-80 w-100 object-cover" />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl text-green-600 font-semibold mb-4">${product.price}</p>
            </div>
            <div className="ml-auto">
              <Link to="/">
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-300">
                  Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

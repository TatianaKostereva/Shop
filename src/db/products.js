import React, { useState } from 'react';

export const DBProductsContext = React.createContext(
  [],
);

const DBProducts = ({ children }) => {
  const loadProduct = async () => {
    fetch('http://localhost:3000/products').then((res) => res.json());
  };

  const addReviews = (url) => {
    fetch(url).then((res) => res.json());
  };

  const products = {
    loadProduct,
    addReviews,
  };

  return (
    <>
      {products.loadProduct().then((data) => {
        <DBProductsContext.Provider value={data}>
          {children}
        </DBProductsContext.Provider>;
      })}
      ;
    </>
  );
};

export default DBProducts;

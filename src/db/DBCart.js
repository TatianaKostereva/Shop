import React, { useState } from 'react';
import CartService from '@/services/CartService';

export const DBCartContext = React.createContext(
  [],
);

const DBCart = ({children}) => {
  const [ products, setProducts ] = useState(CartService.getProductsId());

  const deleteProduct = (id) => {
    CartService.deleteProduct(id);
    setProducts(CartService.getProductsId);
  };

  const cart = {
    products: products,
    deleteProduct: deleteProduct,
  };

  return (
    <DBCartContext.Provider value={cart}>
      {children}
    </DBCartContext.Provider>
  )
};

export default DBCart;

import React, { useContext, useEffect } from 'react';
import CartService from '@/services/CartService';
import CheckoutProductList from '@/components/checkout/CheckoutProductList';
import EmptyLayout from '@/components/ui/Layout/EmptyLayout';
import { DBCartContext } from '@/db/DBCart';
import { DBProductsContext } from '@/db/DBProducts';

const CartPage = () => {
  const { productsInCart, loaded, loadDataByID } = useContext(DBProductsContext);

  const cart = useContext(DBCartContext);

  useEffect(() => {
    loadDataByID(cart.products);
  }, [cart.products]);

  if (!loaded) {
    return null;
  }
  console.log(productsInCart);
  const products = CartService.getProducts(cart.products, productsInCart);

  return (
    <EmptyLayout>
      <h3 className="h5 mb-4 mt-4 text-md-center">Your order</h3>
      <div className="alert alert-primary" role="alert">
        Your order has been confirmed. The confirmation email is sent to you address
      </div>
      <div className="product-list-box-wrapper">
        <CheckoutProductList
          products={products}
        />
      </div>
    </EmptyLayout>
  );
};

export default CartPage;

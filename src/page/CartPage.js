import React, { useContext } from 'react';
import CartService from '@/services/CartService';
import CheckoutProductList from '@/components/checkout/CheckoutProductList';
import EmptyLayout from '@/components/ui/Layout/EmptyLayout';
import DBProductsContext from '@/db/products';
import { DBCartContext } from '@/db/DBCart';

const CartPage = () => {
  const productsData = useContext(DBProductsContext);
  const cart = useContext(DBCartContext);
  const products = CartService.getProducts(cart.products, productsData);

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

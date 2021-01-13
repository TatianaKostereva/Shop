import React, { useContext } from 'react';
import CartService from '@/services/CartService';
import CheckoutProductList from '@/components/checkout/CheckoutProductList';
import EmptyLayout from '@/components/ui/Layout/EmptyLayout';
import useDataSourceList from '@/db/hook/useDataSourceList';
import { DBCartContext } from '@/db/DBCart';
import { DATA_LOADED } from '@/db/constants';
import { DATA_SOURCE_PRODUCT } from '@/db/dataSourceConfig';

const CartPage = () => {
  const cart = useContext(DBCartContext);
  const { data: productsInCart, status } = useDataSourceList(DATA_SOURCE_PRODUCT, cart.products);

  if (status !== DATA_LOADED) {
    return null;
  }
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

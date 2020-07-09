import React from 'react';
import ProductListViewInCart from '@/components/catalogOfProducts/ProductListViewInCart';
import CheckoutSumPrice from '@/components/checkout/CheckoutSumPrice';
import useCheckoutProductList from '@/components/checkout/hooks/useCheckoutProductList';

const CheckoutProductList = ({ products }) => {
  const {
    getProductsByPage,
    getButton,
  } = useCheckoutProductList({ products });

  const productsByPage = getProductsByPage();
  const buttons = getButton();

  return (
    <div>
      <div className="product-list-box">
        {productsByPage.map((item) => <ProductListViewInCart id={item.id} />)}
      </div>
      <CheckoutSumPrice products={products} />
      {buttons}
    </div>
  );
};

export default CheckoutProductList;

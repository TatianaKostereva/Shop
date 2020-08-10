import React, { useContext } from 'react';
import ProductListViewInCart from '@/components/checkout/ProductListViewInCart';
import CheckoutSumPrice from '@/components/checkout/CheckoutSumPrice';
import getPages from '@/services/getPages';
import { DBCartContext } from '@/db/DBCart';

const CheckoutProductList = ({ products }) => {
  const { pageSize } = useContext(DBCartContext);

  const {
    getItemsByPage,
    getButton,
  } = getPages({ items: products }, { pageSize });

  const productsByPage = getItemsByPage();
  const buttons = getButton();

  return (
    <div>
      <div className="product-list-box">
        {productsByPage.map((item) => (
          <ProductListViewInCart
            key={item.id}
            id={item.id}
          />
        ))}
      </div>
      <CheckoutSumPrice products={products} />
      {buttons}
    </div>
  );
};

export default CheckoutProductList;

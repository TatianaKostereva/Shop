import React, { useContext } from 'react';
import ProductListViewInCart from '@/components/checkout/ProductListViewInCart';
import CheckoutSumPrice from '@/components/checkout/CheckoutSumPrice';
import getPages from '@/services/getPages';
import { DBCartContext } from '@/db/DBCart';

const CheckoutProductList = ({ products }) => {
  const { pageSize } = useContext(DBCartContext);

  const {
    getProductsByPage,
    getButton,
  } = getPages({ products }, { pageSize });

  const productsByPage = getProductsByPage();
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

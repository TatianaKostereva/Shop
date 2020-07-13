import React, {useContext, useState} from 'react';
import ProductListViewInCart from '@/components/checkout/ProductListViewInCart';
import CheckoutSumPrice from '@/components/checkout/CheckoutSumPrice';
import useCheckoutProductList from '@/components/checkout/hooks/useCheckoutProductList';
import {DBCartContext} from "@/db/DBCart";

const CheckoutProductList = ({ products }) => {
  const {
    getProductsByPage,
    goToPage,
    page,
  } = useCheckoutProductList({ products });

  const { pageSize } = useContext(DBCartContext);
  const productsByPage = getProductsByPage();

  const getButton = () => {
    const buttons = [];
    for (let i = 0; i < Math.ceil(products.length / pageSize); i++) {
      let className = 'btn-pag ';

      if (+page === i) {
        className += 'active';
      }

      buttons.push(
        <button
          onClick={goToPage}
          className={className}
          data-page={i}
          key={i}
        >
          {i + 1}
        </button>,
      );
    }

    return (
      <div className="buttons">
        {buttons}
      </div>
    );
  };

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

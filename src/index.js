import React from 'react';
import ReactDOM from 'react-dom';
import loadProduct from './lib/loadProduct';
import CartPage from '@/page/CartPage';
import DBProductsContext from '@/db/products';
import DBCart from '@/db/DBCart';
import MainPage from "@/page/MainPage";

loadProduct('/assets/data/products.json').then((productsData) => {
  const mainPageWrapper = document.querySelector('#mainPage');
  if (mainPageWrapper) {
    ReactDOM.render(
      <DBProductsContext.Provider value={productsData} >
        <MainPage />
      </DBProductsContext.Provider>,
      mainPageWrapper
    )
  }

  const checkoutProductListWrapper = document.querySelector('#checkoutPage');
  if (checkoutProductListWrapper) {
    ReactDOM.render(
      <DBProductsContext.Provider value={productsData}>
        <DBCart>
          <CartPage pageSize={3} />
        </DBCart>,
      </DBProductsContext.Provider>,
      checkoutProductListWrapper
    )
  }
});

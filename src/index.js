import React from 'react';
import ReactDOM from 'react-dom';
import loadProduct from './services/loadProduct';
import CartPage from '@/page/CartPage';
import DBProductsContext from '@/db/products';
import DBCart from '@/db/DBCart';
import MainPage from "@/page/MainPage";

loadProduct('/assets/data/products.json').then((productsData) => {
  const mainPageWrapper = document.querySelector('#mainPage');
  const checkoutProductListWrapper = document.querySelector('#checkoutPage');

  ReactDOM.render(
    <DBProductsContext.Provider value={productsData}>
      <DBCart>
        {mainPageWrapper && <MainPage />}
        {checkoutProductListWrapper && <CartPage pageSize={3} />}
      </DBCart>,
    </DBProductsContext.Provider>,
    mainPageWrapper || checkoutProductListWrapper
  )
});

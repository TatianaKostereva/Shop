import React from 'react';
import ReactDOM from 'react-dom';

import Carousel from './lib/Carousel';
import Menu from './lib/Menu';
import loadProduct from './lib/loadProduct';
import ProductList from './lib/ProductList';
import CartPage from '@/page/CartPage';
import DBProductsContext from '@/db/products';

const menuWrapper = document.querySelector('.main-menu');
if (menuWrapper) {
  ReactDOM.render(
  < DBProductsContext.Provider>
  < Menu />
  < /DBProductsContext.Provider>,
  menuWrapper
  )
}

const carouselWrapper = document.querySelector('.carousel');
if (carouselWrapper) {
  new Carousel(carouselWrapper);
}

loadProduct('/assets/data/products.json').then((productsData) => {

  const productListWrapper = document.querySelector('.product-list');
  if (productListWrapper) {
    ReactDOM.render(
    < DBProductsContext.Provider value = {productsData} >
        < ProductList productsData = {productsData} />
    </DBProductsContext.Provider>,
    productListWrapper
    )
  }

  const checkoutProductListWrapper = document.querySelector('.product-list-box-wrapper');
  if (checkoutProductListWrapper) {
    ReactDOM.render(
      <DBProductsContext.Provider value={productsData}>
        <CartPage productsData={productsData} pageSize={3} />
      </DBProductsContext.Provider>,
      checkoutProductListWrapper
    )
  }
});

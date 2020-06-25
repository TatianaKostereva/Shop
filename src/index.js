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
  new Menu(menuWrapper);
}

const carouselWrapper = document.querySelector('.carousel');
if (carouselWrapper) {
  new Carousel(carouselWrapper);
}

loadProduct('/assets/data/products.json').then((productsData) => {
  const productListWrapper = document.querySelector('.product-list');
  if (productListWrapper) {
    const productList = new ProductList(productListWrapper, productsData);
    productList.show();
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

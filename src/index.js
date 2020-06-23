import React from 'react';
import ReactDOM from 'react-dom';

import Carousel from './lib/Carousel';
import Menu from './lib/Menu';
import loadProduct from './lib/loadProduct';
import ProductList from './lib/ProductList';
import CheckoutProductList from './components/Card/CheckoutProductList';
import CartService from '@/services/CartService';

const menuWrapper = document.querySelector('.main-menu');
if (menuWrapper) {
  new Menu(menuWrapper);
}

const carouselWrapper = document.querySelector('.carousel');
if (carouselWrapper) {
  new Carousel(carouselWrapper);
}

loadProduct('/assets/data/products.json').then((productsList) => {
  const productListWrapper = document.querySelector('.product-list');
  if (productListWrapper) {
    const productList = new ProductList(productListWrapper, productsList);
    productList.show();
  }

  const checkoutProductListWrapper = document.querySelector('.product-list-box-wrapper');
  if (checkoutProductListWrapper) {
    const render = () => {
      const products = [...CartService.getProducts(productsList)];
      console.log(products);
      ReactDOM.render(
        <CheckoutProductList products={products} pageSize={3} />,
        checkoutProductListWrapper
      )
    };

    render();

    CartService.setObserver(render);
  }
});

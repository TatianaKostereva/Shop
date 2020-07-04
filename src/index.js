import React from 'react';
import ReactDOM from 'react-dom';

import loadProduct from './lib/loadProduct';
import CartPage from '@/page/CartPage';
import DBProductsContext from '@/db/products';
import DBCart from '@/db/DBCart';
import MainPage from "@/page/MainPage";

const arr = [
  {
    id: 0,
    title: 'BEST LAPTOP DEALS',
    img: './assets/images/default-slide-img.jpg',
  },
  {
    id: 1,
    title: 'BEST HEADPHONES DEALS',
    img: './assets/images/default-slide-img.jpg',
  },
  {
    id: 2,
    title: 'BEST SPEAKERS DEALS',
    img: './assets/images/default-slide-img.jpg',
  },
];

// const menuWrapper = document.querySelector('.main-menu');
// if (menuWrapper) {
//   ReactDOM.render(
//     <Menu />,
//   menuWrapper
//   )
// }

// const carouselWrapper = document.querySelector('.carousel');
// if (carouselWrapper) {
//   ReactDOM.render(
//     <Carousel slides={arr} />,
//   carouselWrapper
//   )
// }

const mainPageWrapper = document.querySelector('#mainPage');
if (mainPageWrapper) {
  ReactDOM.render(
  <DBProductsContext.Provider value={arr} >
    <MainPage />
  </DBProductsContext.Provider>,
  mainPageWrapper
  )
}

loadProduct('/assets/data/products.json').then((productsData) => {
  // const productListWrapper = document.querySelector('.product-list');
  // if (productListWrapper) {
  //   ReactDOM.render(
  //   <DBProductsContext.Provider value={productsData} >
  //       <ProductList productsData={productsData} />
  //   </DBProductsContext.Provider>,
  //   productListWrapper
  //   )
  // }

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

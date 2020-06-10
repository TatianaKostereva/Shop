import Carousel from './lib/Carousel.js';
import Menu from './lib/Menu.js';
import ProductList from './lib/ProductList.js';
import CheckoutProductList from './lib/CheckoutProductList.js';

const menuWrapper = document.querySelector('.main-menu');
if (menuWrapper) {
  new Menu(menuWrapper);
}

const carouselWrapper = document.querySelector('.carousel');
if (carouselWrapper) {
  new Carousel(carouselWrapper);
}

const productListWrapper = document.querySelector('.product-list');
if (productListWrapper) {
  const productList = new ProductList(productListWrapper);
  productList.show();
}


const checkoutProductListWrapper = document.querySelector('.product-list-box-wrapper');
if (checkoutProductListWrapper) {
  new CheckoutProductList(checkoutProductListWrapper);
}


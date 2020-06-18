import Carousel from './lib/Carousel';
import Menu from './lib/Menu';
import loadProduct from './lib/loadProduct';
import ProductList from './lib/ProductList';
import CheckoutProductList from './lib/CheckoutProductList';

const menuWrapper = document.querySelector('.main-menu');
if (menuWrapper) {
  new Menu(menuWrapper);
}

const carouselWrapper = document.querySelector('.carousel');
if (carouselWrapper) {
  new Carousel(carouselWrapper);
}
loadProduct('/assets/data/products.json').then((products) => {
  const productListWrapper = document.querySelector('.product-list');
  if (productListWrapper) {
    const productList = new ProductList(productListWrapper, products);
    productList.show();
  }

  const checkoutProductListWrapper = document.querySelector('.product-list-box-wrapper');
  if (checkoutProductListWrapper) {
    const checkout = new CheckoutProductList(checkoutProductListWrapper, products);
    checkout.init();
  }
});

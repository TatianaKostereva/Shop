const observers = [];

const getProductsId = () => {
  const productsLocalStorage = localStorage.getItem('cart-products');

  return JSON.parse(productsLocalStorage) || [];
};

const getProducts = (idProductsInCart, productsData = []) => {
  const listOfProducts = idProductsInCart.map((id) => productsData.find((product) => product.id == id));

  const productsInCart = listOfProducts.reduce((obj, item) => {
    if (!obj.hasOwnProperty(item.id)) {
      obj[item.id] = item;
      obj[item.id].sum = 0;
    }
    obj[item.id].sum++;
    return obj;
  }, {});

  return Object.values(productsInCart);
};

const deleteProduct = (productId) => {
  if (confirm('Вы уверены, что хотите удалить этот товар из корзины?') !== true) {
    return false;
  }
  const productsLocalStorage = localStorage.getItem('cart-products');
  const idProductsInCart = JSON.parse(productsLocalStorage) || [];
  const indexOfProductToDelete = idProductsInCart.findIndex((id) => productId == id);

  idProductsInCart.splice(indexOfProductToDelete, 1);

  localStorage.setItem('cart-products', JSON.stringify(idProductsInCart));

  observers.forEach((observer) => observer());
};

const putProducts = (id) => {
  if (confirm('Вы уверены, что хотите добавить этот товар в корзину?') !== true) {
    return false;
  }
  const productsLocalStorage = localStorage.getItem('cart-products');
  const productsInCart = JSON.parse(productsLocalStorage) || [];
  productsInCart.push(+id);
  localStorage.setItem('cart-products', JSON.stringify(productsInCart));
};

const setObserver = (observer) => {
  observers.push(observer);
};

const CartService = {
  getProducts,
  deleteProduct,
  getProductsId,
  putProducts,

  setObserver,
};

export default CartService;
